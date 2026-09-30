import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(process.cwd(), "public")));

// API health endpoint for Cloud Run container health checks
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "AEGIS MEN Skincare",
    timestamp: new Date().toISOString()
  });
});

// Lazy-initialized Gemini API client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey });
  }
  return genAIClient;
}

// AI Skincare Chatbot API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "A message string is required." });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Gracefully signal to frontend to use local deterministic skincare engine
      res.json({
        fallback: true,
        message: null
      });
      return;
    }

    const systemInstruction = `You are the AEGIS MEN Chief Derma-Consultant, developed under Chief Formulation Scientist Arifa Naved from Old Delhi.
You provide evidence-based, concise, masculine, and medically calibrated skincare advice for male facial skin (which is 20-25% thicker with higher sebum production and frequent razor trauma).
Always prioritize barrier integrity, physiological pH (5.2-5.6), and simplicity (Cleanse, Treat, Hydrate, Defend).
Recommend relevant AEGIS products from the catalog:
- Cleansers: AEGIS WASH (Daily pH 5.5), AEGIS PURIFY (2% BHA Salicylic), AEGIS CALM (Colloidal Oat + Panthenol)
- Serums: AEGIS CLEAR (10% Niacinamide + 1% Zinc), AEGIS BRIGHT (15% Vitamin C + Ferulic), AEGIS HYDRATE (2% Multi-Hyaluronic), AEGIS REPAIR (Ceramides + Madecassoside), AEGIS EVEN (10% Azelaic PAD + Centella)
- Moisturizers: AEGIS BARRIER (3:1:1 Ceramide Fluid), AEGIS HYDRA (Cica Water Gel), AEGIS RECOVER (Multi-Peptide Balm), AEGIS MATTE (Silica Aerogel Oil-Control)
- Daily Sunscreen: AEGIS SHIELD SPF 50 (Invisible Fluid), AEGIS SHIELD MATTE SPF 50 (Oil-Control), AEGIS SHIELD HYDRATE SPF 50 (Barrier Cushion)
- Targeted: AEGIS AFTER (Post-Shave Calming Emulsion), AEGIS SPOT (Rapid Blemish Gel), AEGIS EYE (Caffeine + Matrixyl), AEGIS PORE (Pore Refining Essence)
- Exfoliation & Masks: AEGIS RENEW (7% Lactic + 3% Mandelic + 2% PHA Liquid), AEGIS CLAY (Mineral Clay Mask), AEGIS HYDRA MASK (Overnight Beta-Glucan Sleep Mask)
- Body: AEGIS BODY WASH (1% Salicylic), AEGIS BODY LOTION (Ceramide + Niacinamide)

Keep responses direct, professional, clear, without generic marketing fluff. If someone has severe cystic cystic acne or infections, advise consulting a board-certified dermatologist.`;

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender && item.text) {
          contents.push({
            role: item.sender === "assistant" ? "model" : "user",
            parts: [{ text: item.text }]
          });
        }
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600
      }
    });

    res.json({
      fallback: false,
      message: response.text || "I am here to guide your AEGIS MEN skincare protocol."
    });
  } catch (error) {
    console.error("Gemini API error in /api/chat:", error);
    res.json({
      fallback: true,
      message: null
    });
  }
});

app.post("/api/sync-images", express.json({ limit: "50mb" }), async (req, res) => {
  try {
    const { images } = req.body;
    if (!Array.isArray(images)) {
      res.status(400).json({ error: "images array required" });
      return;
    }

    const fs = await import("fs/promises");
    const publicPath = path.join(process.cwd(), "public");

    for (const img of images) {
      if (!img.id || !img.dataUrl) continue;
      
      const matches = img.dataUrl.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) continue;
      
      const type = matches[1] === "jpeg" ? "jpg" : matches[1];
      const buffer = Buffer.from(matches[2], "base64");
      const filename = `${img.id}.jpg`;
      
      await fs.writeFile(path.join(publicPath, filename), buffer);
      console.log(`Saved ${filename} to public directory`);
    }

    res.json({ success: true, message: "Images synced to public folder" });
  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({ error: "Failed to sync images" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AEGIS MEN Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
