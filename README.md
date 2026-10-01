# Detective Board

An interactive visual pipeline builder styled as a detective investigation board.

The application allows users to create and connect different types of nodes representing clues, suspects, evidence, notes, and investigation-related processing steps. The resulting graph can be sent to a Python backend for structural analysis.

## Features

* Visual node-based pipeline editor
* Drag-and-drop node creation
* Connect nodes with directed edges
* Move and edit nodes on the board
* Multiple specialized detective-themed node types
* Dynamic input handles for variables in Text nodes
* Automatic Text node resizing
* Centralized state management with Zustand
* Backend pipeline analysis
* Node and edge counting
* Directed Acyclic Graph (DAG) validation
* Detective-themed dark interface

## Node Types

The toolbar provides nine node types:

* **Input** — defines an input name and input type
* **LLM** — represents a language-model processing step
* **Output** — defines an output name and output type
* **Text** — editable text with support for dynamic variables
* **Suspect** — stores a suspect name and investigation status
* **Evidence** — represents a type of evidence
* **Alibi** — allows an alibi to be marked as confirmed
* **Note** — free-form detective notes
* **Cipher** — represents a cipher-decoding step

### Input Node

The Input node contains:

* Name
* Type

Available input types:

* Text
* File

It provides an output handle for connecting the input to other nodes.

### Output Node

The Output node contains:

* Name
* Type

It provides an input handle for receiving data from other nodes.

### Text Node

The Text node contains an editable text area.

Variables written using double curly braces are detected automatically.

Example:

```text
The main suspect is {{suspect_name}}.
```

The application detects `suspect_name` and creates a corresponding input handle on the node.

The node also dynamically changes its width and height depending on the entered text.

### Suspect Node

The Suspect node contains:

* Suspect name
* Investigation status

Available statuses:

* Under Suspicion
* Innocent
* Arrested

It has one input and two outputs:

* Motive
* Alibi Check

### Evidence Node

The Evidence node allows the investigator to select an evidence type:

* Fingerprint
* Weapon
* DNA Sample
* Footprint

### Alibi Node

The Alibi node accepts:

* Suspect link
* Witness statement

It also provides an **Alibi Confirmed** checkbox and produces a verdict output.

### Note Node

The Note node provides a free-form text area for recording investigation notes.

Unlike the other nodes, it does not have input or output handles.

### Cipher Node

The Cipher node represents a decoding step.

Available methods:

* Caesar Cipher
* ROT13
* Base64

It has an encrypted-text input and decrypted-text output.

### LLM Node

The LLM node represents a language-model processing step with:

* System input
* Prompt input
* Response output

Currently, the node is a visual pipeline component and does not itself perform an LLM API request.

## Working With the Board

Nodes can be added in two ways:

1. Drag a node type from the node toolbar onto the board.
2. Use the **Add Input** or **Add Text** buttons in the bottom-right corner.

Nodes can then be connected using their handles.

Connections are displayed as directed edges with arrow markers.

The board uses a grid and snaps node positions to a 20-pixel grid.

## State Management

The application uses **Zustand** to manage the ReactFlow state.

The store keeps track of:

* Nodes
* Edges
* Node IDs

It provides actions for:

* Generating unique node IDs
* Adding nodes
* Updating node changes
* Updating edge changes
* Creating connections
* Updating node fields

Connections are represented using ReactFlow edges.

## Backend Graph Analysis

The frontend communicates with a Python/FastAPI backend through:

```text
POST http://localhost:8000/pipelines/parse
```

The submitted data contains:

```json
{
  "nodes": [],
  "edges": []
}
```

The backend calculates:

* Number of nodes
* Number of edges
* Whether the graph is a Directed Acyclic Graph (DAG)

Example response:

```json
{
  "num_nodes": 5,
  "num_edges": 6,
  "is_dag": false
}
```

The result is displayed to the user in a case-file-style alert.

### DAG Validation

The backend checks whether the pipeline contains cycles using a topological sorting algorithm.

The algorithm:

