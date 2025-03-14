Below is an **updated README** that includes **all** previous points **plus** your new notes regarding **Google Sheets column headers** and **access**. Feel free to adjust any formatting or wording as needed.

---

# **DashWeave: Fullstack Developer Intern Assignment**

A **Next.js + Node.js** application that demonstrates **JWT-based authentication**, **Google Sheets integration**, **dynamic table creation**, and **column addition** features. Users can **create multiple tables**, each fetching data from a **publicly viewable** Google Sheet, but **column headers** must be manually defined in the site. No one can edit the sheet unless they request write access from the project owner.

---

## **Table of Contents**

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Environment Variables](#environment-variables)  
5. [Setup & Installation](#setup--installation)  
6. [Running the Project Locally](#running-the-project-locally)  
7. [Google Sheets Data & Access](#google-sheets-data--access)  
8. [Deployment](#deployment)  
9. [Third-Party Cookies Notice](#third-party-cookies-notice)  
10. [Explainer Video](#explainer-video)  
11. [Future Improvements](#future-improvements)  
12. [Contact & Acknowledgments](#contact--acknowledgments)

---

## **Features**

1. **User Authentication (JWT)**  
   - **Login & Signup** pages with **password hashing**.  
   - **JWT** is generated on login and stored as a **cookie** in the browser.  
   - Token expires after **1 hour**; user is automatically logged out on expiry.

2. **Dashboard**  
   - **Non-logged-in** users see a **landing page** with site info, site logo, and **login/signup** buttons.  
   - **Logged-in** users are redirected to the **main dashboard**, which has a “Create Table” button, an “Add Column” button, and displays all tables for that user.

3. **Google Sheets Integration**  
   - **Rows only** are fetched from a **publicly viewable** Google Sheet.  
   - **Column headers** must be manually specified in the site (they are **not** fetched from the sheet).  
   - If new rows are added to the sheet, the data updates automatically (in real time or via polling).

4. **Multiple Tables**  
   - Each user can **create multiple tables** referencing the **same** or different parts of the Google Sheet.  
   - Table definitions (column headers, types, etc.) are stored in MongoDB.

5. **Dynamic Column Addition**  
   - Columns can be **added** to a **specific table** without modifying the actual Google Sheet.  
   - Users specify **column header**, **type** (Text/Date), and **table number**.  
   - Columns are **permanently** stored in the backend, not in the sheet.

6. **Responsive UI**  
   - Built with **Tailwind CSS** + **ShadcnUI** for a polished, **mobile-friendly** design.

---

## **Tech Stack**

- **Frontend**:  
  - **Next.js** (React framework)  
  - **Tailwind CSS** + **ShadcnUI**  
  - **Axios** for API calls

- **Backend**:  
  - **Node.js (Express)**  
  - **MongoDB** (Atlas)  
  - **JWT** for authentication  
  - **Google Sheets API** for sheet data

- **Deployment**:  
  - **Frontend** on **Vercel**  
  - **Backend** on **Render**

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
- **NEXT_PUBLIC_BACKEND_URL**: The URL of your deployed backend (e.g., `https://dash-weave.onrender.com`).

### **Backend (`.env`)**

```bash
# Render sets PORT automatically, but you can default it here
PORT=4000

FRONTEND_URL=<frontend_url>  # e.g. https://dashweave.vercel.app
MONGO_URL=<mongodb_cluster_url> # e.g. mongodb+srv://user:pass@cluster0.xxxx.mongodb.net/mydb
JWT_SECRET=<jwt_secret_key>
GOOGLE_SHEET_ID=<sheet_id>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<service_account_email>
GOOGLE_PRIVATE_KEY=<private_key_escaped_as_\\n_or_url_encoded>
```

> **Note**: If your **Google Private Key** has multiline or special characters, store it with escaped `\\n` in `.env` and convert them to real newlines at runtime:
> ```js
> process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
> ```

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
   - **Backend** (`assignment/backend/.env`):
     ```bash
     PORT=4000
     FRONTEND_URL=https://dashweave.vercel.app
     MONGO_URL=<mongodb_cluster_url>
     JWT_SECRET=<jwt_secret_key>
     GOOGLE_SHEET_ID=<sheet_id>
     GOOGLE_SERVICE_ACCOUNT_EMAIL=<service_account_email>
     GOOGLE_PRIVATE_KEY=<private_key_escaped_as_\\n>
     ```
   - **Frontend** (`assignment/frontend/.env.local`):
     ```bash
     NEXT_PUBLIC_BACKEND_URL=https://dash-weave.onrender.com
     ```

---

## **Running the Project Locally**

1. **Local MongoDB (Optional)**: If using local Mongo, update `MONGO_URL` accordingly.  
2. **Backend**:
   ```bash
   cd assignment/backend
   npm run dev
   ```
   The backend runs on `http://localhost:4000` (or the port you specify).

3. **Frontend**:
   ```bash
   cd ../frontend
   npm run dev
   ```
   The frontend runs on `http://localhost:3000`.

4. **Open** `http://localhost:3000` in your browser.

---

## **Google Sheets Data & Access**

1. **Column Headers Not Fetched**  
   - Only **rows** are fetched from the sheet.  
   - **You** must manually specify the column headers in the site (via “Create Table” or “Add Column”).

2. **Single Sheet**  
   - Currently, data is fetched from **one** specific sheet (`GOOGLE_SHEET_ID` + “Sheet1”).  
   - **Anyone** can view the sheet (read-only).  
   - If you want to **edit** the sheet or create new tabs within the same sheet ID, **request write access** from me:
     - Send a **proper message** or **email** with your Google account.  
     - I can grant you **edit permissions**.

3. **Creating a New Sheet (Tab)**  
   - If you create a **new tab** in the same sheet ID, you must **change the sheet name** in the backend code.  
   - For that, you also need **write access** to the sheet.  
   - If you want me to do it for you, just ask, or you can:
     - **Clone the code** in your PC, create a **demo branch**, make changes, then **create a pull request**.

---

## **Deployment**

1. **Backend** (Render):
   - Create a new Web Service → Connect your GitHub → Set root directory to `backend`.  
   - **Environment**:  
     ```bash
     PORT=4000
     FRONTEND_URL=https://dashweave.vercel.app
     MONGO_URL=<mongodb_cluster_url>
     JWT_SECRET=<jwt_secret_key>
     GOOGLE_SHEET_ID=<sheet_id>
     GOOGLE_SERVICE_ACCOUNT_EMAIL=<service_account_email>
     GOOGLE_PRIVATE_KEY=<private_key_escaped_as_\\n>
     ```
   - **Build Command**: `npm install`  
   - **Start Command**: `node index.js` or `npm start`

2. **Frontend** (Vercel):
   - Create a new project → Connect GitHub → Set root directory to `frontend`.  
   - **Environment**:  
     ```bash
     NEXT_PUBLIC_BACKEND_URL=https://dash-weave.onrender.com
     ```
   - **Build Command**: `npm run build`  
   - Output Directory: `.next`

---

## **Third-Party Cookies Notice**

Because **frontend** (`.vercel.app`) and **backend** (`.onrender.com`) are on **different domains**, cookies are treated as **third-party**. Browsers may block them by default. If cookies are blocked, the user **cannot log in** because the JWT cookie is not stored.

- A **popup** notifies the user to enable third-party cookies if they want to log in.  
- If they refuse, they **cannot** use the site.  
- For Chrome, go to `chrome://settings/cookies` → “Sites that can always use cookies” → add the domain.

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

- **Single Domain**: Host both frontend & backend under one domain to avoid third-party cookie issues.  
- **Real-Time Updates**: Implement WebSockets or real-time DB for instant sheet updates.  
- **More Column Types**: (Dropdown, numeric, file upload, etc.).  
- **Admin Panel**: For advanced management of tables and columns.  
- **UI/UX Enhancements**: More ShadcnUI components, transitions, and a more polished layout.

---

## **Contact & Acknowledgments**

- **Author**: Diptesh Singh (mention your contact details if needed)  
- **Email**: atulkrsinghal654@gmail.com (For questions or sheet write-access requests)  
- **GitHub Repo**: [Your Repo Link](https://github.com/YourUsername/dashweave)  
- **Note**: This project can be improved further. If given more time, I can add more features and refine the UI. Even after submission, I plan to continue working on it.

---

**Thank you for checking out DashWeave!** Feel free to open issues or pull requests for suggestions or improvements.  
