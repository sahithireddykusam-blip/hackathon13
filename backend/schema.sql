-- ==============================================================================
-- ResearchGenius AI — Supabase PostgreSQL Schema
-- Project: ftaweirvnhtjbzizbfcp (https://ftaweirvnhtjbzizbfcp.supabase.co)
-- ==============================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'Researcher',
    institution TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    tags TEXT[],
    papers_count INT DEFAULT 0,
    reports_count INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Documents Table (PDFs, Manuscripts)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    file_type TEXT DEFAULT 'PDF',
    size BIGINT DEFAULT 0,
    pages INT DEFAULT 1,
    status TEXT DEFAULT 'Completed',
    summary TEXT,
    findings JSONB DEFAULT '[]'::jsonb,
    storage_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Research Sessions (Academic Search Queries & Synthesized Findings)
CREATE TABLE IF NOT EXISTS public.research_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    domain TEXT DEFAULT 'All Domains',
    overview TEXT,
    findings JSONB DEFAULT '[]'::jsonb,
    sources JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Research Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    abstract TEXT,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'Completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Default Policies (Permit access to public and service roles for the hackathon prototype)
DROP POLICY IF EXISTS "Public Access" ON public.users;
DROP POLICY IF EXISTS "Public Read Access" ON public.users;
CREATE POLICY "Public Access" ON public.users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Access" ON public.projects;
DROP POLICY IF EXISTS "Public Read Access" ON public.projects;
CREATE POLICY "Public Access" ON public.projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Access" ON public.documents;
DROP POLICY IF EXISTS "Public Read Access" ON public.documents;
CREATE POLICY "Public Access" ON public.documents FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Access" ON public.reports;
DROP POLICY IF EXISTS "Public Read Access" ON public.reports;
CREATE POLICY "Public Access" ON public.reports FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Access" ON public.research_sessions;
DROP POLICY IF EXISTS "Public Read Access" ON public.research_sessions;
CREATE POLICY "Public Access" ON public.research_sessions FOR ALL USING (true) WITH CHECK (true);
