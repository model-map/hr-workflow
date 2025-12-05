## Objective

- HR Workflow designer module based on **React, and React-Flow**
- HR admin needs to be able to create and test internal workflows such as
  - onboarding
  - leave approval
  - document verification

### DELIVERABLES

- React application (Built with Next.js)
- React Flow canvas with multiple custom nodes
- Node configuration/editing forms for each node type
- Mock API integration
- Workflow Test/Sandbox panel
- README explaining architecture, design choices, and assumptions

### NOTE TO SELF

- NOTE TO SELF #1 : focus on architectural clarity, working functionality, don't get bogged down by good-looking UI
- NOTE TO SELF #2: No authentication or backend persistence required for prototype

### FUNCTIONAL REQUIREMENTS

#### 1. Workflow Canvas

- Implement a drag-and-drop workflow canvas
- Node Types
  - Start Node - Workflow entry point
  - Task Node - Human task (eg - collect documents)
  - Approval Node - manager or HR approval step
  - Automated Step Node - system-triggered actions (eg, send email, generate PDF)
  - End node - Workflow completion
- Supported canvas actions
  - Drag nodes from a sidebar onto the canvas
  - Connect nodes with edges
  - select a node to edit it
  - ~~Delete nodes/edges~~
  - Auto-validate basic constraints (e.g., Start Node must be first)

#### 2. Node Editing/Configuration Forms (Key requirements)

- Each node type must have an editable "Node Form Panel" that appears when the node is selected

##### Minimum required Fields

- Start Node
  - Start title
  - Optional metadata key-value pairs
- Task Node
  - Title (required)
  - Description
  - Assignee (string input)
  - Due date (text input or simple date field)
  - Optional custom fields (key-value)
- Approval node
  - Title
  - Approver role (e.g., Manager, HRBP, Director)
  - Auto-approve threshold (number)
- Automated step node
  - Title
  - Choose an action from a mock API list
  - Action parameters (dynamic based on mock action definition)
- End Node
  - End message
  - Summary flag (boolean toggle)

##### Evaluation:

- dynamic forms
- controlled components
- clean state handling
- type safety
- modularity

#### 3. Mock API Layer

- Create a lightweight API layer using JSON server, MSW or local mocks
- /GET /automation
  - Returns mock automated actions such as
    - [ { "id": "send_email", "label": "Send Email", "params": ["to", "subject"] }, { "id": "generate_doc", "label": "Generate Document", "params": ["template", "recipient"] }]
- /POST /simulate
  - Accepts workflow JSON and returns a mock step-by-step execution result

#### 4. Workflow Testing/Sandbox Panel

A small panel or modal that - Serialises the entire workflow graph - Sends it to mock /simulate API - Displays a step-by-step execution log (basic text or timeline UI) - Validates structure (e.g., missing connections, cycles)

Idea is to test the candidate’s reasoning around state, graph structures, and API workflows.

#### 5. Architectural Expectations

- A clean folder structure
- Separation of canvas logic, node logic, and API logic
- Reusable custom hooks
- Ability to design abstractions that scale
- Thoughtful component decomposition
- Form structure that can be extended to new node types
- Clarity of interfaces/types for workflow nodes

#### 6. BONUS

- Export/Import workflows as JSON
- Node Templates
- Undo/Redo
- Mini-map or zoom controls
- Workflow validations errors visually shown on nodes
- Auto-layout
- Node version history
