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

## **Brief Explanation of the Approach**  
The API takes raw text input and converts it into embeddings using Hugging Face’s `msmarco-MiniLM-L12-cos-v5` model. These vector embeddings are stored in Pinecone, which enables efficient semantic search by comparing new query embeddings with stored vectors. When a search request is made, the input text is first embedded, and a similarity search is performed against the stored vectors using cosine similarity, returning the most relevant results.  

## **Step-by-Step Flow of API Calls**  
1. **Document Addition**:  
   - The user sends a **POST request** with a text document.  
   - The document is embedded using the Hugging Face model.  
   - The resulting vector is stored in **Pinecone** with a unique ID.  

2. **Search Request**:  
   - The user sends a **GET request** with a query.  
   - The query text is embedded using the same model.  
   - A similarity search is performed against stored vectors in Pinecone.  
   - The most relevant matches are returned in response.  

## **Running the Project Locally**  

### **Setup**  

#### **Prerequisites**  
- Node.js  
- A Hugging Face API Key  
- A Pinecone API Key and Index  
\

## Test Run
1)
http://localhost:3000/api/search?q=deep%20learning&metric=cosine

[
  "Deep learning is a subset of machine learning.",
  "Machine learning is a field of artificial intelligence.",
  "Artificial Intelligence (AI) is revolutionizing various industries, from healthcare to finance. Machine learning models analyze vast amounts of data to make predictions, automate tasks, and enhance decision-making. Companies worldwide are integrating AI to improve efficiency, reduce costs, and create innovative solutions.",
  "Artificial Intelligence is being increasingly adopted in medical diagnostics, helping doctors detect diseases like cancer and Alzheimer’s at an early stage.",
  "NASA’s James Webb Space Telescope has captured stunning images of distant galaxies, providing new insights into the formation of the early universe."
]

2)
http://localhost:3000/api/search?q=artificial%20intelligence&metric=euclidean

[
  "Machine learning is a field of artificial intelligence.",
  "Artificial Intelligence (AI) is revolutionizing various industries, from healthcare to finance. Machine learning models analyze vast amounts of data to make predictions, automate tasks, and enhance decision-making. Companies worldwide are integrating AI to improve efficiency, reduce costs, and create innovative solutions.",
  "The Indian IT industry is witnessing a surge in AI and cloud computing jobs, with companies like TCS, Infosys, and Wipro hiring aggressively. Experts predict that India will be a global leader in AI innovation.",
  "Artificial Intelligence is being increasingly adopted in medical diagnostics, helping doctors detect diseases like cancer and Alzheimer’s at an early stage.",
  "China successfully launched its Tiangong space station, marking a major milestone in its ambitious space exploration program."
]

3)
http://localhost:3000/api/search?q=space%20exploration

[
  "The Indian Space Research Organisation (ISRO) successfully launched its latest lunar mission, Chandrayaan-3, marking another milestone in India's space exploration journey. The mission aims to study the moon’s surface and collect crucial data for future lunar explorations.",
  "NASA’s James Webb Space Telescope has captured stunning images of distant galaxies, providing new insights into the formation of the early universe.",
  "China successfully launched its Tiangong space station, marking a major milestone in its ambitious space exploration program.",
  "Machine learning is a field of artificial intelligence.",
  "Deep learning is a subset of machine learning."
]





