import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || 'dummy-key',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.post('/api/tutor-chat', async (req, res) => {
  try {
    const { messages, courseContext } = req.body;
    
    const systemInstruction = `You are Sage, an expert, encouraging, and articulate AI tutor at LearnVerse Academy. 
You help students master concepts in Computer Science, Quantum Physics, Artificial Intelligence, Neuroscience, Philosophy, and Astrophysics.
Current Course Context: ${courseContext || 'General Learning'}.
Provide clear, engaging, structured explanations with examples, analogies, and formatting. Keep responses helpful and educational.`;

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text || "I'm here to help you learn! What would you like to explore next?" });
  } catch (error: any) {
    console.error('Error in tutor-chat:', error);
    res.status(500).json({ error: error.message || 'Failed to generate tutor response' });
  }
});

app.post('/api/generate-course', async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const prompt = `Create a comprehensive, structured online course on the topic: "${topic}".
Return valid JSON matching this exact schema:
{
  "title": "Course Title",
  "description": "Engaging description of the course",
  "category": "Computer Science | AI & ML | Physics | Neuroscience | Philosophy | Arts",
  "level": "Beginner | Intermediate | Advanced",
  "duration": "e.g. 4 hours",
  "image": "https://images.unsplash.com/photo-1...",
  "chapters": [
    {
      "title": "Chapter Title",
      "lessons": [
        {
          "title": "Lesson Title",
          "content": "Detailed educational content with markdown formatting, key concepts, bullet points, and code or formula examples.",
          "quiz": {
            "question": "A multiple choice question testing this lesson?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctIndex": 0,
            "explanation": "Why this answer is correct."
          }
        }
      ]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      }
    });

    const text = response.text || '{}';
    const courseData = JSON.parse(text);
    res.json({ course: courseData });
  } catch (error: any) {
    console.error('Error generating course:', error);
    res.status(500).json({ error: error.message || 'Failed to generate course' });
  }
});

app.post('/api/explain-topic', async (req, res) => {
  try {
    const { topic, level } = req.body;
    const prompt = `Provide a clear, in-depth academic explanation of "${topic}" tailored for a ${level || 'intermediate'} student. Include real-world applications and key takeaways.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ explanation: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to explain topic' });
  }
});

async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LearnVerse Academy running on port ${PORT}`);
  });
}

startServer();