1. Builds an adjacency list from the edges.
2. Calculates the in-degree of each node.
3. Adds nodes with zero incoming edges to a queue.
4. Processes the graph while reducing the in-degree of connected nodes.
5. Compares the number of processed nodes with the total number of nodes.

If every node can be processed, the graph is considered a DAG.

If some nodes remain because of a cycle, the graph is not a DAG.

## Backend API

The backend is implemented in `main.py`.

### `GET /`

Returns a simple response used to verify that the backend is running:

```json
{
  "Ping": "Pong"
}
```

### `POST /pipelines/parse`

Accepts the current pipeline and returns its structural information.

Request:

```json
{
  "nodes": [
    {
      "id": "text-1",
      "type": "text",
      "data": {}
    }
  ],
  "edges": []
}
```

Response:

```json
{
  "num_nodes": 1,
  "num_edges": 0,
  "is_dag": true
}
```

CORS is enabled in the FastAPI application to allow requests from the frontend during local development.

## Reusable Node Architecture

All nodes are built on top of a shared `BaseNode` component.

`BaseNode` is responsible for:

* Common node styling
* Rendering input handles
* Rendering output handles
* Positioning multiple handles
* Rendering node titles
* Updating ReactFlow's internal node information

This keeps the specialized node components small and avoids repeating the same ReactFlow structure.

## Dynamic Handles

One of the main technical features is dynamic handle generation.

The `TextNode` searches its content using a regular expression:

```text
{{ variable_name }}
```

Every unique variable becomes an input handle.

Because the number of handles can change while the node is being edited, `useUpdateNodeInternals` is used to make ReactFlow recalculate the node's internal geometry.

This allows newly created handles to be positioned correctly without recreating the node.

## UI Design

The application uses a custom detective investigation theme instead of the default ReactFlow appearance.

The interface uses:

* Dark purple-gray background
* Burgundy/red controls and connections
* Pinkish node surfaces
* Typewriter-style typography
* Monospace text
* Grid-based workspace
* Case-file-inspired visual styling

The application also includes a PWA manifest with the name:

```text
Detective Board
```

## Technologies

### Frontend

* React 18
* ReactFlow 11
* Zustand
* JavaScript
* Create React App
* CSS / inline React styles

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn

### Browser APIs

* HTML5 Drag and Drop API
* Fetch API

## Project Structure

```text
DetectiveBoard/
│
├── main.py
│
├── public/
│   ├── index.html
│   └── manifest.json
│
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── draggableNode.js
│   ├── store.js
│   ├── submit.js
│   ├── toolbar.js
│   ├── ui.js
│   │
│   └── nodes/
│       ├── BaseNode.js
│       ├── inputNode.js
│       ├── outputNode.js
│       ├── textNode.js
│       ├── llmNode.js
│       ├── suspectNode.js
│       ├── evidenceNode.js
│       ├── alibiNode.js
│       ├── noteNode.js
│       └── cipherNode.js
│
├── package.json
├── package-lock.json
└── .gitignore
```

## Installation

### Frontend

Install the JavaScript dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend runs on the default Create React App development port:

```text
http://localhost:3000
```

### Backend

Install the required Python packages:

```bash
pip install fastapi uvicorn
```

Start the FastAPI server from the project root:

```bash
uvicorn main:app --reload
```

The backend runs at:

```text
http://localhost:8000
```

## Using the Application

1. Start the FastAPI backend.
2. Start the React frontend.
3. Open the application in a browser.
4. Add nodes to the investigation board.
5. Configure the node fields.
6. Connect nodes using their handles.
7. Click **Submit**.
8. The frontend sends the current graph to the backend.
9. The backend returns the node count, edge count, and DAG status.
10. The result is displayed as a case analysis report.

## Project Purpose

This project demonstrates how to build an interactive node-based editor with ReactFlow and connect it to a Python backend for graph analysis.

It covers:

* React component architecture
* Custom ReactFlow nodes
* Dynamic handles
* Drag-and-drop interactions
* Graph state management with Zustand
* REST API communication
* FastAPI backend development
* Pydantic request models
* Graph traversal and DAG detection
* Reusable UI abstractions
* Custom interface design
