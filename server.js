import "dotenv/config";
import express from "express";
import cors from "cors";
import { HfInference } from "@huggingface/inference";
import { Pinecone } from "@pinecone-database/pinecone";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const hf = new HfInference(process.env.HF_API_KEY);

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

app.get("/api/search", async (req, res) => {
  try {
      const query = req.query.q;
      if (!query) return res.status(400).json({ error: "Query parameter is required" });

      const queryVector = await hf.featureExtraction({
          model: "sentence-transformers/all-MiniLM-L6-v2",
          inputs: query,
      });

      const searchResults = await index.query({
          vector: queryVector,
          topK: 5,
          includeMetadata: true,
      });

      res.json(searchResults.matches.map(match => match.metadata.text));
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/add", async (req, res) => {
    try {
        const { id, text } = req.body;
        if (!id || !text) return res.status(400).json({ error: "Missing id or text" });

        const vector = await hf.featureExtraction({
            model: "sentence-transformers/all-MiniLM-L6-v2",
            inputs: text,
        });

        await index.upsert([
            { id: id, values: vector, metadata: { text } }
        ]);

        res.json({ message: "Document indexed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
