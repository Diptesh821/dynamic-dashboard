Below is a **comprehensive README** file you can use in your **GitHub repository**. It incorporates **all** the points you mentioned, including **setup instructions**, **environment variables**, **deployment details**, **features**, and **acknowledgments**.

---

# **DashWeave: Fullstack Developer Intern Assignment**

A **Next.js + Node.js** application that demonstrates **JWT-based authentication**, **Google Sheets integration**, **dynamic table creation**, and **column addition** features. Users can **create multiple tables**, each fetching data from a specified **Google Sheet**, and add columns dynamically **without** modifying the original sheet.

---

## **Table of Contents**
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Environment Variables](#environment-variables)  
5. [Setup & Installation](#setup--installation)  
6. [Running the Project Locally](#running-the-project-locally)  
7. [Deployment](#deployment)  
8. [Third-Party Cookies Notice](#third-party-cookies-notice)  
9. [Explainer Video](#explainer-video)  
10. [Future Improvements](#future-improvements)  
11. [Contact & Acknowledgments](#contact--acknowledgments)

---

## **Features**

1. **User Authentication (JWT)**  
   - **Login & Signup** pages with **password hashing**.  
   - **JWT** is generated on login and set as a **cookie** in the browser.  
   - Token expires after **1 hour**; user is automatically logged out on expiry.

2. **Dashboard**  
   - Accessible to **non-logged-in** users, showing basic site info, logo, and **login/signup** buttons.  
   - If user is already logged in, it redirects to the main dashboard page.

3. **Google Sheets Integration**  
   - Users can create tables referencing a **Google Sheet**.  
   - Rows are dynamically fetched from the sheet, so new rows appear automatically.

4. **Create Multiple Tables**  
   - Each user can create multiple tables, specifying the **number of columns** and **column headers**.  
   - The table data is fetched from Google Sheets, and each table is **saved** in MongoDB.

5. **Dynamic Column Addition**  
   - Users can **add columns** to a **particular table** without modifying the actual Google Sheet.  
   - They specify the **column header**, **type** (Text/Date), and **table number**.  
   - The new column is **permanently saved** in the backend (MongoDB), but **not** in the sheet.

6. **Responsive UI**  
   - Built with **Tailwind CSS** + **ShadcnUI** for a polished, **responsive** design.

7. **Third-Party Cookies Notice**  
   - Because the **frontend** (Vercel) and **backend** (Render) are on different domains, cookies are **treated as third-party**.  
   - Users are shown a **popup** if third-party cookies are blocked, with instructions on how to enable them in their browser.

---

## **Tech Stack**

- **Frontend**:  
  - **Next.js** (React framework)  
  - **Tailwind CSS** + **ShadcnUI** for styling  
  - **Axios** for API calls

- **Backend**:  
  - **Node.js (Express)**  
  - **MongoDB** (hosted on MongoDB Atlas)  
  - **JWT** for authentication  
  - **Google Sheets API** for sheet data

- **Deployment**:  
  - **Frontend** on **Vercel**  
  - **Backend** on **Render** (free tier)

---

## **Project Structure**

```
assignment/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── servers/
│   ├── .env              # Backend env variables
│   ├── connection.js
│   ├── index.js          # Entry point
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── components/
│   ├── lib/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   ├── .env.local        # Frontend env variables
│   ├── next.config.mjs
│   ├── package.json
│   └── package-lock.json
└── README.md
```

---

## **Environment Variables**

### **Frontend (`.env.local`)**
```bash
NEXT_PUBLIC_BACKEND_URL=<backend_url>
```
- **NEXT_PUBLIC_BACKEND_URL**: The URL of your deployed backend (e.g. `https://dash-weave.onrender.com`).

### **Backend (`.env`)**
```bash
PORT=4000            # Render usually sets this automatically
FRONTEND_URL=<frontend_url>       # e.g. https://dashweave.vercel.app
MONGO_URL=<mongodb_cluster_url>   # e.g. mongodb+srv://user:pass@cluster0.xxxx.mongodb.net/mydb
JWT_SECRET=<jwt_secret_key>       # e.g. "mysecret"
GOOGLE_SHEET_ID=<sheet_id>        # e.g. 1ABCxyz1234567890
GOOGLE_SERVICE_ACCOUNT_EMAIL=<service_account_email>  # e.g. my-service@my-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=<private_key>  # Must be URL-encoded if it has special characters
```

**Note**: Make sure you **URL-encode** any special characters in the **Google Private Key** if you place it directly in `.env`.

---

## **Setup & Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YourUsername/dashweave.git
   ```
2. **Install Dependencies**

   **Backend**:
   ```bash
   cd assignment/backend
   npm install
   ```
   **Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

3. **Configure Environment Variables**

   **Backend** (`assignment/backend/.env`):
   ```bash
   PORT=4000
   FRONTEND_URL=https://dashweave.vercel.app
   MONGO_URL=<mongodb_cluster_url>
   JWT_SECRET=<jwt_secret_key>
   GOOGLE_SHEET_ID=<sheet_id>
   GOOGLE_SERVICE_ACCOUNT_EMAIL=<service_account_email>
   GOOGLE_PRIVATE_KEY=<private_key>
   ```

   **Frontend** (`assignment/frontend/.env.local`):
   ```bash
   NEXT_PUBLIC_BACKEND_URL=https://dash-weave.onrender.com
   ```

---

## **Running the Project Locally**

1. **Start MongoDB** (if you use local Mongo, otherwise ensure your Atlas URI is set).
2. **Backend**:
   ```bash
   cd assignment/backend
   npm run dev  # or npm start
   ```
   The backend typically runs on `http://localhost:4000`.

3. **Frontend**:
   ```bash
   cd assignment/frontend
   npm run dev
   ```
   The frontend runs on `http://localhost:3000`.

4. **Open** your browser at `http://localhost:3000` to view the site.

---

## **Deployment**

1. **Backend** (Render):
   - Create a new Web Service → Connect your GitHub → Select `assignment/backend` as the root directory.
   - Add the environment variables in **Render Dashboard** → **“Environment”**.
   - Build command: `npm install`  
   - Start command: `npm start` (or `node index.js`)

2. **Frontend** (Vercel):
   - Create a new Vercel project → Connect your GitHub → Select `assignment/frontend`.
   - Add environment variable in **Vercel** → `NEXT_PUBLIC_BACKEND_URL = https://your-backend.onrender.com`.
   - Build command: `npm run build`  
   - Output directory: `.next`

3. **Test**:
   - Visit your Vercel URL (e.g. `https://dashweave.vercel.app`).
   - Check logs on Render to ensure requests succeed.

---

## **Third-Party Cookies Notice**

Since the **frontend** (`.vercel.app`) and **backend** (`.onrender.com`) are on different domains, **cookies are considered third-party**.  
- Many browsers **block third-party cookies by default**.  
- If cookies are blocked, the user **cannot log in** because the token cookie isn’t stored.

### **Popup / Instructions**
We **detect** if cookies are blocked and show a **popup** instructing the user to:
1. **Go to Chrome settings** → **`chrome://settings/cookies`**  
2. **Disable “Block third-party cookies”** or **add** this site to the **“Sites that can always use cookies”** list.  

Users must **enable** third-party cookies to log in properly.

---

## **Explainer Video**
- **Loom Video**: [Loom Link Here](https://www.loom.com/)  
  Explains:
  - Project structure
  - Code walkthrough
  - Login flow
  - Google Sheets integration
  - Dynamic columns

---

## **Future Improvements**

- **Single Domain**: Move both frontend & backend under a single domain to avoid third-party cookie issues.
- **Better Real-Time Updates**: Use WebSockets or real-time database for sheet updates.
- **UI/UX Enhancements**: More polished design, transitions, and usage of ShadcnUI components.
- **Additional Features**: More column types (dropdown, numeric, file upload), admin panel, etc.
- **Improved Security**: Use **HTTP-only** first-party cookies or short-lived tokens to mitigate XSS.

---

## **Contact & Acknowledgments**

- **Author**: Diptesh Singh (mention your details)
- **Email**: [atulkrsinghal654@gmail.com](mailto:atulkrsinghal654@gmail.com)  
- **Thanks** to the **Fullstack Dev Intern** assignment creators for this opportunity.  
- **Note**: This project can still be improved. Given more time, we’ll add more features and refine the code.

---

**Thank you for checking out DashWeave!** Feel free to open issues or pull requests on the GitHub repo for any suggestions or improvements.
