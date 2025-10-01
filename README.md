# 🏠 Dormitory Management System API

ระบบจัดการหอพัก (Backend API) - ระบบสำหรับจัดการข้อมูลหอพักแบบครบวงจร รองรับการจัดการห้องพัก ลูกค้า การชำระเงิน การแจ้งซ่อม และพนักงาน

## 📋 สารบัญ
- [ความต้องการของระบบ](#ความต้องการของระบบ)
- [การติดตั้ง](#การติดตั้ง)
- [การตั้งค่า](#การตั้งค่า)
- [การรันโปรเจกต์](#การรันโปรเจกต์)
- [API Endpoints](#api-endpoints)
- [โครงสร้างฐานข้อมูล](#โครงสร้างฐานข้อมูล)
- [การใช้งาน](#การใช้งาน)

---

## ⚙️ ความต้องการของระบบ

ก่อนเริ่มติดตั้ง ต้องมีโปรแกรมเหล่านี้ติดตั้งอยู่ในเครื่อง:

- **Node.js** (เวอร์ชัน 16 ขึ้นไป) - [ดาวน์โหลด](https://nodejs.org/)
- **Docker & Docker Compose** - [ดาวน์โหลด](https://www.docker.com/products/docker-desktop/)
- **Git** - [ดาวน์โหลด](https://git-scm.com/)

---

## 📦 การติดตั้ง

### 1. Clone โปรเจกต์
```bash
git clone <repository-url>
cd react-server
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. ตั้งค่า Environment Variables
สร้างไฟล์ `.env` ในโฟลเดอร์ root ของโปรเจกต์:

```env
DATABASE_URL="mysql://root:root123@localhost:3306/dormitory"
```

**หมายเหตุ:** หากต้องการเปลี่ยนรหัสผ่านฐานข้อมูล ให้แก้ไขทั้งในไฟล์ `.env` และ `docker-compose.yml`

### 4. เปิดฐานข้อมูล MySQL ด้วย Docker
```bash
docker-compose up -d
```

คำสั่งนี้จะ:
- สร้าง Container MySQL 8.0
- ตั้งค่าฐานข้อมูลชื่อ `dormitory`
- เปิด Port 3306

### 5. สร้างตารางในฐานข้อมูลด้วย Prisma
```bash
npx prisma generate
npx prisma db push
```

คำสั่งนี้จะ:
- `generate`: สร้าง Prisma Client สำหรับเชื่อมต่อฐานข้อมูล
- `db push`: สร้างตารางในฐานข้อมูลตาม schema ที่กำหนด

---

## 🚀 การรันโปรเจกต์

### Development Mode (Auto-reload)
```bash
npm start
```

Server จะทำงานที่ `http://localhost:3001`

### ตรวจสอบว่า Server ทำงาน
เปิด Browser แล้วไปที่:
```
http://localhost:3001
```

ควรได้ Response:
```json
{
  "message": "Dormitory API Server is running!"
}
```

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| POST | `/api/register` | สมัครสมาชิกใหม่ |
| POST | `/api/login` | เข้าสู่ระบบ |
| GET | `/api/auth/users` | ดูข้อมูล users ทั้งหมด (ต้อง Auth) |

### 👥 Users
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/users` | ดูรายชื่อ users ทั้งหมด |
| PATCH | `/api/users/:userId` | แก้ไขข้อมูล user |
| DELETE | `/api/users/:userId` | ลบ user |

### 🏠 Rooms (ห้องพัก)
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/rooms` | ดูห้องทั้งหมด |
| GET | `/api/rooms/available` | ดูห้องว่าง |
| GET | `/api/rooms/:roomNumber` | ดูข้อมูลห้องเดียว |
| POST | `/api/rooms` | สร้างห้องใหม่ |
| PATCH | `/api/rooms/:roomNumber` | แก้ไขข้อมูลห้อง |
| DELETE | `/api/rooms/:roomNumber` | ลบห้อง |

### 👤 Customers (ลูกค้า/ผู้เช่า)
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/customers` | ดูลูกค้าทั้งหมด |
| GET | `/api/customers/active` | ดูลูกค้าที่อยู่ในหอพัก |
| GET | `/api/customers/:customerId` | ดูข้อมูลลูกค้าคนเดียว |
| POST | `/api/customers` | สร้างลูกค้าใหม่ (Check-in) |
| PATCH | `/api/customers/:customerId` | แก้ไขข้อมูลลูกค้า |
| PATCH | `/api/customers/:customerId/checkout` | Check-out ลูกค้า |
| DELETE | `/api/customers/:customerId` | ลบลูกค้า |

### 💰 Payments (การชำระเงิน)
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/payments` | ดูบิลทั้งหมด |
| GET | `/api/payments/unpaid` | ดูบิลที่ยังไม่จ่าย |
| GET | `/api/payments/room/:roomNumber` | ดูบิลตามห้อง |
| GET | `/api/payments/:payId` | ดูบิลเดียว |
| POST | `/api/payments` | สร้างบิลใหม่ |
| PATCH | `/api/payments/:payId` | แก้ไขบิล |
| PATCH | `/api/payments/:payId/pay` | ชำระเงิน |
| DELETE | `/api/payments/:payId` | ลบบิล |

### 🔧 Repairs (แจ้งซ่อม)
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/repairs` | ดูรายการแจ้งซ่อมทั้งหมด |
| GET | `/api/repairs/pending` | ดูรายการแจ้งซ่อมที่รอดำเนินการ |
| GET | `/api/repairs/room/:roomNumber` | ดูรายการแจ้งซ่อมตามห้อง |
| GET | `/api/repairs/:repairId` | ดูรายการแจ้งซ่อมเดียว |
| POST | `/api/repairs` | สร้างรายการแจ้งซ่อมใหม่ |
| PATCH | `/api/repairs/:repairId` | แก้ไขรายการแจ้งซ่อม |
| PATCH | `/api/repairs/:repairId/status` | อัพเดทสถานะการซ่อม |
| DELETE | `/api/repairs/:repairId` | ลบรายการแจ้งซ่อม |

### 👷 Employees (พนักงาน)
| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/employees` | ดูพนักงานทั้งหมด |
| GET | `/api/employees/active` | ดูพนักงานที่ทำงานอยู่ |
| GET | `/api/employees/:empId` | ดูข้อมูลพนักงานคนเดียว |
| POST | `/api/employees` | สร้างพนักงานใหม่ |
| PATCH | `/api/employees/:empId` | แก้ไขข้อมูลพนักงาน |
| DELETE | `/api/employees/:empId` | ลบพนักงาน |

---

## 🗄️ โครงสร้างฐานข้อมูล

ระบบประกอบด้วยฐานข้อมูล **16 ตาราง** สำหรับจัดการข้อมูลหอพักแบบครบวงจร

---

### 🔐 ตารางระบบและผู้ใช้งาน

#### 1. **user** - ผู้ใช้ระบบ
ตารางสำหรับจัดการผู้ใช้งานระบบและการเข้าสู่ระบบ

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `id` | Int | รหัสผู้ใช้ (Auto increment) |
| `email` | String | อีเมล (ไม่ซ้ำ, ใช้เป็น username) |
| `password` | String | รหัสผ่าน (เข้ารหัสด้วย bcrypt) |
| `role` | Enum | บทบาท: ADMIN, USER, EMPLOYEE |
| `createdAt` | DateTime | วันที่สร้างบัญชี |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

#### 2. **Admin** - ผู้ดูแลระบบ
ข้อมูลแอดมินที่ดูแลหอพัก

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Admin_ID` | String(10) | รหัสแอดมิน (Primary Key) |
| `Admin_Name` | String(50) | ชื่อแอดมิน |
| `Admin_Lastname` | String(50) | นามสกุลแอดมิน |
| `Admin_Tel` | String(10) | เบอร์โทรศัพท์ |
| `Admin_Address` | String(150) | ที่อยู่ |
| `Admin_Salary` | Int | เงินเดือน |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

---

### 🏠 ตารางห้องพักและลูกค้า

#### 3. **Room** - ห้องพัก
ข้อมูลห้องพักทั้งหมดในหอพัก

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Room_Number` | String(10) | เลขห้อง (Primary Key, เช่น "101", "205") |
| `Room_Type` | String(20) | ประเภทห้อง (มาตรฐาน, ดีลักซ์, VIP) |
| `Room_Floor` | Int | ชั้นที่ตั้งห้อง |
| `Room_Size` | Float | ขนาดห้อง (ตารางเมตร) |
| `Room_Status` | Enum | สถานะ: AVAILABLE, OCCUPIED, MAINTENANCE, RESERVED |
| `Room_Price` | Int | ค่าเช่าต่อเดือน (บาท) |
| `Room_Deposit` | Int | เงินประกัน (บาท) |
| `Description` | Text | รายละเอียดห้อง (สิ่งอำนวยความสะดวก) |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

**Relations:**
- เชื่อมกับ `Customer` (1 ห้องมีได้หลายลูกค้าตามช่วงเวลา)
- เชื่อมกับ `Maintenance` (ประวัติการซ่อมบำรุง)

#### 4. **Customer** - ลูกค้า/ผู้เช่า
ข้อมูลผู้เช่าที่อาศัยอยู่ในหอพัก

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Customer_ID` | String(10) | รหัสลูกค้า (Primary Key) |
| `Customer_Name` | String(20) | ชื่อ |
| `Customer_Lastname` | String(20) | นามสกุล |
| `Customer_Tel` | String(10) | เบอร์โทรศัพท์ |
| `Customer_Room` | String(10) | เลขห้องที่เช่า (Unique, Foreign Key → Room) |
| `Customer_Car` | String(20) | ทะเบียนรถ |
| `Customer_Address` | String(150) | ที่อยู่เดิม/ติดต่อฉุกเฉิน |
| `ContractNo` | String(20) | เลขที่สัญญา (Unique) |
| `DateCheckin` | DateTime | วันที่เข้าพัก (Check-in) |
| `DateOut` | DateTime | วันที่ออก (Check-out, nullable) |
| `Status` | String(20) | สถานะ: active, inactive, moved_out |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

**Relations:**
- เชื่อมกับ `Room` (อ้างอิง Customer_Room)
- เชื่อมกับ `Payment` (บิลค่าเช่าทั้งหมด)
- เชื่อมกับ `Repair` (รายการแจ้งซ่อม)

---

### 💰 ตารางการเงินและค่าใช้จ่าย

#### 5. **Payment** - บิลค่าใช้จ่าย/ใบแจ้งหนี้
บิลรายเดือนสำหรับแต่ละห้อง

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Pay_ID` | String(10) | รหัสบิล (Primary Key) |
| `Customer_Room` | String(10) | เลขห้อง (Foreign Key → Customer) |
| `Month` | String(20) | เดือน (เช่น "มกราคม") |
| `Year` | Int | ปี พ.ศ. |
| `Rental` | Int | ค่าเช่าห้อง (บาท) |
| `WaterSupply` | Int | เลขมิเตอร์น้ำ (หน่วย) |
| `TotalWater` | Int | ค่าน้ำรวม (บาท) |
| `ElectricitySupply` | Int | เลขมิเตอร์ไฟ (หน่วย) |
| `TotalElec` | Int | ค่าไฟรวม (บาท) |
| `Internet` | Int | ค่าอินเทอร์เน็ต (บาท) |
| `Other` | Int | ค่าใช้จ่ายอื่นๆ (บาท) |
| `FineDay` | Int | จำนวนวันที่เกินกำหนดชำระ |
| `TotalFine` | Int | ค่าปรับล่าช้า (บาท) |
| `Paid` | Int | จำนวนเงินที่จ่ายแล้ว (บาท) |
| `TotalRental` | Int | **ยอดรวมทั้งหมด** (บาท) |
| `PaymentStatus` | Enum | สถานะ: PAID, UNPAID, PARTIAL, OVERDUE |
| `DayPaid` | DateTime | วันที่ชำระเงิน (nullable) |
| `DueDate` | DateTime | วันครบกำหนดชำระ |
| `createdAt` | DateTime | วันที่สร้างบิล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

**Relations:**
- เชื่อมกับ `Customer` ผ่าน Customer_Room

#### 6. **FixedRate** - อัตราค่าใช้จ่ายคงที่
ตารางเก็บอัตราค่าใช้จ่ายมาตรฐานที่ใช้คำนวณบิล

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `id` | Int | รหัส (Auto increment) |
| `Rental` | Int | ค่าเช่าพื้นฐาน (บาท/เดือน) |
| `Electricity` | Int | ค่าไฟ (บาท/หน่วย) |
| `Water` | Int | ค่าน้ำ (บาท/หน่วย) |
| `Fines` | Int | ค่าปรับล่าช้า (บาท/วัน) |
| `Internet` | Int | ค่าอินเทอร์เน็ต (บาท/เดือน) |
| `Parking` | Int | ค่าจอดรถ (บาท/เดือน) |
| `KeyCard` | Int | ค่าทำบัตรคีย์การ์ด (บาท) |
| `Deposit` | Int | เงินประกันห้อง (บาท) |
| `EffectiveDate` | DateTime | วันที่อัตรานี้มีผล |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

#### 7. **MeterReading** - บันทึกมิเตอร์น้ำ-ไฟ
บันทึกเลขมิเตอร์รายเดือนของแต่ละห้อง

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Reading_ID` | String | รหัสการอ่านมิเตอร์ (Auto generate) |
| `Room_Number` | String(10) | เลขห้อง |
| `Month` | String(20) | เดือน |
| `Year` | Int | ปี พ.ศ. |
| `WaterPrevious` | Int | มิเตอร์น้ำเดือนก่อน (หน่วย) |
| `WaterCurrent` | Int | มิเตอร์น้ำปัจจุบัน (หน่วย) |
| `WaterUsed` | Int | หน่วยน้ำที่ใช้ = Current - Previous |
| `ElecPrevious` | Int | มิเตอร์ไฟเดือนก่อน (หน่วย) |
| `ElecCurrent` | Int | มิเตอร์ไฟปัจจุบัน (หน่วย) |
| `ElecUsed` | Int | หน่วยไฟที่ใช้ = Current - Previous |
| `ReadDate` | DateTime | วันที่อ่านมิเตอร์ |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

#### 8. **Expense** - รายจ่ายของหอพัก
บันทึกค่าใช้จ่ายในการบริหารหอพัก

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Expense_ID` | String | รหัสรายจ่าย (Auto generate) |
| `Category` | String(50) | ประเภท (ค่าซ่อมแซม, ค่าน้ำ-ไฟส่วนกลาง, เงินเดือน) |
| `Description` | Text | รายละเอียด |
| `Amount` | Int | จำนวนเงิน (บาท) |
| `ExpenseDate` | DateTime | วันที่จ่ายเงิน |
| `PaidTo` | String(100) | จ่ายให้กับ (บุคคล/บริษัท) |
| `Receipt` | String(255) | ไฟล์ใบเสร็จ (path) |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

---

### 🔧 ตารางการซ่อมและบำรุงรักษา

#### 9. **Repair** - รายการแจ้งซ่อม
ระบบแจ้งซ่อมจากผู้เช่า

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Repair_ID` | String | รหัสแจ้งซ่อม (Auto generate - cuid) |
| `Customer_ID` | String(10) | รหัสลูกค้าผู้แจ้ง (Foreign Key) |
| `Customer_Room` | String(10) | เลขห้องที่แจ้งซ่อม |
| `Reason` | Text | สาเหตุ/อาการ |
| `RepairType` | String(50) | ประเภท: ไฟฟ้า, ประปา, เฟอร์นิเจอร์, อื่นๆ |
| `Status` | Enum | สถานะ: PENDING, IN_PROGRESS, COMPLETED, CANCELLED |
| `Priority` | String(20) | ความเร่งด่วน: urgent, normal, low |
| `ReportDate` | DateTime | วันที่แจ้งซ่อม |
| `CompletedDate` | DateTime | วันที่ซ่อมเสร็จ (nullable) |
| `Cost` | Int | ค่าใช้จ่ายในการซ่อม (บาท, nullable) |
| `Note` | Text | หมายเหตุเพิ่มเติม |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

**Relations:**
- เชื่อมกับ `Customer` (ผู้แจ้งซ่อม)

#### 10. **Maintenance** - การซ่อมบำรุง
บันทึกการซ่อมบำรุงห้อง/อาคาร

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Maintenance_ID` | String | รหัสการซ่อมบำรุง (Auto generate) |
| `Room_Number` | String(10) | เลขห้องที่ซ่อม (nullable) |
| `Emp_ID` | String(10) | รหัสพนักงานผู้ซ่อม (nullable, Foreign Key) |
| `MainType` | String(50) | ประเภท: ซ่อมห้อง, ซ่อมส่วนกลาง |
| `Description` | Text | รายละเอียดงานซ่อม |
| `Cost` | Int | ค่าใช้จ่าย (บาท) |
| `MainDate` | DateTime | วันที่ทำการซ่อม |
| `Status` | String(20) | สถานะ (default: completed) |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

**Relations:**
- เชื่อมกับ `Room` (ห้องที่ซ่อม)
- เชื่อมกับ `Employee` (ช่างผู้ซ่อม)

---

### 👷 ตารางพนักงาน

#### 11. **Employee** - พนักงาน
ข้อมูลพนักงานที่ดูแลหอพัก

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Emp_ID` | String(10) | รหัสพนักงาน (Primary Key) |
| `Emp_Name` | String(20) | ชื่อพนักงาน |
| `Emp_Lastname` | String(20) | นามสกุลพนักงาน |
| `Emp_Tel` | String(10) | เบอร์โทรศัพท์ |
| `Emp_Address` | String(150) | ที่อยู่ |
| `Emp_Salary` | Int | เงินเดือน (บาท) |
| `Emp_Position` | String(50) | ตำแหน่ง: แม่บ้าน, รปภ., ช่างซ่อม, พนักงานทั่วไป |
| `Emp_Status` | String(20) | สถานะ: active, inactive, resigned |
| `DateHired` | DateTime | วันที่เข้าทำงาน |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

**Relations:**
- เชื่อมกับ `Maintenance` (งานซ่อมบำรุงที่รับผิดชอบ)

---

### 📋 ตารางสัญญาและจอง

#### 12. **Contract** - สัญญาเช่า
เอกสารสัญญาเช่าระหว่างหอพักกับผู้เช่า

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Contract_ID` | String(20) | เลขที่สัญญา (Primary Key) |
| `Customer_ID` | String(10) | รหัสลูกค้า |
| `Room_Number` | String(10) | เลขห้องที่เช่า |
| `StartDate` | DateTime | วันเริ่มต้นสัญญา |
| `EndDate` | DateTime | วันสิ้นสุดสัญญา |
| `Deposit` | Int | เงินประกัน (บาท) |
| `MonthlyRent` | Int | ค่าเช่าต่อเดือน (บาท) |
| `Status` | String(20) | สถานะ: active, expired, terminated |
| `ContractFile` | String(255) | ไฟล์สัญญา PDF (path) |
| `TermsConditions` | Text | เงื่อนไขและข้อตกลง |
| `createdAt` | DateTime | วันที่สร้างสัญญา |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

#### 13. **Booking** - การจองห้องพัก
ระบบจองห้องล่วงหน้าก่อนเข้าพัก

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Booking_ID` | String | รหัสการจอง (Auto generate) |
| `Room_Number` | String(10) | เลขห้องที่จอง |
| `CustomerName` | String(100) | ชื่อผู้จอง |
| `CustomerTel` | String(10) | เบอร์โทรศัพท์ผู้จอง |
| `CustomerEmail` | String(100) | อีเมลผู้จอง (nullable) |
| `BookingDate` | DateTime | วันที่จอง |
| `MoveInDate` | DateTime | วันที่ต้องการเข้าพัก |
| `Status` | Enum | สถานะ: PENDING, CONFIRMED, CANCELLED, COMPLETED |
| `Deposit` | Int | มัดจำ (บาท, nullable) |
| `Note` | Text | หมายเหตุเพิ่มเติม |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

---

### 📢 ตารางประกาศและบันทึก

#### 14. **Announcement** - ประกาศ/ข่าวสาร
ระบบประกาศข่าวสารสำหรับผู้เช่า

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Announce_ID` | String | รหัสประกาศ (Auto generate) |
| `Title` | String(100) | หัวข้อประกาศ |
| `Content` | Text | เนื้อหาประกาศ |
| `Type` | String(20) | ประเภท: ข่าว, ประกาศ, แจ้งเตือน |
| `Priority` | String(20) | ความสำคัญ: urgent, normal, low |
| `PostDate` | DateTime | วันที่ประกาศ |
| `ExpireDate` | DateTime | วันหมดอายุ (nullable) |
| `Status` | String(20) | สถานะ: active, inactive, expired |
| `ImageUrl` | String(255) | รูปภาพประกอบ (path, nullable) |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

#### 15. **VisitorLog** - บันทึกผู้เข้า-ออก
ระบบบันทึกผู้มาเยี่ยม (Visitor Management)

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `Log_ID` | String | รหัสบันทึก (Auto generate) |
| `Customer_Room` | String(10) | เลขห้องที่มาเยี่ยม |
| `VisitorName` | String(100) | ชื่อผู้มาเยี่ยม |
| `VisitorTel` | String(10) | เบอร์โทรศัพท์ผู้มาเยี่ยม (nullable) |
| `Purpose` | String(100) | วัตถุประสงค์ (nullable) |
| `CheckInTime` | DateTime | เวลาเข้า |
| `CheckOutTime` | DateTime | เวลาออก (nullable) |
| `Note` | Text | หมายเหตุ (nullable) |
| `createdAt` | DateTime | วันที่สร้างข้อมูล |

---

### 📊 Enums (ค่าคงที่)

#### user_role
```
ADMIN     - ผู้ดูแลระบบ (เข้าถึงได้ทุกอย่าง)
USER      - ผู้ใช้ทั่วไป (ลูกค้า)
EMPLOYEE  - พนักงาน (สิทธิ์จำกัด)
```

#### RoomStatus
```
AVAILABLE    - ห้องว่าง (พร้อมให้เช่า)
OCCUPIED     - มีผู้เช่าอยู่
MAINTENANCE  - อยู่ระหว่างซ่อมบำรุง
RESERVED     - จองแล้ว (รอเข้าพัก)
```

#### PaymentStatus
```
PAID      - จ่ายครบแล้ว
UNPAID    - ยังไม่ได้จ่าย
PARTIAL   - จ่ายบางส่วน (ค้างอยู่)
OVERDUE   - เกินกำหนดชำระ
```

#### RepairStatus
```
PENDING      - รอดำเนินการ
IN_PROGRESS  - กำลังซ่อม
COMPLETED    - เสร็จสิ้น
CANCELLED    - ยกเลิก
```

#### BookingStatus
```
PENDING    - รอยืนยัน
CONFIRMED  - ยืนยันแล้ว
CANCELLED  - ยกเลิก
COMPLETED  - เข้าพักแล้ว (เปลี่ยนเป็น Customer)
```

---

### 🔗 ความสัมพันธ์ระหว่างตาราง (Entity Relationships)

```
Room (1) ──→ (N) Customer          : 1 ห้องมีได้หลายลูกค้า (ตามช่วงเวลา)
Room (1) ──→ (N) Maintenance       : 1 ห้องมีประวัติการซ่อมหลายครั้ง

Customer (1) ──→ (N) Payment       : 1 ลูกค้ามีหลายบิล
Customer (1) ──→ (N) Repair        : 1 ลูกค้าแจ้งซ่อมได้หลายครั้ง

Employee (1) ──→ (N) Maintenance   : 1 พนักงานรับผิดชอบงานซ่อมหลายงาน
```

---

## 📝 การใช้งาน

### 1. สมัครสมาชิกและเข้าสู่ระบบ

#### สมัครสมาชิก
```bash
POST /api/register
Content-Type: application/json

{
  "email": "admin@dormitory.com",
  "password": "password123",
  "role": "ADMIN"
}
```

#### เข้าสู่ระบบ
```bash
POST /api/login
Content-Type: application/json

{
  "email": "admin@dormitory.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@dormitory.com",
    "role": "ADMIN"
  }
}
```

### 2. สร้างห้องพัก

```bash
POST /api/rooms
Content-Type: application/json
Authorization: Bearer <token>

{
  "Room_Number": "101",
  "Room_Type": "มาตรฐาน",
  "Room_Floor": 1,
  "Room_Size": 20.5,
  "Room_Price": 3000,
  "Room_Deposit": 3000,
  "Description": "ห้องมาตรฐาน มีแอร์ ตู้เย็น"
}
```

### 3. เพิ่มลูกค้าใหม่ (Check-in)

```bash
POST /api/customers
Content-Type: application/json

{
  "Customer_ID": "C001",
  "Customer_Name": "สมชาย",
  "Customer_Lastname": "ใจดี",
  "Customer_Tel": "0812345678",
  "Customer_Room": "101",
  "Customer_Car": "กก 1234 กรุงเทพ",
  "Customer_Address": "123 ถนนสุขุมวิท กรุงเทพฯ",
  "ContractNo": "CON2024001",
  "DateCheckin": "2024-01-01T00:00:00Z"
}
```

### 4. สร้างบิลค่าเช่า

```bash
POST /api/payments
Content-Type: application/json

{
  "Pay_ID": "PAY001",
  "Customer_Room": "101",
  "Month": "มกราคม",
  "Year": 2024,
  "Rental": 3000,
  "WaterSupply": 100,
  "TotalWater": 200,
  "ElectricitySupply": 250,
  "TotalElec": 1250,
  "Internet": 300,
  "Other": 0,
  "FineDay": 0,
  "TotalFine": 0,
  "Paid": 0,
  "TotalRental": 4750,
  "DueDate": "2024-01-05T00:00:00Z"
}
```

### 5. แจ้งซ่อม

```bash
POST /api/repairs
Content-Type: application/json

{
  "Customer_ID": "C001",
  "Customer_Room": "101",
  "Reason": "แอร์เสีย ไม่เย็น",
  "RepairType": "ไฟฟ้า",
  "Priority": "urgent"
}
```

---

## 🛠️ เครื่องมือสำหรับทดสอบ API

### 1. ใช้ Postman
- ดาวน์โหลด [Postman](https://www.postman.com/downloads/)
- Import Collection และทดสอบ API

### 2. ใช้ cURL
```bash
# ทดสอบการเชื่อมต่อ
curl http://localhost:3001/api

# ดูห้องทั้งหมด
curl http://localhost:3001/api/rooms
```

### 3. ใช้ Prisma Studio (ดูข้อมูลในฐานข้อมูล)
```bash
npx prisma studio
```
เปิด Browser ที่ `http://localhost:5555`

---

## 📂 โครงสร้างโปรเจกต์

```
react-server/
├── controllers/        # Business Logic
│   ├── auth.js        # Authentication
│   ├── customer.js    # จัดการลูกค้า
│   ├── employee.js    # จัดการพนักงาน
│   ├── payment.js     # จัดการการชำระเงิน
│   ├── repair.js      # จัดการแจ้งซ่อม
│   ├── room.js        # จัดการห้องพัก
│   └── user.js        # จัดการผู้ใช้
├── middleware/         # Middleware
│   ├── auth.js        # JWT Authentication
│   └── user.js        # User Validation
├── routers/           # API Routes
│   ├── auth.js
│   ├── customer.js
│   ├── employee.js
│   ├── payment.js
│   ├── repair.js
│   ├── room.js
│   └── user.js
├── prisma/            # Prisma ORM
│   └── schema.prisma  # Database Schema
├── .env               # Environment Variables
├── docker-compose.yml # Docker Configuration
├── package.json       # Dependencies
└── server.js          # Main Server File
```

---

## 🔒 Security

- **Authentication**: ใช้ JWT (JSON Web Token)
- **Password**: เข้ารหัสด้วย bcrypt
- **CORS**: เปิดใช้งานสำหรับ Cross-Origin Requests
- **Environment Variables**: ข้อมูลสำคัญเก็บใน `.env`

---

## 🐛 การแก้ไขปัญหา

### ปัญหา: เชื่อมต่อฐานข้อมูลไม่ได้

**วิธีแก้:**
1. ตรวจสอบว่า Docker กำลังทำงาน
```bash
docker ps
```

2. ตรวจสอบ Container MySQL
```bash
docker-compose logs mysql
```

3. ตรวจสอบ `.env` ว่า DATABASE_URL ถูกต้อง

### ปัญหา: Port 3001 ถูกใช้งานอยู่

**วิธีแก้:**
แก้ไข `server.js` เปลี่ยน PORT หรือหยุด process ที่ใช้ Port อยู่

```bash
# macOS/Linux
lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### ปัญหา: Prisma Schema ไม่ sync กับฐานข้อมูล

**วิธีแก้:**
```bash
npx prisma generate
npx prisma db push
```

---

## 📞 ติดต่อ & สนับสนุน

หากพบปัญหาหรือต้องการสอบถาม สามารถติดต่อได้ที่:
- Email: support@dormitory.com
- GitHub Issues: [สร้าง Issue](https://github.com/your-repo/issues)

---

## �� License

MIT License - ใช้งานได้เสรี

---

## 🎯 สิ่งที่ควรพัฒนาต่อ

- [ ] เพิ่มระบบ Upload รูปภาพ
- [ ] เพิ่มระบบแจ้งเตือนผ่าน Line Notify
- [ ] เพิ่มระบบออกรายงาน (PDF)
- [ ] เพิ่ม API สำหรับตารางอื่นๆ ที่ยังไม่ได้ใช้งาน
- [ ] เพิ่ม Unit Testing
- [ ] Deploy ขึ้น Cloud (AWS, Azure, GCP)

---

**สร้างด้วย ❤️ สำหรับการจัดการหอพักที่มีประสิทธิภาพ**
