# ResearchGenius AI — Discover Knowledge. Connect Ideas.

> An AI-powered Academic Research Assistant and Evidence Synthesis Platform designed for researchers, academics, and scholars.

Built with **React 19**, **Vite**, **Express**, and **Supabase PostgreSQL**.

---

## 🌟 Features

- **Investigation Workspaces**: Organize literature, manuscripts, and reports by research projects.
- **Academic Search & Evidence Synthesis**: Synthesize deep academic inquiries with grounded claims, methodology insights, and peer-reviewed citations.
- **Document & Manuscript Library**: Upload academic PDFs, parse methodologies, extract statistical findings, and perform contextual Q&A.
- **Interactive Knowledge Graph**: Explore multi-node relationships between scientific domains, core methodologies, and hypotheses.
- **Evidence Reports**: Generate and edit structured evidence synthesis reports complete with research questions, comparative analysis, and references.
- **Live Supabase PostgreSQL Database**: Cloud-persisted storage with Row Level Security (RLS) policies for projects, documents, reports, and research sessions.

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (Midnight Observatory Design System)
- **Icons**: Lucide React
- **Client Database**: Supabase JS Client (`@supabase/supabase-js`)

### Backend
- **Server**: Node.js + Express (ES Modules)
- **Database**: Supabase PostgreSQL
- **AI Engine**: Google Gemini API (`@google/generative-ai`)
- **Document Processing**: `pdf-parse`, `multer`

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn
- A [Supabase](https://supabase.com) account (free tier)

### 2. Clone Repository
```bash
git clone https://github.com/your-username/researchgenius-ai.git
cd researchgenius-ai
```

### 3. Setup Environment Variables

#### Backend (`backend/.env`)
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: Google Gemini API Key for live AI generation
GEMINI_API_KEY=your_gemini_api_key
```

#### Frontend (`frontend/.env`)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

### 4. Database Setup (Supabase)
1. Go to your Supabase Dashboard &rarr; **SQL Editor**.
2. Run the SQL script found in `backend/schema.sql` to create all tables and RLS policies.
3. (Optional) Run the seed script to populate initial sample projects:
   ```bash
   cd backend
   node seedSupabase.js
   ```

---

### 5. Running Locally

#### Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

#### Start Development Servers
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Visit **http://localhost:5173** in your browser.

---

## 🌐 Deploy to Render

You can deploy this full-stack application onto Render in two simple ways:

### Option 1: Automatic Blueprint (Recommended)
1. Go to **[Render Dashboard](https://dashboard.render.com)** &rarr; Click **New +** &rarr; **Blueprint**.
2. Connect your GitHub repository: `sahithireddykusam-blip/hackathon13`.
3. Render will automatically detect `render.yaml`.
4. Enter your Supabase environment variables when prompted:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY` (optional)
5. Click **Apply**. Render will build and deploy your entire full-stack app on a single live URL!

---

### Option 2: Manual Web Service
1. In Render Dashboard, click **New +** &rarr; **Web Service**.
2. Connect `sahithireddykusam-blip/hackathon13`.
3. Configure the following fields:
   - **Name**: `researchgenius-ai`
   - **Region**: Oregon (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: *(leave blank / root)*
   - **Runtime**: `Node`
   - **Build Command**: `npm run render-build`
   - **Start Command**: `npm run start`
   - **Instance Type**: `Free`
4. Under **Environment Variables**, add:
   - `NODE_VERSION` = `20.18.0`
   - `PORT` = `10000`
   - `JWT_SECRET` = `(any secure random string)`
   - `SUPABASE_URL` = `https://ftaweirvnhtjbzizbfcp.supabase.co`
   - `SUPABASE_ANON_KEY` = `(your anon key)`
   - `SUPABASE_SERVICE_ROLE_KEY` = `(your service role key)`
5. Click **Create Web Service**.

---

## 📄 License
MIT License.
