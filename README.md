An advanced, highly customizable interactive pipeline and graph builder styled as a classic detective investigation board. This application allows users to create visual nodes representing clues, suspects, and evidence, connect them through custom handles, and dynamically analyze the flow of the investigation.

The project features a highly flexible architecture, node abstraction, and deep backend integration to evaluate graph structures.

Features
Custom Node Abstraction: Built using a reusable BaseNode component architecture that prevents code duplication and enforces a unified design across all node types.

9 Specialized Node Types: Includes standard nodes (Input, Output, Text, LLM) alongside highly tailored thematic nodes: Suspect, Evidence, Alibi, Note, and Cipher.

Dynamic Variable Parsing & Handles: The Text node automatically parses valid JavaScript variables enclosed in double curly braces (e.g., {{ variable_name }}). For each discovered variable, a custom Target Handle is dynamically created on the left side of the node in real time.

Auto-Resizing Inputs: Textareas inside text nodes dynamically adjust their width and height based on user input for seamless visibility.

Backend Graph Analysis (DAG Verification): Fully integrated with a Python/FastAPI server. When submitting the case board, it analyzes the data structure, returns total counts of nodes and edges, and checks whether the current timeline forms a Directed Acyclic Graph (DAG) to ensure logical consistency without infinite loops.

Tech Stack
Frontend: React.js, ReactFlow, Zustand.

Backend: Python, FastAPI, Uvicorn.

State Management & Utilities: Custom dynamic hooks (useUpdateNodeInternals for real-time node geometry calculation).

Technical Highlights & Solved Challenges
Dynamic Node Recalculation
One of the primary challenges in ReactFlow when handling dynamic handles (like parsing variables on the fly) is that the core framework caches handle positions upon the initial render. When a new handle is added dynamically, incoming edge connections can easily break or misalign.

Solution: Implemented the useUpdateNodeInternals hook inside the core BaseNode abstraction layer. Combined with a useEffect observer pattern tracking the inputs and outputs arrays, the component forces ReactFlow to recalculate its internal handle layout instantly whenever variables are added or removed:

JavaScript
useEffect(() => {
  updateNodeInternals(id);
}, [inputs, outputs, id, updateNodeInternals]);
Custom UI/UX Overhaul
Completely bypassed the default, generic ReactFlow styles to create an immersive thematic dark dashboard (#302F3F). All structural components utilize a tailored color palette, unique typewriter/monospace typography (Special Elite / Courier Prime), and drop shadows that emulate real physical case files pinned to an investigation board.

Installation & Setup
1. Frontend Setup
Navigate to the frontend folder, install dependencies, and start the development server:

Bash
cd frontend
npm install
npm start
The client interface will run on http://localhost:3000 (or 3001 if the port is occupied).

2. Backend Setup
Navigate to the backend folder, ensure you have FastAPI installed, and spin up the Uvicorn server:

Bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
The API server runs on http://localhost:8000.

API Endpoint: Pipeline Parsing
URL: /pipelines/parse

Method: POST

Payload Format:

JSON
{
  "nodes": [...],
  "edges": [...]
}
Expected Response:

JSON
{
  "num_nodes": 5,
  "num_edges": 6,
  "is_dag": false
}
An interactive alert notifies the investigator of the timeline's structural validity upon evaluation.
