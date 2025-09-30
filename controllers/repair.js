const prisma = require("../prisma/prisma");

// ดูรายการแจ้งซ่อมทั้งหมด GET /api/repairs
exports.list = async (req, res) => {
  try {
    const repairs = await prisma.repair.findMany({
      include: {
        customer: {
          include: {
            room: true,
          },
        },
      },
      orderBy: {
        ReportDate: "desc",
      },
    });
    res.json(repairs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูรายการแจ้งซ่อมเดียว GET /api/repairs/:repairId
exports.getOne = async (req, res) => {
  try {
    const { repairId } = req.params;
    const repair = await prisma.repair.findUnique({
      where: {
        Repair_ID: repairId,
      },
      include: {
        customer: {
          include: {
            room: true,
          },
        },
      },
    });

    if (!repair) {
      return res.status(404).json({ message: "Repair not found" });
    }

    res.json(repair);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// สร้างรายการแจ้งซ่อมใหม่ POST /api/repairs
exports.create = async (req, res) => {
  try {
    const { Customer_ID, Customer_Room, Reason, RepairType, Priority } = req.body;

    const newRepair = await prisma.repair.create({
      data: {
        Customer_ID,
        Customer_Room,
        Reason,
        RepairType,
        Priority: Priority || "normal",
      },
    });

    res.status(201).json({ message: "Repair request created successfully", repair: newRepair });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// แก้ไขรายการแจ้งซ่อม PATCH /api/repairs/:repairId
exports.update = async (req, res) => {
  try {
    const { repairId } = req.params;
    const data = req.body;

    const updatedRepair = await prisma.repair.update({
      where: {
        Repair_ID: repairId,
      },
      data,
    });

    res.json({ message: "Repair updated successfully", repair: updatedRepair });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ลบรายการแจ้งซ่อม DELETE /api/repairs/:repairId
exports.remove = async (req, res) => {
  try {
    const { repairId } = req.params;

    await prisma.repair.delete({
      where: {
        Repair_ID: repairId,
      },
    });

    res.json({ message: "Repair deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// อัพเดทสถานะการซ่อม PATCH /api/repairs/:repairId/status
exports.updateStatus = async (req, res) => {
  try {
    const { repairId } = req.params;
    const { Status, Cost, Note } = req.body;

    const updateData = {
      Status,
    };

    if (Status === "COMPLETED") {
      updateData.CompletedDate = new Date();
      if (Cost) updateData.Cost = Cost;
    }

    if (Note) updateData.Note = Note;

    const updatedRepair = await prisma.repair.update({
      where: {
        Repair_ID: repairId,
      },
      data: updateData,
    });

    res.json({ message: "Repair status updated successfully", repair: updatedRepair });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูรายการแจ้งซ่อมที่รอดำเนินการ GET /api/repairs/status/pending
exports.getPending = async (req, res) => {
  try {
    const repairs = await prisma.repair.findMany({
      where: {
        Status: "PENDING",
      },
      include: {
        customer: {
          include: {
            room: true,
          },
        },
      },
      orderBy: {
        ReportDate: "asc",
      },
    });
    res.json(repairs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูรายการแจ้งซ่อมตามห้อง GET /api/repairs/room/:roomNumber
exports.getByRoom = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const repairs = await prisma.repair.findMany({
      where: {
        Customer_Room: roomNumber,
      },
      include: {
        customer: true,
      },
      orderBy: {
        ReportDate: "desc",
      },
    });
    res.json(repairs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};