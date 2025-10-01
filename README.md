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

### ตารางหลัก

#### 1. **user** - ผู้ใช้ระบบ
- Authentication และ Authorization
- Role: ADMIN, USER, EMPLOYEE

#### 2. **Room** - ห้องพัก
- ข้อมูลห้องพัก (เลขห้อง, ประเภท, ชั้น, ขนาด)
- สถานะ: AVAILABLE, OCCUPIED, MAINTENANCE, RESERVED
- ค่าเช่า, เงินประกัน

#### 3. **Customer** - ลูกค้า/ผู้เช่า
- ข้อมูลส่วนตัว (ชื่อ, เบอร์โทร, ที่อยู่)
- ข้อมูลการเช่า (เลขห้อง, เลขสัญญา, วันเช็คอิน)
- สถานะ: active, inactive, moved_out

#### 4. **Payment** - บิลค่าใช้จ่าย
- ค่าเช่า, ค่าน้ำ, ค่าไฟ, ค่าอินเทอร์เน็ต
- ค่าปรับ, ค่าอื่นๆ
- สถานะการชำระ: PAID, UNPAID, PARTIAL, OVERDUE

#### 5. **Repair** - รายการแจ้งซ่อม
- ข้อมูลการแจ้งซ่อม (ประเภท, เหตุผล, ความเร่งด่วน)
- สถานะ: PENDING, IN_PROGRESS, COMPLETED, CANCELLED

#### 6. **Employee** - พนักงาน
- ข้อมูลพนักงาน (ชื่อ, ตำแหน่ง, เงินเดือน)
- ตำแหน่ง: แม่บ้าน, รปภ., ช่างซ่อม

#### ตารางอื่นๆ
- **Admin** - ผู้ดูแลระบบ
- **FixedRate** - อัตราค่าใช้จ่ายคงที่
- **Maintenance** - ประวัติการซ่อมบำรุง
- **Contract** - สัญญาเช่า
- **MeterReading** - บันทึกมิเตอร์น้ำ-ไฟ
- **Announcement** - ประกาศ/ข่าวสาร
- **VisitorLog** - บันทึกผู้เข้า-ออก
- **Expense** - รายจ่ายของหอพัก
- **Booking** - การจองห้องพัก

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
