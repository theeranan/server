const prisma = require("../prisma/prisma");

// ดูลูกค้าทั้งหมด GET /api/customers
exports.list = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        room: true,
        Payments: true,
        Repairs: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(customers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูลูกค้าคนเดียว GET /api/customers/:customerId
exports.getOne = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await prisma.customer.findUnique({
      where: {
        Customer_ID: customerId,
      },
      include: {
        room: true,
        Payments: {
          orderBy: {
            createdAt: "desc",
          },
        },
        Repairs: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// สร้างลูกค้าใหม่ POST /api/customers
exports.create = async (req, res) => {
  try {
    const {
      Customer_ID,
      Customer_Name,
      Customer_Lastname,
      Customer_Tel,
      Customer_Room,
      Customer_Car,
      Customer_Address,
      ContractNo,
      DateCheckin,
      DateOut,
    } = req.body;

    // ตรวจสอบว่าห้องว่างหรือไม่
    const room = await prisma.room.findUnique({
      where: { Room_Number: Customer_Room },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.Room_Status !== "AVAILABLE") {
      return res.status(400).json({ message: "Room is not available" });
    }

    // สร้างลูกค้าและอัพเดทสถานะห้อง
    const newCustomer = await prisma.$transaction(async (tx) => {
      const customer = await tx.customer.create({
        data: {
          Customer_ID,
          Customer_Name,
          Customer_Lastname,
          Customer_Tel,
          Customer_Room,
          Customer_Car,
          Customer_Address,
          ContractNo,
          DateCheckin: new Date(DateCheckin),
          DateOut: DateOut ? new Date(DateOut) : null,
        },
      });

      // อัพเดทสถานะห้องเป็น OCCUPIED
      await tx.room.update({
        where: { Room_Number: Customer_Room },
        data: { Room_Status: "OCCUPIED" },
      });

      return customer;
    });

    res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// แก้ไขข้อมูลลูกค้า PATCH /api/customers/:customerId
exports.update = async (req, res) => {
  try {
    const { customerId } = req.params;
    const data = req.body;

    const updatedCustomer = await prisma.customer.update({
      where: {
        Customer_ID: customerId,
      },
      data,
    });

    res.json({ message: "Customer updated successfully", customer: updatedCustomer });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ลบลูกค้า DELETE /api/customers/:customerId
exports.remove = async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await prisma.customer.findUnique({
      where: { Customer_ID: customerId },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // ลบลูกค้าและอัพเดทสถานะห้อง
    await prisma.$transaction(async (tx) => {
      await tx.customer.delete({
        where: { Customer_ID: customerId },
      });

      // อัพเดทสถานะห้องเป็น AVAILABLE
      await tx.room.update({
        where: { Room_Number: customer.Customer_Room },
        data: { Room_Status: "AVAILABLE" },
      });
    });

    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ลูกค้าที่อยู่ในหอพัก (Status = active) GET /api/customers/status/active
exports.getActive = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        Status: "active",
      },
      include: {
        room: true,
      },
      orderBy: {
        Customer_Room: "asc",
      },
    });
    res.json(customers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Check-out ลูกค้า PATCH /api/customers/:customerId/checkout
exports.checkout = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { DateOut } = req.body;

    const customer = await prisma.customer.findUnique({
      where: { Customer_ID: customerId },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // อัพเดทลูกค้าและห้อง
    await prisma.$transaction(async (tx) => {
      await tx.customer.update({
        where: { Customer_ID: customerId },
        data: {
          Status: "moved_out",
          DateOut: DateOut ? new Date(DateOut) : new Date(),
        },
      });

      await tx.room.update({
        where: { Room_Number: customer.Customer_Room },
        data: { Room_Status: "AVAILABLE" },
      });
    });

    res.json({ message: "Customer checked out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};