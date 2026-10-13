import { supabase } from './services/supabaseClient.js';

async function seed() {
  console.log('--- Connecting & Seeding Supabase ---');

  // 1. Seed User
  const { data: user, error: userErr } = await supabase
    .from('users')
    .upsert(
      {
        email: 'alexis.chen@observatory.edu',
        name: 'Dr. Alexis Chen',
        role: 'Lead Researcher',
        institution: 'Institute for Advanced Computational Studies',
      },
      { onConflict: 'email' }
    )
    .select()
    .single();

  if (userErr) {
    console.error('User seed error:', userErr);
  } else {
    console.log('✓ Seeded User:', user.email, `(${user.id})`);
  }

  const userId = user ? user.id : null;

  // 2. Seed Projects
  const { data: existingProjects } = await supabase.from('projects').select('id, name');
  let projectId = existingProjects?.[0]?.id;

  if (!existingProjects || existingProjects.length === 0) {
    const { data: projects, error: projErr } = await supabase
      .from('projects')
      .insert([
        {
          user_id: userId,
          name: 'Neurosymbolic AI Reasoning & Verification',
          description: 'Investigating hybrid neural and symbolic solvers for scientific hypothesis generation and formal verification.',
          tags: ['AI', 'Symbolic Logic', 'Verification'],
          papers_count: 8,
          reports_count: 2,
        },
        {
          user_id: userId,
          name: 'Structural Biophysics & Macromolecular Folding',
          description: 'Comparative structural analysis using AlphaFold2 coordinate models and cryogenic electron microscopy datasets.',
          tags: ['Biophysics', 'Structural Biology'],
          papers_count: 14,
          reports_count: 1,
        },
      ])
      .select();

    if (projErr) {
      console.error('Projects seed error:', projErr);
    } else {
      console.log(`✓ Seeded ${projects.length} Projects.`);
      projectId = projects[0].id;
    }
  } else {
    console.log(`✓ Projects already exist: ${existingProjects.length} found.`);
  }

  // 3. Seed Documents
  const { data: existingDocs } = await supabase.from('documents').select('id');
  if (!existingDocs || existingDocs.length === 0) {
    const { data: docs, error: docErr } = await supabase
      .from('documents')
      .insert([
        {
          project_id: projectId,
          name: 'Self-Discover_Reasoning_Structures.pdf',
          file_type: 'PDF',
          size: 2457600,
          pages: 18,
          status: 'Completed',
          summary: 'Proposes SELF-DISCOVER framework enabling foundation models to compose atomic reasoning structures for scientific discovery.',
          findings: [
            { claim: 'Improves complex reasoning performance by up to 32% over standard Chain-of-Thought.', confidence: '98.2%' },
            { claim: 'Reasoning structures are modular and transferable across distinct domain queries.', confidence: '96.5%' }
          ]
        },
        {
          project_id: projectId,
          name: 'AlphaFold_Protein_Structural_Prediction.pdf',
          file_type: 'PDF',
          size: 4194304,
          pages: 32,
          status: 'Completed',
          summary: 'Attention neural network architecture predicting 3D macro-molecular configurations with atomic accuracy.',
          findings: [
            { claim: 'Median backbone accuracy within 0.96 Ångströms r.m.s.d. on CASP14 targets.', confidence: '99.1%' },
            { claim: 'Evoformer block integrates multisequence alignments and spatial graph geometry.', confidence: '97.4%' }
          ]
        }
      ])
      .select();

    if (docErr) {
      console.error('Documents seed error:', docErr);
    } else {
      console.log(`✓ Seeded ${docs.length} Documents.`);
    }
  } else {
    console.log(`✓ Documents already exist: ${existingDocs.length} found.`);
  }

  // 4. Seed Reports
  const { data: existingReports } = await supabase.from('reports').select('id');
  if (!existingReports || existingReports.length === 0) {
    const { data: reports, error: repErr } = await supabase
      .from('reports')
      .insert([
        {
          project_id: projectId,
          title: 'Evidence Synthesis: Advances in Neurosymbolic Scientific Discovery',
          abstract: 'An empirical synthesis evaluating the convergence of deep latent representations and formal symbolic logic verification across academic literature.',
          status: 'Completed',
          content: {
            introduction: 'Scientific exploration has increasingly transitioned toward computational pipelines where deep neural networks formulate hypotheses and formal logic models verify invariant properties.',
            researchQuestions: [
              'How can non-convex neural predictions be systematically checked against formal axioms?',
              'What are the computational trade-offs of integrating multi-hop graph traversals with transformer attention?'
            ],
            literatureOverview: 'Seminal works by Davies et al. (Nature 2023) and Zhou et al. (arXiv 2024) illustrate that modular reasoning reduces hallucination by 32%.',
            mainFindings: 'Empirical data indicates that neurosymbolic systems provide bounded confidence intervals, preventing catastrophic divergence.',
            conclusion: 'Hybrid reasoning models represent the most robust foundation for next-generation automated academic research systems.'
          }
        }
      ])
      .select();

    if (repErr) {
      console.error('Reports seed error:', repErr);
    } else {
      console.log(`✓ Seeded ${reports.length} Reports.`);
    }
  } else {
    console.log(`✓ Reports already exist: ${existingReports.length} found.`);
  }

  console.log('--- Supabase Seeding Complete ---');
}

seed().catch(console.error);
