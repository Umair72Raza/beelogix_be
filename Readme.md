# Job Portal API - Backend (Node.js, Express, MongoDB)

## 🚀 Introduction
This is a backend API for a job portal application, built using **Node.js, Express, and MongoDB**. It includes authentication, job listings, job applications, and file upload functionality.

## 📌 Features
- **User Authentication** (Signup/Login with JWT)
- **Job Listings API** (CRUD with Pagination)
- **Job Applications API** (Users can apply with a resume upload)
- **Authorization & Middleware** (Only authenticated users can post/apply for jobs)
- **File Upload to MongoDB**
- **Email Notifications** (Job owners receive notifications for new applications)

---

## 🛠️ Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/job-portal-api.git
cd job-portal-api
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4️⃣ Start the Server
```sh
npm start
```
OR
```sh
nodemon server.js  # If using nodemon
```

---

## 🔥 API Endpoints

### **1️⃣ Authentication APIs**
#### 🔹 **User Signup**
**Endpoint:** `POST /api/auth/signup`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
✅ **Response:**
```json
{
  "message": "User registered successfully",
  "token": "your-jwt-token"
}
```

#### 🔹 **User Login**
**Endpoint:** `POST /api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
✅ **Response:**
```json
{
  "message": "Login successful",
  "token": "your-jwt-token"
}
```
📌 **Copy the JWT token** from the response. Use it in protected routes as a Bearer Token.

---

### **2️⃣ Job Listings APIs**
#### 🔹 **Create a Job** (🔒 Requires Authentication)
**Endpoint:** `POST /api/jobs`
**Headers:** `{ Authorization: Bearer <your-token> }`
```json
{
  "title": "Software Engineer",
  "description": "Looking for a MERN stack developer",
  "company": "TechCorp",
  "requiredSkills": ["JavaScript", "React", "Node.js"]
}
```
✅ **Response:**
```json
{
  "message": "Job posted successfully",
  "job": { "id": "jobId", "title": "Software Engineer", ... }
}
```

#### 🔹 **Fetch All Jobs (With Pagination)**
**Endpoint:** `GET /api/jobs?page=1&limit=5`
✅ **Response:**
```json
{
  "jobs": [...],
  "totalPages": 3,
  "currentPage": 1
}
```

#### 🔹 **Update a Job** (🔒 Only the job creator can update)
**Endpoint:** `PUT /api/jobs/:id`
**Headers:** `{ Authorization: Bearer <your-token> }`
```json
{
  "title": "Senior Software Engineer",
  "description": "Looking for an experienced MERN stack developer"
}
```
✅ **Response:**
```json
{
  "message": "Job updated successfully",
  "job": { "id": "jobId", "title": "Senior Software Engineer", ... }
}
```

#### 🔹 **Delete a Job** (🔒 Only the job creator can delete)
**Endpoint:** `DELETE /api/jobs/:id`
**Headers:** `{ Authorization: Bearer <your-token> }`
✅ **Response:**
```json
{
  "message": "Job deleted successfully"
}
```

---

### **3️⃣ Job Applications APIs**
#### 🔹 **Apply for a Job (With Resume Upload)**
**Endpoint:** `POST /api/applications`
**Headers:** `{ Authorization: Bearer <your-token> }`
**Body (Form-data):**
- `jobId`: **(Job ID)**
- `applicantName`: **John Doe**
- `applicantEmail`: **john@example.com**
- `resume`: **Upload a PDF file**

✅ **Response:**
```json
{
  "message": "Application submitted successfully",
  "application": { "id": "applicationId", ... }
}
```

#### 🔹 **Fetch Applications for a Job** (🔒 Only job owner can view)
**Endpoint:** `GET /api/applications/:jobId`
**Headers:** `{ Authorization: Bearer <your-token> }`
✅ **Response:**
```json
{
  "applications": [
    {
      "id": "applicationId",
      "applicantName": "John Doe",
      "resumeFileId": "resumeFileId"
    }
  ]
}
```

---

### **4️⃣ File Upload & Download**
#### 🔹 **Download Resume File**
**Endpoint:** `GET /api/files/:id`
✅ **Expected Outcome:** The PDF file starts downloading.

---

## 📩 Email Notifications
When a user applies for a job, the job owner receives an email notification with the applicant’s details and a **resume download link**.

---

## 💡 Notes
- Ensure MongoDB is running and the correct **MONGO_URI** is set in `.env`.
- Use Postman for API testing.
- Use **JWT Token** in the **Authorization Header** for protected routes.

---

## 🔥 Future Improvements
- Real-time job updates using **Socket.io**
- Admin dashboard for managing job postings & applications
- Integration with **third-party email services (SendGrid, Mailgun)**

---
