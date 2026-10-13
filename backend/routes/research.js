import express from 'express';
import { generateResearchSynthesis } from '../services/geminiService.js';
import { supabase } from '../services/supabaseClient.js';

const router = express.Router();

let researchHistoryStore = [];

router.post('/search', async (req, res) => {
  try {
    const { query, filters } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const synthesis = await generateResearchSynthesis(query, filters);
    
    // Save to Supabase research_sessions
    try {
      await supabase.from('research_sessions').insert([
        {
          query,
          domain: filters?.domain || 'All Domains',
          overview: synthesis.overview || '',
          findings: synthesis.findings || [],
          sources: synthesis.sources || []
        }
      ]);
    } catch (dbErr) {
      console.warn('Supabase research session save warning:', dbErr.message);
    }

    researchHistoryStore.unshift({
      id: 'session-' + Date.now(),
      query,
      timestamp: new Date().toISOString(),
      sourcesCount: synthesis.sources?.length || 0
    });

    res.json(synthesis);
  } catch (err) {
    console.error('Research search error:', err);
    res.status(500).json({ error: 'Failed to synthesize research results' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const { data } = await supabase
      .from('research_sessions')
      .select('id, query, domain, created_at, sources')
      .order('created_at', { ascending: false })
      .limit(20);

    if (data && data.length > 0) {
      return res.json(
        data.map((s) => ({
          id: s.id,
          query: s.query,
          timestamp: s.created_at,
          sourcesCount: Array.isArray(s.sources) ? s.sources.length : 0
        }))
      );
    }
  } catch {}

  res.json(researchHistoryStore);
});

export default router;
