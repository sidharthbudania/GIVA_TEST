# GIVA Assessment  

## Overview  
This assessment involves building a **semantic search API** using **Pinecone** for vector storage and **Hugging Face Transformers** for text embeddings. The API allows:  
- **Semantic search**: Retrieve relevant text based on meaning.  
- **Dynamic document indexing**: Add and store new documents in real time.  

## Approach  

1. **Embedding Generation**  
   - Uses `sentence-transformers/msmarco-MiniLM-L12-cos-v5` from Hugging Face.  
   - Converts text into vector representations.  

2. **Vector Indexing**  
   - Stores generated embeddings in **Pinecone** for efficient retrieval.  

3. **Search Functionality**  
   - Performs similarity search on stored embeddings using **cosine similarity**.  

## Running the Project Locally  

### Setup  

#### **Prerequisites**  
- Node.js 
- A Hugging Face API Key  
- A Pinecone API Key and Index  

