import "dotenv/config";
import { HfInference } from "@huggingface/inference";
import fs from "fs";
import dataset from "./dataset.json" assert { type: "json" };

const hf = new HfInference(process.env.HF_API_KEY);

async function generateEmbeddings() {
  const embeddings = [];

  for (const doc of dataset) {
    console.log(`Processing: ${doc.text}`);
    const response = await hf.featureExtraction({
      model: "sentence-transformers/msmarco-MiniLM-L12-cos-v5",
      inputs: doc.text,
    });

    embeddings.push({ id: doc.id, text: doc.text, vector: response });
  }

  fs.writeFileSync("embeddings.json", JSON.stringify(embeddings, null, 2));
  console.log("Embeddings saved");
}

generateEmbeddings();

