# 🔍 VeriFace

> **An AI-powered platform for detecting AI-generated images**

VeriFace analyzes uploaded images to determine whether they are **AI-generated or real**. It combines a trained machine learning model with a modern web stack — Next.js on the frontend and an Express/TypeScript backend — to deliver fast, accurate authenticity detection.

---

## 🚀 Features

- 🤖 **AI/Real Classification** — Detects whether an uploaded image is AI-generated or authentic
- ⚡ **Fast Detection** — Lightweight model inference with quick turnaround
- 🖼️ **Image Upload Support** — Simple drag-and-drop or file-select interface
- 🔗 **Decoupled Architecture** — Separate frontend, backend server, and ML API for clean separation of concerns
- 📊 **Trained ML Model** — Custom-trained model using Python and Jupyter Notebooks

---

## 🛠️ Tech Stack

### 🎨 Frontend
| Technology | Purpose |
|---|---|
| **Next.js** | React-based frontend framework |
| **TypeScript** | Strongly typed JavaScript |
| **CSS** | Styling and layout |

### ⚙️ Backend / Server
| Technology | Purpose |
|---|---|
| **Express.js** | Node.js web framework for the API server |
| **TypeScript** | Strongly typed server-side logic |
| **Node.js** | JavaScript runtime |

### 🧠 ML / AI Layer
| Technology | Purpose |
|---|---|
| **Python** | ML model training and inference |
| **Jupyter Notebook** | Model experimentation and training workflow |

---

## 📁 Project Structure

```
VeriFace/
├── frontend/         # Next.js + TypeScript frontend application
├── server/           # Express + TypeScript backend server
├── api/              # Python-based ML model inference API
├── Data Flow Diagram.png
├── .gitignore
└── README.md
```

---

## 🔄 Data Flow

<img width="2201" height="1047" alt="Data Flow Diagram" src="https://github.com/user-attachments/assets/5c4fc935-1d8c-4ae3-8fef-77e439304919" />

```
User uploads image
       ↓
  Next.js Frontend
       ↓
  Express Server (TypeScript)
       ↓
  Python ML API (Model Inference)
       ↓
  Result: AI-Generated ❌ / Real ✅
       ↓
  Response back to Frontend
```

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.x
- npm or yarn

---

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### ⚙️ Server Setup

```bash
cd server
npm install
npm run dev
```

---

### 🧠 ML API Setup

```bash
cd api
pip install -r requirements.txt
python main.py
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. See the repository for details.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/SaxenaLakshya">Lakshya Saxena</a> and <a href="https://github.com/abhinav-123457">Abhinav Shakya</a>
</div>
