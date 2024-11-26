# Data Entry Project (Glorry Enterprises)

## 📚 Overview  
The **Data Entry Project** is a freelancing application where admins manage users who are tasked with completing data-entry assignments. Users submit assignments within a specified time frame to earn rewards in real money.  

---

## 🚀 Project Flow  

### 🛠 Admin Side  
- **User Registration**:  
  Admin registers users and sends a welcome email containing a link to complete their profile.  
- **Document Submission**:  
  Users fill out and upload documents, including a stamp paper with terms and conditions, passport photo, and signature. Admin verifies the originality of these documents.  
- **Assignment Distribution**:  
  Upon successful verification, Admin assigns work to the user. Users receive another email containing login credentials (user ID and password).  
- **Performance Monitoring**:  
  Admin can track:  
  - User performance (e.g., work progress, completed assignments).  
  - Daily registered users and active users.  
  - All submitted user documents.  

### 👥 User Side  
- **Login**:  
  Users log in using credentials sent via email.  
- **Dashboard**:  
  Displays:  
  - Total assignments.  
  - Completed and pending assignments.  
  - Assignment deadlines.  
- **Data Entry Task**:  
  Users enter data in a specified format, including:  
  - Name, Email, Mobile Number, Address, IP, and License Number.  
  - Tasks must be completed within 5 days to qualify for rewards.  
- **Reward System**:  
  Users who submit tasks accurately within the deadline receive monetary rewards.  

---

## 💡 Business Model  
This project serves as a **freelancing platform** where users complete short-term data-entry assignments in exchange for monetary rewards.  

---

## 🛠 Tech Stack  
- **Backend**: Node.js  
- **Database**: PostgreSQL with Sequelize ORM  
- **File Uploads**: Multer  
- **Image Storage**: Cloudinary  
- **Validation**: Joi  
- **Authentication**: JSON Web Token (JWT)  
- **Email Communication**: Nodemailer  

---

## 📌 Features  
- User Registration and Email Notifications.  
- Document Upload and Verification.  
- Task Assignment and Monitoring.  
- User Performance Dashboard.  
- Reward System for Accurate Submissions.  

---

## 🖇 Installation  

### Prerequisites  
- Node.js  
- PostgreSQL  

### Steps  
1. Clone this repository:  
   ```bash
   git clone 
2. npm install  
3. Set up the environment variables in a .env file:
- PORT=5000  
- DB_HOST=localhost  
- DB_PORT=5432  
- DB_NAME=your_database_name  
- DB_USER=your_database_user  
- DB_PASSWORD=your_database_password  
- JWT_SECRET=your_secret_key  
- CLOUDINARY_URL=your_cloudinary_url  
4. Run the database migrations:
 -npx sequelize-cli db:migrate  
5. Start the server:
- npm start  

