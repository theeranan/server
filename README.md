# 🏠 Dormitory Management System API

> **ระบบจัดการหอพัก Backend API** - ระบบสำหรับจัดการข้อมูลหอพักแบบครบวงจร พัฒนาด้วย Node.js, Express, Prisma ORM และ MySQL รองรับการจัดการห้องพัก ลูกค้า การชำระเงิน การแจ้งซ่อม และพนักงาน

---

## 📋 สารบัญ

1. [ความต้องการของระบบ](#️-ความต้องการของระบบ)
2. [การติดตั้ง](#-การติดตั้ง)
3. [การรันโปรเจกต์](#-การรันโปรเจกต์)
4. [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
5. [การทำงานของระบบ](#-การทำงานของระบบ-request-flow)
6. [API Endpoints](#-api-endpoints)
7. [โครงสร้างฐานข้อมูล](#️-โครงสร้างฐานข้อมูล)
8. [ตัวอย่างการใช้งาน](#-ตัวอย่างการใช้งาน)
9. [เครื่องมือทดสอบ API](#️-เครื่องมือสำหรับทดสอบ-api)
10. [Security](#-security)
11. [การแก้ไขปัญหา](#-การแก้ไขปัญหา)
12. [สิ่งที่ควรพัฒนาต่อ](#-สิ่งที่ควรพัฒนาต่อ)

---

## ⚙️ ความต้องการของระบบ

ก่อนเริ่มติดตั้ง ต้องมีโปรแกรมเหล่านี้ติดตั้งอยู่ในเครื่อง:

| โปรแกรม | เวอร์ชันแนะนำ | ลิงก์ดาวน์โหลด |
|---------|--------------|----------------|
| **Node.js** | 16.x ขึ้นไป | [nodejs.org](https://nodejs.org/) |
| **Docker Desktop** | Latest | [docker.com](https://www.docker.com/products/docker-desktop/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

---

## 📦 การติดตั้ง

### ขั้นตอนที่ 1: Clone โปรเจกต์

```bash
git clone <repository-url>
cd react-server
```

### ขั้นตอนที่ 2: ติดตั้ง Dependencies

```bash
npm install
```

### ขั้นตอนที่ 3: ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์ root ของโปรเจกต์:

```env
DATABASE_URL="mysql://root:root123@localhost:3306/dormitory"
```

> **💡 หมายเหตุ:** หากต้องการเปลี่ยนรหัสผ่านฐานข้อมูล ให้แก้ไขทั้งในไฟล์ `.env` และ `docker-compose.yml`

### ขั้นตอนที่ 4: เปิดฐานข้อมูล MySQL ด้วย Docker

```bash
docker-compose up -d
```

คำสั่งนี้จะ:
- ✅ สร้าง Container MySQL 8.0
- ✅ ตั้งค่าฐานข้อมูลชื่อ `dormitory`
- ✅ เปิด Port 3306
- ✅ ตั้งค่า User: `root` / Password: `root123`

### ขั้นตอนที่ 5: สร้างตารางในฐานข้อมูลด้วย Prisma

```bash
npx prisma generate
npx prisma db push
```

คำสั่งนี้จะ:
- `prisma generate` - สร้าง Prisma Client สำหรับเชื่อมต่อฐานข้อมูล
- `prisma db push` - สร้างตารางทั้งหมด (16 ตาราง) ในฐานข้อมูลตาม schema

---

## 🚀 การรันโปรเจกต์

### เริ่มต้น Development Server

```bash
npm start
```

Server จะทำงานที่ `http://localhost:3001` พร้อม Auto-reload (nodemon)

### ตรวจสอบว่า Server ทำงาน

เปิด Browser หรือใช้ cURL:

```bash
curl http://localhost:3001
```

ควรได้ Response:
```json
{
  "message": "Dormitory API Server is running!"
}
```

---

## 📂 โครงสร้างโปรเจกต์

```
react-server/
│
├── 📁 controllers/            # Business Logic Layer
│   ├── auth.js               # 🔐 การสมัครสมาชิก, เข้าสู่ระบบ, JWT
│   ├── customer.js           # 👤 CRUD ลูกค้า, Check-in/Check-out
│   ├── employee.js           # 👷 CRUD พนักงาน
│   ├── payment.js            # 💰 จัดการบิล, การชำระเงิน
│   ├── repair.js             # 🔧 จัดการแจ้งซ่อม
│   ├── room.js               # 🏠 CRUD ห้องพัก, อัพเดทสถานะ
│   └── user.js               # 👥 จัดการผู้ใช้งานระบบ
│
├── 📁 middleware/             # Security & Validation Layer
│   ├── auth.js               # 🔑 ตรวจสอบ JWT Token
│   └── user.js               # ✅ ตรวจสอบสิทธิ์ผู้ใช้ (Authorization)
│
├── 📁 routers/                # API Routes Layer
│   ├── auth.js               # POST /api/register, /api/login
│   ├── customer.js           # GET, POST, PATCH, DELETE /api/customers
│   ├── employee.js           # GET, POST, PATCH, DELETE /api/employees
│   ├── payment.js            # GET, POST, PATCH, DELETE /api/payments
│   ├── repair.js             # GET, POST, PATCH, DELETE /api/repairs
│   ├── room.js               # GET, POST, PATCH, DELETE /api/rooms
│   └── user.js               # GET, PATCH, DELETE /api/users
│
├── 📁 prisma/                 # Database Schema & ORM
│   ├── schema.prisma         # 📋 โครงสร้างฐานข้อมูล 16 ตาราง
│   └── migrations/           # 📂 ประวัติการเปลี่ยนแปลง Schema
│
├── 📁 node_modules/           # Dependencies
│
├── 📄 .env                    # 🔐 Environment Variables (ห้ามเอาขึ้น Git!)
├── 📄 .gitignore              # 🚫 ไฟล์ที่ไม่ต้องการเข้า Git
├── 📄 docker-compose.yml      # 🐳 Docker Configuration (MySQL)
├── 📄 package.json            # 📋 ข้อมูลโปรเจกต์และ Dependencies
├── 📄 package-lock.json       # 🔒 Lock versions
├── 📄 server.js               # ⚙️ Main Entry Point
└── 📄 README.md               # 📖 เอกสารนี้
```

### 📝 คำอธิบายไฟล์สำคัญ

#### **controllers/** - Business Logic Layer
ประมวลผลข้อมูลและจัดการ Database

- **auth.js** - จัดการการสมัครสมาชิก (Register) และเข้าสู่ระบบ (Login)
  - ตรวจสอบข้อมูล email/password
  - เข้ารหัสรหัสผ่านด้วย bcrypt
  - สร้าง JWT Token สำหรับ Authentication

- **customer.js** - จัดการข้อมูลลูกค้า/ผู้เช่า
  - CRUD ลูกค้า (สร้าง, อ่าน, แก้ไข, ลบ)
  - Check-in ลูกค้าเข้าพัก
  - Check-out ลูกค้าออกจากหอพัก
  - ดูลูกค้าที่อยู่ในหอ (status: active)

- **employee.js** - จัดการข้อมูลพนักงาน
  - CRUD พนักงาน (แม่บ้าน, รปภ., ช่างซ่อม)
  - ดูพนักงานที่ทำงานอยู่
  - อัพเดทสถานะพนักงาน (active/inactive/resigned)

- **payment.js** - จัดการบิลค่าเช่าและการชำระเงิน
  - สร้างบิลรายเดือน (ค่าเช่า, ค่าน้ำ, ค่าไฟ)
  - คำนวณค่าใช้จ่ายทั้งหมด
  - บันทึกการชำระเงิน (Paid/Unpaid/Partial)
  - ดูบิลที่ค้างชำระ (Overdue)

- **repair.js** - จัดการรายการแจ้งซ่อม
  - รับแจ้งซ่อมจากลูกค้า
  - อัพเดทสถานะการซ่อม (Pending/In Progress/Completed)
  - บันทึกค่าใช้จ่ายในการซ่อม
  - ดูรายการซ่อมตามห้อง/สถานะ

- **room.js** - จัดการข้อมูลห้องพัก
  - CRUD ห้องพัก
  - อัพเดทสถานะห้อง (Available/Occupied/Maintenance)
  - ดูห้องว่าง (Available rooms)
  - จัดการข้อมูลราคาและสิ่งอำนวยความสะดวก

- **user.js** - จัดการผู้ใช้งานระบบ
  - ดูรายชื่อ users ทั้งหมด
  - แก้ไขข้อมูล user (email, role)
  - ลบ user
  - เปลี่ยนสิทธิ์ (ADMIN/USER/EMPLOYEE)

#### **middleware/** - Security Layer
ตรวจสอบก่อนเข้าถึง Controller

- **auth.js** - ตรวจสอบ JWT Token
  - ดึง Token จาก Header (Authorization: Bearer <token>)
  - Verify Token ว่าถูกต้องและยังไม่หมดอายุ
  - แนบข้อมูล user ไปยัง req.user
  - ป้องกัน Endpoint ที่ต้อง Authentication

- **user.js** - ตรวจสอบสิทธิ์ผู้ใช้ (Authorization)
  - ตรวจสอบ Role (isAdmin, isEmployee)
  - Validate ข้อมูลที่ส่งมา (Input Validation)
  - ป้องกันการเข้าถึงข้อมูลที่ไม่มีสิทธิ์

#### **routers/** - API Routes Layer
กำหนด Endpoint และเชื่อม Controller

แต่ละไฟล์จะกำหนด Routes ดังนี้:

- **auth.js**: `POST /api/register`, `POST /api/login`
- **customer.js**: CRUD endpoints สำหรับ `/api/customers`
- **employee.js**: CRUD endpoints สำหรับ `/api/employees`
- **payment.js**: CRUD endpoints สำหรับ `/api/payments`
- **repair.js**: CRUD endpoints สำหรับ `/api/repairs`
- **room.js**: CRUD endpoints สำหรับ `/api/rooms`
- **user.js**: CRUD endpoints สำหรับ `/api/users`

#### **prisma/schema.prisma**
ไฟล์กำหนดโครงสร้างฐานข้อมูล
- กำหนด Models ทั้งหมด (16 ตาราง)
- กำหนด Relations ระหว่างตาราง
- กำหนด Enums (RoomStatus, PaymentStatus, RepairStatus, etc.)
- ตั้งค่า Database connection (MySQL)

#### **server.js** - Main Entry Point
ไฟล์หลักของ Server
- สร้าง Express app
- ตั้งค่า Middleware (morgan, body-parser, cors)
- โหลด Routers ทั้งหมดจากโฟลเดอร์ routers/
- Listen ที่ Port 3001
- แสดงรายการ API Endpoints ทั้งหมดเมื่อเริ่มต้น

#### **package.json** - Dependencies
- `express` - Web Framework
- `@prisma/client` - Prisma ORM Client
- `bcrypt` - เข้ารหัสรหัสผ่าน
- `jsonwebtoken` - สร้าง/ตรวจสอบ JWT
- `cors` - อนุญาต Cross-Origin Requests
- `morgan` - HTTP Request Logger
- `nodemon` - Auto-restart server (dev)

#### **docker-compose.yml**
ตั้งค่า Docker Container สำหรับ MySQL
- Image: mysql:8.0
- Database: dormitory
- Port: 3306
- Credentials: root/root123

---

## 🔄 การทำงานของระบบ (Request Flow)

เมื่อ Client ส่ง Request มายัง API จะมีการทำงานผ่านขั้นตอนดังนี้:

```
┌─────────────────────────────────────────────────────────────┐
│  1. Client ส่ง HTTP Request                                │
│     (GET, POST, PATCH, DELETE)                              │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  2. server.js รับ Request                                   │
│     Express Application (Port 3001)                         │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  3. Middleware ประมวลผล                                     │
│     ├─ morgan: บันทึก HTTP log                             │
│     ├─ body-parser: แปลง Request Body เป็น JSON           │
│     ├─ cors: ตรวจสอบ Cross-Origin                          │
│     └─ middleware/auth.js: ตรวจสอบ JWT Token (ถ้าต้องการ)  │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  4. Router เลือก Endpoint ที่ตรงกับ URL                    │
│     เช่น /api/customers → routers/customer.js              │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  5. Controller ประมวลผล Business Logic                     │
│     ├─ ตรวจสอบข้อมูล (Validation)                          │
│     ├─ เชื่อมต่อ Database ผ่าน Prisma Client               │
│     ├─ ดึงข้อมูล / สร้าง / แก้ไข / ลบ (CRUD)              │
│     └─ จัดรูปแบบ Response                                   │
└────────────────────┬────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────────┐
│  6. Client ได้รับ Response (JSON)                          │
│     { success: true, data: {...} }                          │
└─────────────────────────────────────────────────────────────┘
```

### 🎯 ตัวอย่างการทำงานจริง: สร้างลูกค้าใหม่

```
POST /api/customers
Body: { Customer_ID: "C001", Customer_Name: "สมชาย", ... }
│
├─→ server.js รับ Request
│
├─→ routers/customer.js เลือก Route ที่ตรงกับ POST /api/customers
│
├─→ controllers/customer.js (create function)
│   │
│   ├─ 1. Validate ข้อมูลที่ส่งมา (ครบหรือไม่, รูปแบบถูกต้องหรือไม่)
│   │
│   ├─ 2. เช็คว่าห้องที่ระบุว่างหรือไม่
│   │    prisma.room.findUnique({ where: { Room_Number: "101" } })
│   │
│   ├─ 3. สร้างลูกค้าใหม่ในฐานข้อมูล
│   │    prisma.customer.create({ data: {...} })
│   │
│   ├─ 4. อัพเดทสถานะห้องเป็น OCCUPIED
│   │    prisma.room.update({ Room_Status: "OCCUPIED" })
│   │
│   └─ 5. ส่ง Response กลับ
│       { success: true, customer: { id: "C001", ... } }
│
└─→ Client ได้รับผลลัพธ์
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | คำอธิบาย | Auth Required |
|--------|----------|----------|---------------|
| POST | `/api/register` | สมัครสมาชิกใหม่ | ❌ |
| POST | `/api/login` | เข้าสู่ระบบ (ได้ JWT Token) | ❌ |
| GET | `/api/auth/users` | ดูข้อมูล users ทั้งหมด | ✅ |

### 👥 Users

| Method | Endpoint | คำอธิบาย | Auth Required |
|--------|----------|----------|---------------|
| GET | `/api/users` | ดูรายชื่อ users ทั้งหมด | ❌ |
| PATCH | `/api/users/:userId` | แก้ไขข้อมูล user | ✅ |
| DELETE | `/api/users/:userId` | ลบ user | ✅ |

### 🏠 Rooms (ห้องพัก)

| Method | Endpoint | คำอธิบาย | Auth Required |
|--------|----------|----------|---------------|
| GET | `/api/rooms` | ดูห้องทั้งหมด | ❌ |
| GET | `/api/rooms/available` | ดูห้องว่าง (AVAILABLE) | ❌ |
| GET | `/api/rooms/:roomNumber` | ดูข้อมูลห้องเดียว | ❌ |
| POST | `/api/rooms` | สร้างห้องใหม่ | ✅ |
| PATCH | `/api/rooms/:roomNumber` | แก้ไขข้อมูลห้อง | ✅ |
| DELETE | `/api/rooms/:roomNumber` | ลบห้อง | ✅ |

### 👤 Customers (ลูกค้า/ผู้เช่า)

| Method | Endpoint | คำอธิบาย | Auth Required |
|--------|----------|----------|---------------|
| GET | `/api/customers` | ดูลูกค้าทั้งหมด | ❌ |
| GET | `/api/customers/active` | ดูลูกค้าที่อยู่ในหอพัก (active) | ❌ |
| GET | `/api/customers/:customerId` | ดูข้อมูลลูกค้าคนเดียว | ❌ |
| POST | `/api/customers` | สร้างลูกค้าใหม่ (Check-in) | ✅ |
| PATCH | `/api/customers/:customerId` | แก้ไขข้อมูลลูกค้า | ✅ |
| PATCH | `/api/customers/:customerId/checkout` | Check-out ลูกค้า | ✅ |
| DELETE | `/api/customers/:customerId` | ลบลูกค้า | ✅ |

### 💰 Payments (การชำระเงิน)

| Method | Endpoint | คำอธิบาย | Auth Required |
|--------|----------|----------|---------------|
| GET | `/api/payments` | ดูบิลทั้งหมด | ❌ |
| GET | `/api/payments/unpaid` | ดูบิลที่ยังไม่จ่าย (UNPAID/OVERDUE) | ❌ |
| GET | `/api/payments/room/:roomNumber` | ดูบิลตามเลขห้อง | ❌ |
| GET | `/api/payments/:payId` | ดูบิลเดียว | ❌ |
| POST | `/api/payments` | สร้างบิลใหม่ | ✅ |
| PATCH | `/api/payments/:payId` | แก้ไขบิล | ✅ |
| PATCH | `/api/payments/:payId/pay` | ชำระเงิน (อัพเดทสถานะ PAID) | ✅ |
| DELETE | `/api/payments/:payId` | ลบบิล | ✅ |

### 🔧 Repairs (แจ้งซ่อม)

| Method | Endpoint | คำอธิบาย | Auth Required |
|--------|----------|----------|---------------|
| GET | `/api/repairs` | ดูรายการแจ้งซ่อมทั้งหมด | ❌ |
| GET | `/api/repairs/pending` | ดูรายการแจ้งซ่อมที่รอดำเนินการ (PENDING) | ❌ |
| GET | `/api/repairs/room/:roomNumber` | ดูรายการแจ้งซ่อมตามห้อง | ❌ |
| GET | `/api/repairs/:repairId` | ดูรายการแจ้งซ่อมเดียว | ❌ |
| POST | `/api/repairs` | สร้างรายการแจ้งซ่อมใหม่ | ✅ |
| PATCH | `/api/repairs/:repairId` | แก้ไขรายการแจ้งซ่อม | ✅ |
| PATCH | `/api/repairs/:repairId/status` | อัพเดทสถานะการซ่อม | ✅ |
| DELETE | `/api/repairs/:repairId` | ลบรายการแจ้งซ่อม | ✅ |

### 👷 Employees (พนักงาน)

| Method | Endpoint | คำอธิบาย | Auth Required |
|--------|----------|----------|---------------|
| GET | `/api/employees` | ดูพนักงานทั้งหมด | ❌ |
| GET | `/api/employees/active` | ดูพนักงานที่ทำงานอยู่ (active) | ❌ |
| GET | `/api/employees/:empId` | ดูข้อมูลพนักงานคนเดียว | ❌ |
| POST | `/api/employees` | สร้างพนักงานใหม่ | ✅ |
| PATCH | `/api/employees/:empId` | แก้ไขข้อมูลพนักงาน | ✅ |
| DELETE | `/api/employees/:empId` | ลบพนักงาน | ✅ |

---

## 🗄️ โครงสร้างฐานข้อมูล

ระบบประกอบด้วยฐานข้อมูล **16 ตาราง** สำหรับจัดการข้อมูลหอพักแบบครบวงจร

---

### 🔐 ตารางระบบและผู้ใช้งาน

<details>
<summary><b>1. user</b> - ผู้ใช้ระบบ (คลิกเพื่อดูรายละเอียด)</summary>

ตารางสำหรับจัดการผู้ใช้งานระบบและการเข้าสู่ระบบ

| ฟิลด์ | ประเภท | คำอธิบาย |
|-------|--------|----------|
| `id` | Int | รหัสผู้ใช้ (Auto increment) |
| `email` | String | อีเมล (ไม่ซ้ำ, ใช้เป็น username) |
| `password` | String | รหัสผ่าน (เข้ารหัสด้วย bcrypt) |
| `role` | Enum | บทบาท: ADMIN, USER, EMPLOYEE |
| `createdAt` | DateTime | วันที่สร้างบัญชี |
| `updatedAt` | DateTime | วันที่แก้ไขล่าสุด |

</details>

<details>
<summary><b>2. Admin</b> - ผู้ดูแลระบบ (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

---

### 🏠 ตารางห้องพักและลูกค้า

<details>
<summary><b>3. Room</b> - ห้องพัก (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

<details>
<summary><b>4. Customer</b> - ลูกค้า/ผู้เช่า (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

---

### 💰 ตารางการเงินและค่าใช้จ่าย

<details>
<summary><b>5. Payment</b> - บิลค่าใช้จ่าย/ใบแจ้งหนี้ (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

<details>
<summary><b>6. FixedRate</b> - อัตราค่าใช้จ่ายคงที่ (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

<details>
<summary><b>7. MeterReading</b> - บันทึกมิเตอร์น้ำ-ไฟ (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

<details>
<summary><b>8. Expense</b> - รายจ่ายของหอพัก (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

---

### 🔧 ตารางการซ่อมและบำรุงรักษา

<details>
<summary><b>9. Repair</b> - รายการแจ้งซ่อม (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

<details>
<summary><b>10. Maintenance</b> - การซ่อมบำรุง (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

---

### 👷 ตารางพนักงาน

<details>
<summary><b>11. Employee</b> - พนักงาน (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

---

### 📋 ตารางสัญญาและจอง

<details>
<summary><b>12. Contract</b> - สัญญาเช่า (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

<details>
<summary><b>13. Booking</b> - การจองห้องพัก (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

---

### 📢 ตารางประกาศและบันทึก

<details>
<summary><b>14. Announcement</b> - ประกาศ/ข่าวสาร (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

<details>
<summary><b>15. VisitorLog</b> - บันทึกผู้เข้า-ออก (คลิกเพื่อดูรายละเอียด)</summary>

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

</details>

---

### 📊 Enums (ค่าคงที่)

#### **user_role** - บทบาทผู้ใช้
```
ADMIN     → ผู้ดูแลระบบ (เข้าถึงได้ทุกอย่าง)
USER      → ผู้ใช้ทั่วไป (ลูกค้า)
EMPLOYEE  → พนักงาน (สิทธิ์จำกัด)
```

#### **RoomStatus** - สถานะห้องพัก
```
AVAILABLE    → ห้องว่าง (พร้อมให้เช่า)
OCCUPIED     → มีผู้เช่าอยู่
MAINTENANCE  → อยู่ระหว่างซ่อมบำรุง
RESERVED     → จองแล้ว (รอเข้าพัก)
```

#### **PaymentStatus** - สถานะการชำระเงิน
```
PAID      → จ่ายครบแล้ว
UNPAID    → ยังไม่ได้จ่าย
PARTIAL   → จ่ายบางส่วน (ค้างอยู่)
OVERDUE   → เกินกำหนดชำระ
```

#### **RepairStatus** - สถานะการซ่อม
```
PENDING      → รอดำเนินการ
IN_PROGRESS  → กำลังซ่อม
COMPLETED    → เสร็จสิ้น
CANCELLED    → ยกเลิก
```

#### **BookingStatus** - สถานะการจอง
```
PENDING    → รอยืนยัน
CONFIRMED  → ยืนยันแล้ว
CANCELLED  → ยกเลิก
COMPLETED  → เข้าพักแล้ว (เปลี่ยนเป็น Customer)
```

---

### 🔗 ความสัมพันธ์ระหว่างตาราง (Entity Relationships)

```
Room (1) ──→ (N) Customer
  └─ 1 ห้องมีได้หลายลูกค้า (ตามช่วงเวลา)

Room (1) ──→ (N) Maintenance
  └─ 1 ห้องมีประวัติการซ่อมหลายครั้ง

Customer (1) ──→ (N) Payment
  └─ 1 ลูกค้ามีหลายบิล (รายเดือน)

Customer (1) ──→ (N) Repair
  └─ 1 ลูกค้าแจ้งซ่อมได้หลายครั้ง

Employee (1) ──→ (N) Maintenance
  └─ 1 พนักงานรับผิดชอบงานซ่อมหลายงาน
```

---

## 📝 ตัวอย่างการใช้งาน

### 1️⃣ สมัครสมาชิกและเข้าสู่ระบบ

#### สมัครสมาชิก (Register)
```bash
POST /api/register
Content-Type: application/json

{
  "email": "admin@dormitory.com",
  "password": "password123",
  "role": "ADMIN"
}
```

#### เข้าสู่ระบบ (Login)
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

> 💡 **เก็บ Token ไว้ใช้งาน:** นำ Token ที่ได้ไปใส่ใน Header: `Authorization: Bearer <token>` สำหรับ API ที่ต้องการ Authentication

---

### 2️⃣ สร้างห้องพัก

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
  "Description": "ห้องมาตรฐาน มีแอร์ ตู้เย็น เตียง ตู้เสื้อผ้า โต๊ะทำงาน"
}
```

---

### 3️⃣ เพิ่มลูกค้าใหม่ (Check-in)

```bash
POST /api/customers
Content-Type: application/json
Authorization: Bearer <token>

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

---

### 4️⃣ สร้างบิลค่าเช่า

```bash
POST /api/payments
Content-Type: application/json
Authorization: Bearer <token>

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

---

### 5️⃣ แจ้งซ่อม

```bash
POST /api/repairs
Content-Type: application/json
Authorization: Bearer <token>

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

### 1. Postman
- ดาวน์โหลด: [postman.com/downloads](https://www.postman.com/downloads/)
- Import Collection และทดสอบ API ได้ทันที
- รองรับการเก็บ Token และ Environment Variables

### 2. cURL (Command Line)
```bash
# ทดสอบการเชื่อมต่อ
curl http://localhost:3001/api

# ดูห้องทั้งหมด
curl http://localhost:3001/api/rooms

# ดูห้องว่าง
curl http://localhost:3001/api/rooms/available

# Login
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dormitory.com","password":"password123"}'
```

### 3. Prisma Studio (Database GUI)
```bash
npx prisma studio
```
เปิด Browser ที่ `http://localhost:5555` เพื่อดูและแก้ไขข้อมูลในฐานข้อมูลแบบ GUI

---

## 🔒 Security

ระบบมีมาตรการรักษาความปลอดภัยดังนี้:

| ส่วนประกอบ | เทคโนโลยี | คำอธิบาย |
|------------|-----------|----------|
| **Authentication** | JWT (JSON Web Token) | ใช้ Token ในการยืนยันตัวตน ไม่ต้องเก็บ Session บน Server |
| **Password Hashing** | bcrypt | เข้ารหัสรหัสผ่านก่อนเก็บลงฐานข้อมูล (One-way encryption) |
| **CORS** | cors middleware | ควบคุมการเข้าถึง API จาก Domain อื่น |
| **Environment Variables** | .env file | ข้อมูลสำคัญเก็บแยก ไม่เอาขึ้น Git |
| **Input Validation** | Middleware | ตรวจสอบข้อมูลที่ส่งเข้ามาก่อนประมวลผล |

### 🔑 การใช้งาน JWT Token

1. Login เพื่อรับ Token
2. นำ Token ไปใส่ใน Header ของ Request ถัดไป:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Server จะตรวจสอบ Token และดึงข้อมูล User จาก Token

---

## 🐛 การแก้ไขปัญหา

### ❌ ปัญหา: เชื่อมต่อฐานข้อมูลไม่ได้

**อาการ:** `Error: P1001: Can't reach database server`

**วิธีแก้:**

1. ตรวจสอบว่า Docker กำลังทำงาน
```bash
docker ps
```

2. ตรวจสอบ Log ของ MySQL Container
```bash
docker-compose logs mysql
```

3. ตรวจสอบ `.env` ว่า DATABASE_URL ถูกต้อง
```env
DATABASE_URL="mysql://root:root123@localhost:3306/dormitory"
```

4. Restart Docker Container
```bash
docker-compose down
docker-compose up -d
```

---

### ❌ ปัญหา: Port 3001 ถูกใช้งานอยู่

**อาการ:** `Error: listen EADDRINUSE: address already in use :::3001`

**วิธีแก้:**

**Option 1:** หยุด process ที่ใช้ Port 3001

```bash
# macOS/Linux
lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**Option 2:** เปลี่ยน Port ใน `server.js`
```javascript
const PORT = process.env.PORT || 3002; // เปลี่ยนจาก 3001 เป็น 3002
```

---

### ❌ ปัญหา: Prisma Schema ไม่ sync กับฐานข้อมูล

**อาการ:** Table ในฐานข้อมูลไม่ตรงกับ Schema หรือไม่มี Table

**วิธีแก้:**

```bash
# 1. Generate Prisma Client ใหม่
npx prisma generate

# 2. Push Schema ไปยัง Database
npx prisma db push

# 3. หากต้องการรีเซ็ตฐานข้อมูล (ข้อมูลจะหายทั้งหมด!)
npx prisma db push --force-reset
```

---

### ❌ ปัญหา: JWT Token หมดอายุ

**อาการ:** `Error: jwt expired`

**วิธีแก้:**
- Login ใหม่เพื่อรับ Token ใหม่
- ถ้าต้องการเพิ่มเวลาหมดอายุ แก้ไขใน `controllers/auth.js`:
```javascript
const token = jwt.sign(
  { userId: user.id, email: user.email },
  "secret-key",
  { expiresIn: "7d" } // เพิ่มจาก 24h เป็น 7 วัน
);
```

---

## 📞 ติดต่อ & สนับสนุน

หากพบปัญหาหรือต้องการสอบถาม สามารถติดต่อได้ที่:

- 📧 Email: support@dormitory.com
- 🐛 GitHub Issues: [สร้าง Issue](https://github.com/your-repo/issues)
- 📚 Documentation: README.md (ไฟล์นี้)

---

## 📄 License

MIT License - ใช้งานได้เสรี

---

## 🎯 สิ่งที่ควรพัฒนาต่อ

- [ ] เพิ่มระบบ Upload รูปภาพ (ห้องพัก, โปรไฟล์)
- [ ] เพิ่มระบบแจ้งเตือนผ่าน Line Notify (บิลครบกำหนด, แจ้งซ่อม)
- [ ] เพิ่มระบบออกรายงาน PDF (บิล, สัญญา)
- [ ] เพิ่ม API สำหรับตารางอื่นๆ ที่ยังไม่ได้ใช้งาน
  - Announcement (ประกาศ)
  - VisitorLog (บันทึกผู้เข้า-ออก)
  - MeterReading (บันทึกมิเตอร์)
  - Contract (สัญญาเช่า)
  - Booking (จองห้อง)
- [ ] เพิ่ม Unit Testing & Integration Testing
- [ ] เพิ่ม API Documentation ด้วย Swagger/OpenAPI
- [ ] เพิ่ม Rate Limiting (จำกัดจำนวน Request)
- [ ] เพิ่ม Logging System (Winston, Morgan)
- [ ] Deploy ขึ้น Cloud Platform (AWS, Azure, GCP, Heroku)

---

<div align="center">

**สร้างด้วย ❤️ สำหรับการจัดการหอพักที่มีประสิทธิภาพ**

⭐ ถ้าชอบโปรเจกต์นี้ อย่าลืม Star ให้ด้วยนะ! ⭐

---

**Tech Stack:** Node.js | Express | Prisma | MySQL | Docker | JWT

</div>
