# **DashWeave: Fullstack Developer Assignment**

A **Next.js + Node.js** application demonstrating **JWT-based authentication**, **Google Sheets integration**, **dynamic table creation**, and **column addition** features. Users can **create multiple tables**, each fetching **data** from a specified **Google Sheet**, and add columns dynamically **without** modifying the original sheet.

---

## **Table of Contents**
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Environment Variables](#environment-variables)  
5. [Setup & Installation](#setup--installation)  
6. [Running the Project Locally](#running-the-project-locally)  
7. [Deployment](#deployment)  
8. [Google Sheets Usage & Access](#google-sheets-usage--access)  
9. [Third-Party Cookies Notice](#third-party-cookies-notice)  
10. [Explainer Video](#explainer-video)  
11. [Future Improvements](#future-improvements)  
12. [Contact & Acknowledgments](#contact--acknowledgments)

---

## **1. Features**

1. **User Authentication (JWT)**  
   - **Login & Signup** with **password hashing**.  
   - **JWT** is generated on login, stored in a **cookie**.  
   - Token expires after **1 hour** → automatic logout.

2. **Public Dashboard Page**  
   - Non-logged-in users see **site info**, **logo**, **login/signup** buttons.  
   - Logged-in users get redirected to the **main dashboard**.

3. **Main Dashboard**  
   - Lists all tables created by the **logged-in user**.  
   - **Create Table** button to specify **number of columns** , **type of each column header** and **column headers**.  
   - **Add Column** button to add columns to a particular table, specifying **header**, **type**, and **table number**.

4. **Google Sheets Integration**  
   - **Data** (rows) is fetched from a single sheet (read-only).  
   - **Column headers** are **not** fetched from Google Sheets; you must **create** them manually.  
   - **Automatic polling**: the app calls `checkAuthAndFetchData()` every **10 seconds** using `setInterval`, so **new rows** appear without manual refresh.

5. **Dynamic Column Addition**  
   - Columns added in the dashboard do **not** alter the actual Google Sheet.  
   - They are stored in **MongoDB** and displayed at the end of the existing columns.

6. **Responsive UI**  
   - Built with **Tailwind CSS** + **ShadcnUI** for a polished, **responsive** design.

---

## **2. Tech Stack**

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

## **3. Project Structure**

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
│   ├── .env.local       # Frontend env variables
│   ├── componenets.json
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── next.config.mjs
|   ├── postcss.congfig.mjs
│   ├── package.json
│   └── package-lock.json
└── README.md
```

---

## **4. Environment Variables (production)**

### **Frontend (`.env.local`)**
```bash
NEXT_PUBLIC_BACKEND_URL=<backend_url>
```
- **NEXT_PUBLIC_BACKEND_URL**: The URL of your deployed backend .

### **Backend (`.env`)**
```bash
PORT=<port number>                             # Render usually sets this automatically
FRONTEND_URL=<frontend url>           # e.g. https://dashweave.vercel.app
MONGO_URL=<mongodb_cluster_url>       # e.g. mongodb+srv://user:pass@cluster0.xxxx.mongodb.net/mydb
JWT_SECRET=<jwt_secret_key>           # e.g. mysecret
GOOGLE_SHEET_ID=<sheet_id>            # e.g. 1ABCxyz1234567890
GOOGLE_SERVICE_ACCOUNT_EMAIL=<service_account_email>     # e.g. my-service@my-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=<private_key>             #e.g.  -----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----
```
---

## **5. Setup & Installation**

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

3. **Configure Environment Variables (developement)**

   **Backend** (`assignment/backend/.env`):
   ```bash
   PORT=<port number>                    # e.g. 4000       
   FRONTEND_URL=<frontend url>           # e.g.  https://localhost:3000
   MONGO_URL=<mongodb_cluster_url>       # e.g. mongodb+srv://user:pass@cluster0.xxxx.mongodb.net/mydb(Mongo DB Atlas) or mongodb://xxx.x.x.x:xxxxx/xyz123(local Mongo)
   JWT_SECRET=<jwt_secret_key>           # e.g. mysecret
   GOOGLE_SHEET_ID=<sheet_id>            # e.g. 1ABCxyz1234567890
   GOOGLE_SERVICE_ACCOUNT_EMAIL=<service_account_email>     # e.g. my-service@my-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY=<private_key>             # e.g.  -----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----
   ```
   **Frontend** (`assignment/frontend/.env.local`):
   ```bash
   NEXT_PUBLIC_BACKEND_URL= <backend-url>     # e.g. https://localhost:4000
   ```

---

## **6. Running the Project Locally**

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

## **7. Deployment**

1. **Backend** (Render):
   - Create a new Web Service → Connect your GitHub → Select `assignment/backend`.
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

## **8. Google Sheets Usage & Access**

1. **Columns from Google Sheets**  
   - **Column headers** are **not** fetched from the sheet; you must **create** them manually in the dashboard.  
   - **Only row data** is fetched, so new rows appear automatically without changing your code.

2. **Single Sheet**  
   - Data is fetched from **one** sheet. Anyone can **view** it (read-only), but no one can edit unless they have **write access**.
   - If you want to edit or create a **new tab** in the same Sheet ID, you must request **write access** from me.

3. **Requesting Write Access**  
   - If you try to edit or create a new sheet tab, Google will prompt you to request access.
   - Alternatively, **email me** with your **email address** and **reason** for editing. I’ll grant you write access if appropriate.

4. **Changing the Sheet Name**  
   - If you create another tab (e.g., “Sheet2”), update the code to fetch data from `"Sheet1!A:Z"`to `"Sheet2!A1:Z"`  in **backend/controllers/sheets.js**.
   - To change the code, either **mail me** with the request or **clone** the repo, make a **demo branch**, and **submit a pull request**.

---

## **9. Third-Party Cookies Notice**

Because the **frontend** (`.vercel.app`) and **backend** (`.onrender.com`) are on different domains, cookies are treated as **third-party**. Many browsers **block third-party cookies** by default.

1. **Popup Warning**  
   - If cookies are blocked, a **popup** informs the user how to **enable** third-party cookies in **Chrome** (or other browsers).
2. **Site Functionality**  
   - If the user does **not** enable them, they **cannot** log in (the cookie is not stored).
3. **Long-Term Solution**  
   - Host frontend & backend under a single domain or use token-based auth in localStorage.

---


## **10. Future Improvements**

- **Unified Domain**: Move both frontend & backend under the same domain to avoid third-party cookie issues.  
- **Better Real-Time Updates**: Possibly use **WebSockets** or a real-time database.  
- **Additional Column Types**: Numeric, dropdown, file upload, etc.  
- **Enhanced UI**: More polished design, transitions, and usage of ShadcnUI components.  
- **Collaborative Editing**: Provide better multi-user editing with granular permissions.  

---

## **11. Contact & Acknowledgments**

- **Author**: [Diptesh Singh]  
- **Email**: [dipteshpiku@gmail.com]  
- **Google Sheet Access**: Email me if you want to **edit** the sheet or create new tabs.  
- **Code Changes**: Fork or clone the repo, create a branch, and **submit a pull request**.  
- **Note**: This project can be improved further. If given more time, I can add more features and refine the UI. Even after submission, I plan to continue working on it.
  
**Thank you for exploring DashWeave!** Feel free to open issues or pull requests on the GitHub repo for any suggestions or improvements.
