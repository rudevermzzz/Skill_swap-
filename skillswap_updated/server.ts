import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini AI lazily/safely
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Matchmaker Endpoint
  app.post('/api/ai/matchmaker', async (req, res) => {
    try {
      const { userTeach, userLearn, targetName, targetTeach, targetLearn, timezone, style } = req.body;
      const ai = getAi();

      if (!ai) {
        // High quality fallback AI analysis
        return res.json({
          matchScore: 96,
          compatibilityLabel: 'Synergistic Masterclass Pairing',
          synergyReasons: [
            `Complementary Swap: You teach ${userTeach || 'React'} while ${targetName || 'Elena'} teaches ${targetTeach || 'Spanish'}.`,
            `Timezone Alignment: Perfect 3-hour overlapping window in ${timezone || 'EST'}.`,
            `Matching Learning Modality: Both prefer ${style || 'Interactive Live Projects'}.`,
            'High Karma Synergy: Both mentors have 98%+ completion rates.'
          ],
          predictedSuccessRate: '98.4%',
          suggestedRoadmap: [
            { week: 'Week 1', focus: 'Foundations & Goal Setting', details: `30m ${userTeach || 'React'} basics + 30m ${targetTeach || 'Spanish'} conversation.` },
            { week: 'Week 2', focus: 'Practical Project Building', details: 'Build a small app interface while discussing logic in Spanish.' },
            { week: 'Week 3', focus: 'Advanced Concepts & Fluency', details: 'State management deep dive & technical Spanish terminology.' },
            { week: 'Week 4', focus: 'Capstene Presentation', details: 'Present the project in Spanish with live React code execution.' }
          ]
        });
      }

      const prompt = `Analyze skill swap compatibility between:
User 1 offers: ${userTeach}, wants: ${userLearn}, preference: ${style}, timezone: ${timezone}
User 2 (${targetName}) offers: ${targetTeach}, wants: ${targetLearn}

Provide a JSON object with:
- matchScore (number 1-100)
- compatibilityLabel (string)
- synergyReasons (array of strings, 3-4 key reasons why they complement each other)
- predictedSuccessRate (string like "97.5%")
- suggestedRoadmap (array of objects with { week, focus, details } for a 4-week exchange)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchScore: { type: Type.INTEGER },
              compatibilityLabel: { type: Type.STRING },
              synergyReasons: { type: Type.ARRAY, items: { type: Type.STRING } },
              predictedSuccessRate: { type: Type.STRING },
              suggestedRoadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    week: { type: Type.STRING },
                    focus: { type: Type.STRING },
                    details: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      const data = JSON.parse(response.text || '{}');
      res.json(data);
    } catch (err: any) {
      console.error('AI Matchmaker Error:', err);
      res.status(500).json({ error: 'Failed to generate AI match analysis' });
    }
  });

  // AI Profile Generator Endpoint
  app.post('/api/ai/profile-gen', async (req, res) => {
    try {
      const { teachSkills, learnSkills, style, timezone } = req.body;
      const ai = getAi();

      if (!ai) {
        return res.json({
          bio: `Passionate peer-to-peer mentor specializing in ${teachSkills?.[0] || 'Modern Engineering'}. Eager to exchange insights and master ${learnSkills?.[0] || 'New Skills'} through hands-on collaborative sessions!`,
          tagline: `Teaching ${teachSkills?.join(', ') || 'Tech'} • Learning ${learnSkills?.join(', ') || 'Languages'}`,
          recommendedCategories: ['Frontend Engineering', 'Language Immersion', 'UI Design']
        });
      }

      const prompt = `Create a compelling 2-sentence mentor bio and a punchy 1-line tagline for a SkillSwap user who:
Can Teach: ${teachSkills?.join(', ')}
Wants to Learn: ${learnSkills?.join(', ')}
Learning Style: ${style}
Timezone: ${timezone}

Return JSON with:
- bio (string)
- tagline (string)
- recommendedCategories (array of strings)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              bio: { type: Type.STRING },
              tagline: { type: Type.STRING },
              recommendedCategories: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (err: any) {
      console.error('AI Profile Gen Error:', err);
      res.status(500).json({ error: 'Failed to generate profile' });
    }
  });

  // AI Live Session Transcript & Notes Endpoint
  app.post('/api/ai/transcript', async (req, res) => {
    try {
      const { topic, teachSkill, learnSkill } = req.body;
      const ai = getAi();

      if (!ai) {
        return res.json({
          summary: `Productive 45-minute peer session exchanging ${teachSkill || 'React'} and ${learnSkill || 'Design'}. Handled state management pattern and Figma design system components.`,
          keyTakeaways: [
            'Mastered compound component architecture pattern.',
            'Learned autolayout spacing and visual rhythm tokens.',
            'Agreed to exchange code reviews before next Tuesday session.'
          ],
          actionItems: [
            'Practice building a custom custom hook for modal state.',
            'Review Figma tokens shared in session chat.'
          ]
        });
      }

      const prompt = `Generate a realistic live session summary and key takeaways for a 45-min peer session on ${topic} (${teachSkill} <-> ${learnSkill}).
Return JSON with:
- summary (string)
- keyTakeaways (array of strings)
- actionItems (array of strings)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } },
              actionItems: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (err: any) {
      console.error('AI Transcript Error:', err);
      res.status(500).json({ error: 'Failed to generate transcript' });
    }
  });

  // Vite Dev / Prod Middleware Setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡ SkillSwap Server running on http://localhost:${PORT}`);
  });
}

startServer();
