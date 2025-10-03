const prisma = require("../prisma/prisma");

// ดูบิลทั้งหมด GET /api/payments
exports.list = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        customer: {
          include: {
            room: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(payments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูบิลเดียว GET /api/payments/:payId
exports.getOne = async (req, res) => {
  try {
    const { payId } = req.params;
    const payment = await prisma.payment.findUnique({
      where: {
        Pay_ID: payId,
      },
      include: {
        customer: {
          include: {
            room: true,
          },
        },
      },
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json(payment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// สร้างบิลใหม่ POST /api/payments
exports.create = async (req, res) => {
  try {
    const {
      Pay_ID,
      Customer_Room,
      Month,
      Year,
      Rental,
      WaterSupply,
      TotalWater,
      ElectricitySupply,
      TotalElec,
      Internet,
      Other,
      FineDay,
      TotalFine,
      Paid,
      TotalRental,
      DueDate,
    } = req.body;

    // Validate DueDate
    if (!DueDate) {
      return res.status(400).json({ message: "DueDate is required" });
    }

    const dueDate = new Date(DueDate);
    if (isNaN(dueDate.getTime())) {
      return res.status(400).json({ message: "Invalid DueDate format" });
    }

    const newPayment = await prisma.payment.create({
      data: {
        Pay_ID,
        Customer_Room,
        Month,
        Year: parseInt(Year),
        Rental: parseInt(Rental),
        WaterSupply: parseInt(WaterSupply),
        TotalWater: parseInt(TotalWater),
        ElectricitySupply: parseInt(ElectricitySupply),
        TotalElec: parseInt(TotalElec),
        Internet: parseInt(Internet) || 0,
        Other: parseInt(Other) || 0,
        FineDay: parseInt(FineDay) || 0,
        TotalFine: parseInt(TotalFine) || 0,
        Paid: parseInt(Paid) || 0,
        TotalRental: parseInt(TotalRental),
        DueDate: dueDate,
      },
    });

    res.status(201).json({ message: "Payment created successfully", payment: newPayment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// แก้ไขบิล PATCH /api/payments/:payId
exports.update = async (req, res) => {
  try {
    const { payId } = req.params;
    const data = req.body;

    // แปลงค่าที่เป็นตัวเลขให้เป็น Int
    const updateData = {
      ...data,
      Year: data.Year ? parseInt(data.Year) : data.Year,
      Rental: data.Rental ? parseInt(data.Rental) : data.Rental,
      WaterSupply: data.WaterSupply ? parseInt(data.WaterSupply) : data.WaterSupply,
      TotalWater: data.TotalWater ? parseInt(data.TotalWater) : data.TotalWater,
      ElectricitySupply: data.ElectricitySupply ? parseInt(data.ElectricitySupply) : data.ElectricitySupply,
      TotalElec: data.TotalElec ? parseInt(data.TotalElec) : data.TotalElec,
      Internet: data.Internet ? parseInt(data.Internet) : data.Internet,
      Other: data.Other ? parseInt(data.Other) : data.Other,
      FineDay: data.FineDay ? parseInt(data.FineDay) : data.FineDay,
      TotalFine: data.TotalFine ? parseInt(data.TotalFine) : data.TotalFine,
      Paid: data.Paid ? parseInt(data.Paid) : data.Paid,
      TotalRental: data.TotalRental ? parseInt(data.TotalRental) : data.TotalRental,
      DayPaid: data.DayPaid ? new Date(data.DayPaid) : data.DayPaid,
      DueDate: data.DueDate ? new Date(data.DueDate) : data.DueDate,
    };

    // ลบฟิลด์ที่ไม่ควรอัพเดท
    delete updateData.customer;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const updatedPayment = await prisma.payment.update({
      where: {
        Pay_ID: payId,
      },
      data: updateData,
    });

    res.json({ message: "Payment updated successfully", payment: updatedPayment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ลบบิล DELETE /api/payments/:payId
exports.remove = async (req, res) => {
  try {
    const { payId } = req.params;

    await prisma.payment.delete({
      where: {
        Pay_ID: payId,
      },
    });

    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ชำระเงิน PATCH /api/payments/:payId/pay
exports.payBill = async (req, res) => {
  try {
    const { payId } = req.params;
    const { Paid, PaymentStatus } = req.body;

    const updatedPayment = await prisma.payment.update({
      where: {
        Pay_ID: payId,
      },
      data: {
        Paid,
        PaymentStatus: PaymentStatus || "PAID",
        DayPaid: new Date(),
      },
    });

    res.json({ message: "Payment paid successfully", payment: updatedPayment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูบิลที่ยังไม่จ่าย GET /api/payments/status/unpaid
exports.getUnpaid = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        PaymentStatus: "UNPAID",
      },
      include: {
        customer: {
          include: {
            room: true,
          },
        },
      },
      orderBy: {
        DueDate: "asc",
      },
    });
    res.json(payments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูบิลตามห้อง GET /api/payments/room/:roomNumber
exports.getByRoom = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const payments = await prisma.payment.findMany({
      where: {
        Customer_Room: roomNumber,
      },
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(payments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};