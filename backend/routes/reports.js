import express from 'express';
import { supabase } from '../services/supabaseClient.js';

const router = express.Router();

let fallbackReportsStore = [
  {
    _id: 'rep-001',
    title: 'Evidence Synthesis: Advances in Neurosymbolic Scientific Discovery',
    abstract: 'An empirical synthesis evaluating the convergence of deep latent representations and formal symbolic logic verification across academic literature.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: 'Completed',
    sourcesCount: 6,
    content: {
      introduction: 'Scientific exploration has increasingly transitioned toward computational pipelines where deep neural networks formulate hypotheses and formal logic models verify invariant properties.',
      researchQuestions: [
        'How can non-convex neural predictions be systematically checked against formal axioms?',
        'What are the computational trade-offs of integrating multi-hop graph traversals with transformer attention?'
      ],
      literatureOverview: 'Seminal works by Davies et al. (Nature 2023) and Zhou et al. (arXiv 2024) illustrate that modular reasoning reduces hallucination by 32% while generating verifiable mathematical proofs.',
      mainFindings: 'Empirical data indicates that neurosymbolic systems provide bounded confidence intervals, preventing catastrophic divergence in automated scientific discovery.',
      comparativeAnalysis: 'Unlike purely generative LLMs which struggle with algebraic consistency, neurosymbolic architectures ground every assertion within formal ontology vertices.',
      gaps: 'A critical limitation remains the speed of automated theorem provers during large-scale batched inference.',
      conclusion: 'Hybrid reasoning models represent the most robust foundation for next-generation automated academic research systems.',
      references: [
        'Zhou, P., et al. (2024). Self-Discover: Large Language Models Self-Compose Reasoning Structures. arXiv:2402.03620.',
        'Davies, A., et al. (2023). Mathematical Discoveries from the Frontiers of Machine Learning. Nature, 600, 703–708.',
        'Jumper, J., et al. (2022). Highly accurate protein structure prediction with AlphaFold. Science, 373(6557).'
      ]
    }
  }
];

function formatReport(r) {
  return {
    _id: r.id,
    id: r.id,
    title: r.title,
    abstract: r.abstract,
    content: r.content || {},
    status: r.status || 'Completed',
    sourcesCount: r.content?.references?.length || 4,
    createdAt: r.created_at || new Date().toISOString(),
    updatedAt: r.updated_at || r.created_at || new Date().toISOString()
  };
}

// GET all reports
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase reports fetch warning:', error.message);
      return res.json(fallbackReportsStore);
    }

    return res.json(data.map(formatReport));
  } catch (err) {
    console.warn('Reports fetch error, falling back:', err.message);
    res.json(fallbackReportsStore);
  }
});

// POST save / update report
router.post('/', async (req, res) => {
  const reportData = req.body;

  try {
    const payload = {
      title: reportData.title || 'Academic Evidence Synthesis Report',
      abstract: reportData.abstract || '',
      content: reportData.content || {},
      status: reportData.status || 'Completed',
      updated_at: new Date().toISOString()
    };

    let result;
    if (reportData.id || (reportData._id && reportData._id.includes('-') && reportData._id.length > 30)) {
      const idToUpdate = reportData.id || reportData._id;
      const { data, error } = await supabase
        .from('reports')
        .upsert({ id: idToUpdate, ...payload })
        .select()
        .single();
      if (!error && data) result = formatReport(data);
    } else {
      const { data, error } = await supabase
        .from('reports')
        .insert([payload])
        .select()
        .single();
      if (!error && data) result = formatReport(data);
    }

    if (result) {
      return res.status(201).json(result);
    }
  } catch (err) {
    console.warn('Supabase report save error, falling back:', err.message);
  }

  // Fallback
  const existingIdx = fallbackReportsStore.findIndex((r) => r._id === reportData._id);
  if (existingIdx >= 0) {
    fallbackReportsStore[existingIdx] = {
      ...reportData,
      updatedAt: new Date().toISOString()
    };
    return res.json(fallbackReportsStore[existingIdx]);
  }

  const newReport = {
    ...reportData,
    _id: reportData._id || 'rep-' + Date.now(),
    createdAt: new Date().toISOString()
  };
  fallbackReportsStore.unshift(newReport);
  res.status(201).json(newReport);
});

export default router;
