import express from 'express';

const router = express.Router();

const knowledgeGraphData = {
  nodes: [
    {
      id: 'k1',
      label: 'Self-Discover Reasoning',
      x: 280,
      y: 160,
      type: 'core',
      papersCount: 3,
      isKey: true,
      description: 'Composition of atomic reasoning modules into specialized structures tailored to complex scientific tasks.'
    },
    {
      id: 'k2',
      label: 'Graph Neural Networks',
      x: 520,
      y: 140,
      type: 'core',
      papersCount: 5,
      isKey: false,
      description: 'Message-passing neural networks for relational geometric data and invariant analysis.'
    },
    {
      id: 'k3',
      label: 'Neurosymbolic Verification',
      x: 400,
      y: 320,
      type: 'discovery',
      papersCount: 4,
      isKey: true,
      description: 'Hybrid integration of symbolic logic solvers with gradient-based latent representations.'
    },
    {
      id: 'k4',
      label: 'Quantized Transformers (QLoRA)',
      x: 180,
      y: 380,
      type: 'core',
      papersCount: 2,
      isKey: false,
      description: 'Low-rank adaptation on 4-bit NormalFloat quantized tensor weights for efficient academic laboratories.'
    },
    {
      id: 'k5',
      label: 'Evoformer Attention',
      x: 620,
      y: 360,
      type: 'discovery',
      papersCount: 2,
      isKey: true,
      description: 'Co-evolutionary multi-sequence alignment spatial processing for macro-molecular structures.'
    },
    {
      id: 'k6',
      label: 'Attribution & Saliency',
      x: 440,
      y: 480,
      type: 'core',
      papersCount: 3,
      isKey: false,
      description: 'Gradient attribution maps for detecting hidden mathematical invariants and algebraic knots.'
    }
  ],
  edges: [
    { source: 'k1', target: 'k3', label: 'guides verification', isHypothesis: false },
    { source: 'k2', target: 'k3', label: 'spatial topology', isHypothesis: false },
    { source: 'k2', target: 'k6', label: 'attribution maps', isHypothesis: false },
    { source: 'k4', target: 'k1', label: 'efficient compute', isHypothesis: true },
    { source: 'k3', target: 'k5', label: 'structural constraints', isHypothesis: true },
    { source: 'k6', target: 'k5', label: 'feature discovery', isHypothesis: false }
  ]
};

router.get('/graph', (req, res) => {
  res.json(knowledgeGraphData);
});

export default router;
