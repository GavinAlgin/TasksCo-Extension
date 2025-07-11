# 🧠 TaskCo. AI Productivity Extension

An intelligent productivity browser extension that helps users effortlessly manage tasks, perform AI-powered searches, auto-generate references, and validate authors — all within a sleek, user-friendly interface built with HTML, TailwindCSS, and JavaScript.

---

## 🚀 Features

- ✅ **Task Management**: Quickly add, edit, and organize your daily tasks.
- 🔍 **AI-Powered Search**: Instantly search for relevant information using AI.
- 📚 **Auto-Generated References**: Automatically create references and citations for your research or tasks.
- ✔️ **Author Validation**: Verify the authenticity and credibility of authors cited in your tasks.
- 🎨 **Responsive UI**: Built with TailwindCSS for a modern and responsive design.
- ⚡ **Lightweight & Fast**: Minimal dependencies for quick performance.

---

## 📦 Installation

### Manual Installation

1. Clone or download this repository.
2. Open your browser and go to the Extensions page (`chrome://extensions/` or equivalent).
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extension directory.
5. The extension icon will appear in your toolbar.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, TailwindCSS, JavaScript (ES6+)
- **AI Integration**: Calls to AI APIs (e.g., OpenAI GPT) for search and content generation
- **Validation Logic**: Custom JavaScript modules for author verification and reference formatting

---

## ⚙️ Usage

1. Click the extension icon to open the task manager panel.
2. Add new tasks with descriptions and deadlines.
3. Use the AI search feature to find relevant articles or data linked to your tasks.
4. Generate citations and references automatically with a single click.
5. Validate authors to ensure source credibility before adding references.

---

## 🧩 Architecture Overview

- **Popup UI**: Task management and search interface
- **Background Script**: Handles AI API requests and data processing
- **Content Scripts**: Injects validation features into webpages (optional)
- **Storage**: Local browser storage for task persistence

---

## 🔧 Development

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge)
- Node.js (optional, for building assets)

### Running Locally

```bash
# Clone the repo
git clone https://github.com/your-username/ai-productivity-extension.git
cd ai-productivity-extension

# (Optional) Install dependencies if you have a build step
npm install

# Build CSS using Tailwind (if applicable)
npm run build-css
