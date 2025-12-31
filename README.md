# ⚡ Sharp Tools — Full Stack React Application

<p align="center">
  <a href="https://sharp-tools.netlify.app/"><strong>Live Demo</strong></a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#local-development">Local Setup</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green" />
  <img src="https://img.shields.io/badge/Image%20Processing-Sharp-orange" />
  <img src="https://img.shields.io/badge/Hosted%20On-Netlify%20%7C%20Render-purple" />
</p>

---

## 🚀 Live Application

👉 **https://sharp-tools.netlify.app/**

Sharp Tools is a **production-ready full-stack web application** designed for high-performance image processing.  
The frontend is built with **React + TypeScript (Vite)**, while the backend uses **Node.js + Express** with **Sharp** for fast and efficient image manipulation.

---

## 🧠 Architecture Overview

```
Client (Browser)
   │
   ▼
Frontend (Netlify)
   │  React + Vite (Static Build)
   ▼
Backend API (Render)
   │  Node.js + Express
   │  Sharp Image Processing
   ▼
Response / Processed Output
```

✔ Frontend and backend are **fully decoupled**  
✔ Server-side processing only (no browser overload)  
✔ Scalable and production-safe design

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- PostCSS
- ESLint

### Backend
- Node.js
- Express.js
- Sharp
- Multer
- UUID
- CORS

---

## 📁 Project Structure

```
sharp-tools-react-main/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── public/
│   └── logo.png
│
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Hero.tsx
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── postcss.config.js
├── eslint.config.js
└── README.md
```

---

## 🌍 Deployment

- **Frontend:** Netlify  
- **Backend:** Render  
- **Communication:** Secure HTTPS API calls

⚠️ Sharp runs **only on the backend** — this is intentional and correct.

---

## 🧪 Local Development

### Frontend
```bash
npm install
npm run dev
```
Runs on `http://localhost:5173`

### Backend
```bash
cd backend
npm install
node server.js
```
Runs on `http://localhost:5000`

---

## 📦 Build

### Frontend
```bash
npm run build
```

### Backend
Handled automatically by Render:
```bash
npm install
node server.js
```

---

## 🔍 Production Notes (No Sugarcoating)

- This is **not** a demo-only project.
- Image processing in the browser would be a mistake — avoided here.
- Netlify + Render is a clean, proven deployment combo.
- Scaling requires caching and external storage (S3-compatible).

---

## 📜 License

Open for learning and internal use.  
Extend responsibly.

---

**Built with correctness, not shortcuts.**
