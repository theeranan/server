const prisma = require("../prisma/prisma");

// ดูพนักงานทั้งหมด GET /api/employees
exports.list = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        Maintenances: true,
      },
      orderBy: {
        Emp_Name: "asc",
      },
    });
    res.json(employees);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูพนักงานคนเดียว GET /api/employees/:empId
exports.getOne = async (req, res) => {
  try {
    const { empId } = req.params;
    const employee = await prisma.employee.findUnique({
      where: {
        Emp_ID: empId,
      },
      include: {
        Maintenances: {
          orderBy: {
            MainDate: "desc",
          },
        },
      },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// สร้างพนักงานใหม่ POST /api/employees
exports.create = async (req, res) => {
  try {
    const {
      Emp_ID,
      Emp_Name,
      Emp_Lastname,
      Emp_Tel,
      Emp_Address,
      Emp_Salary,
      Emp_Position,
    } = req.body;

    const newEmployee = await prisma.employee.create({
      data: {
        Emp_ID,
        Emp_Name,
        Emp_Lastname,
        Emp_Tel,
        Emp_Address,
        Emp_Salary,
        Emp_Position,
      },
    });

    res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// แก้ไขข้อมูลพนักงาน PATCH /api/employees/:empId
exports.update = async (req, res) => {
  try {
    const { empId } = req.params;
    const data = req.body;

    const updatedEmployee = await prisma.employee.update({
      where: {
        Emp_ID: empId,
      },
      data,
    });

    res.json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ลบพนักงาน DELETE /api/employees/:empId
exports.remove = async (req, res) => {
  try {
    const { empId } = req.params;

    await prisma.employee.delete({
      where: {
        Emp_ID: empId,
      },
    });

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ดูพนักงานที่ทำงานอยู่ GET /api/employees/status/active
exports.getActive = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        Emp_Status: "active",
      },
      orderBy: {
        Emp_Name: "asc",
      },
    });
    res.json(employees);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};