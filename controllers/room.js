const prisma = require("../prisma/prisma");

// ดูห้องทั้งหมด GET /api/rooms
exports.list = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        Customers: true,
      },
      orderBy: {
        Room_Number: "asc",
      },
    });
    res.json(rooms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูห้องเดียว GET /api/rooms/:roomNumber
exports.getOne = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const room = await prisma.room.findUnique({
      where: {
        Room_Number: roomNumber,
      },
      include: {
        Customers: true,
        Maintenances: true,
      },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// สร้างห้องใหม่ POST /api/rooms
exports.create = async (req, res) => {
  try {
    const {
      Room_Number,
      Room_Type,
      Room_Floor,
      Room_Size,
      Room_Price,
      Room_Deposit,
      Description,
    } = req.body;

    const newRoom = await prisma.room.create({
      data: {
        Room_Number,
        Room_Type,
        Room_Floor: parseInt(Room_Floor),
        Room_Size: parseFloat(Room_Size),
        Room_Price: parseInt(Room_Price),
        Room_Deposit: parseInt(Room_Deposit),
        Description,
      },
    });

    res.status(201).json({ message: "Room created successfully", room: newRoom });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// แก้ไขข้อมูลห้อง PATCH /api/rooms/:roomNumber
exports.update = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const data = req.body;

    // Convert numeric fields to proper types
    const processedData = { ...data };
    if (processedData.Room_Floor !== undefined) {
      processedData.Room_Floor = parseInt(processedData.Room_Floor);
    }
    if (processedData.Room_Size !== undefined) {
      processedData.Room_Size = parseFloat(processedData.Room_Size);
    }
    if (processedData.Room_Price !== undefined) {
      processedData.Room_Price = parseInt(processedData.Room_Price);
    }
    if (processedData.Room_Deposit !== undefined) {
      processedData.Room_Deposit = parseInt(processedData.Room_Deposit);
    }

    // Remove nested Customers array if present (can't update relation this way)
    delete processedData.Customers;

    const updatedRoom = await prisma.room.update({
      where: {
        Room_Number: roomNumber,
      },
      data: processedData,
    });

    res.json({ message: "Room updated successfully", room: updatedRoom });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ลบห้อง DELETE /api/rooms/:roomNumber
exports.remove = async (req, res) => {
  try {
    const { roomNumber } = req.params;

    await prisma.room.delete({
      where: {
        Room_Number: roomNumber,
      },
    });

    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูห้องว่าง GET /api/rooms/status/available
exports.getAvailable = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        Room_Status: "AVAILABLE",
      },
      orderBy: {
        Room_Number: "asc",
      },
    });
    res.json(rooms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};