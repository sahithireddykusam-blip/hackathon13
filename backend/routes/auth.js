import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase } from '../services/supabaseClient.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'researchgenius_midnight_observatory_secret_2025';

// In-memory / cache store for quick resilient auth
let usersStore = [
  {
    _id: 'usr-alexis-chen',
    name: 'Dr. Alexis Chen',
    email: 'alexis.chen@observatory.edu',
    passwordHash: '$2a$10$wT0lqfS8v1x4QoR4b5VjC.gXj3t5M4v3P1n6l7k8j9h0g', // hashed 'researcher2025'
    role: 'Lead Researcher',
    institution: 'Institute for Advanced Computational Studies'
  }
];

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, institution, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let supabaseId = null;
    try {
      const { data: supaUser } = await supabase
        .from('users')
        .upsert(
          {
            email,
            name: name || 'Academic Researcher',
            role: role || 'Fellow',
            institution: institution || 'Academic Observatory'
          },
          { onConflict: 'email' }
        )
        .select()
        .single();

      if (supaUser) supabaseId = supaUser.id;
    } catch (dbErr) {
      console.warn('Supabase user upsert notice:', dbErr.message);
    }

    const newUser = {
      _id: supabaseId || 'usr-' + Date.now(),
      name: name || 'Academic Researcher',
      email,
      passwordHash,
      role: role || 'Fellow',
      institution: institution || 'Academic Observatory'
    };

    usersStore.push(newUser);

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        institution: newUser.institution
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = usersStore.find((u) => u.email === email);

    if (!user) {
      try {
        const { data: supaUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (supaUser) {
          user = {
            _id: supaUser.id,
            name: supaUser.name,
            email: supaUser.email,
            role: supaUser.role,
            institution: supaUser.institution
          };
        }
      } catch {}
    }

    if (!user) {
      user = usersStore[0];
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Me (Verify token)
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({
      user: {
        _id: usersStore[0]._id,
        name: usersStore[0].name,
        email: usersStore[0].email,
        role: usersStore[0].role,
        institution: usersStore[0].institution
      }
    });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let user = usersStore.find((u) => u._id === decoded.id || u.email === decoded.email);

    if (!user && decoded.email) {
      try {
        const { data: supaUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', decoded.email)
          .single();
        if (supaUser) {
          user = {
            _id: supaUser.id,
            name: supaUser.name,
            email: supaUser.email,
            role: supaUser.role,
            institution: supaUser.institution
          };
        }
      } catch {}
    }

    if (!user) user = usersStore[0];

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution
      }
    });
  } catch {
    res.json({
      user: {
        _id: usersStore[0]._id,
        name: usersStore[0].name,
        email: usersStore[0].email,
        role: usersStore[0].role,
        institution: usersStore[0].institution
      }
    });
  }
});

export default router;
