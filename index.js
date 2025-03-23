import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs";

const embeddings = JSON.parse(fs.readFileSync("./embeddings.json", "utf-8"));

const client = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = client.index(process.env.PINECONE_INDEX_NAME);

async function storeEmbeddings() {
  const vectors = embeddings.map((doc) => ({
    id: doc.id,
    values: doc.vector,
    metadata: { text: doc.text },
  }));

  await index.upsert(vectors);
  console.log("Embeddings stored in Pinecone");
}

storeEmbeddings();

