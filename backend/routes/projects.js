import express from 'express';
import { supabase } from '../services/supabaseClient.js';

const router = express.Router();

let fallbackProjectsStore = [
  {
    _id: 'proj-01',
    name: 'Neurosymbolic AI Reasoning & Verification',
    description: 'Investigating hybrid neural and symbolic solvers for scientific hypothesis generation and formal verification.',
    papersCount: 8,
    reportsCount: 2,
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    tags: ['AI', 'Symbolic Logic', 'Verification']
  },
  {
    _id: 'proj-02',
    name: 'Structural Biophysics & Macromolecular Folding',
    description: 'Comparative structural analysis using AlphaFold2 coordinate models and cryogenic electron microscopy datasets.',
    papersCount: 14,
    reportsCount: 1,
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    tags: ['Biophysics', 'Structural Biology']
  }
];

// Helper to format Supabase row to API schema
function formatProject(p) {
  return {
    _id: p.id,
    id: p.id,
    name: p.name,
    description: p.description,
    tags: p.tags || [],
    papersCount: p.papers_count ?? 0,
    reportsCount: p.reports_count ?? 0,
    updatedAt: p.updated_at || p.created_at || new Date().toISOString(),
    createdAt: p.created_at
  };
}

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase projects fetch warning:', error.message);
      return res.json(fallbackProjectsStore);
    }

    return res.json(data.map(formatProject));
  } catch (err) {
    console.warn('Projects fetch error, falling back:', err.message);
    res.json(fallbackProjectsStore);
  }
});

// POST create project
router.post('/', async (req, res) => {
  const { name, description, tags } = req.body;

  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          name: name || 'Untitled Research Workspace',
          description: description || 'Academic research project space.',
          tags: tags || ['General Science'],
          papers_count: 0,
          reports_count: 0
        }
      ])
      .select()
      .single();

    if (error) {
      console.warn('Supabase project insert warning:', error.message);
      throw error;
    }

    const formatted = formatProject(data);
    fallbackProjectsStore.unshift(formatted);
    return res.status(201).json(formatted);
  } catch (err) {
    const fallbackProj = {
      _id: 'proj-' + Date.now(),
      name: name || 'Untitled Research Workspace',
      description: description || 'Academic research project space.',
      tags: tags || ['General Science'],
      papersCount: 0,
      reportsCount: 0,
      updatedAt: new Date().toISOString()
    };
    fallbackProjectsStore.unshift(fallbackProj);
    return res.status(201).json(fallbackProj);
  }
});

export default router;
