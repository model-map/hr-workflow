# HR Workflow Designer Prototype

A **Next.js + React Flow** prototype for designing and testing HR workflows. Allows creating workflows with 5 required node types and dynamic forms for each node.

---

## Features

- Colored nodes for source/target differentiation
- Clickable nodes opening dynamic forms
- Node data updates in real time
- Zoom controls and minimap
- Side panel with drag-and-drop node creation
- Workflow validation in real time
- Mock API:

  - **GET /automation** – fetches automated node actions
  - **POST /simulate** – validates workflow execution

---

## Node Types & Forms

### Start Node

- **Mandatory:** Title
- **Optional:** Metadata key-value pairs

### Task Node

- **Mandatory:** Title, Description, Assignee, Due Date
- **Optional:** Metadata key-value pairs

### Approval Node

- **Mandatory:** Title, Approved status
- Randomly generated task threshold for auto-approval

### Automated Node

- **Mandatory:** Title
- Action fetched from `/automation` API dynamically updates parameters

### End Node

- Toggle summary
- End message dynamically reflects simulation result: `"Simulation Pending"`, `"Task Successful"`, or `"Task Failed"`

---

## Folder Structure

```
src
├── app
│   ├── api
│   │   ├── automation/route.ts
│   │   └── simulate/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── shadcn_ui          # Reusable UI components
│   ├── ui                 # Custom inputs (Date picker, dropdown)
│   └── workflow
│       ├── Canvas         # React Flow canvas & node types
│       ├── forms          # Node configuration forms
│       ├── hooks          # Custom hooks for nodes & workflow
│       └── utils          # Workflow constants, validation, schemas
├── hooks                  # Global hooks (e.g., mobile detection)
├── lib                    # Utility functions
└── types                  # Type definitions
```

---

## Getting Started

1. **Install pnpm (if not already installed)**

```bash
npm install -g pnpm
```

2. **Clone the repository**

```bash
git clone git@github.com:model-map/hr-workflow.git
cd hr-workflow
```

3. **Install dependencies**

```bash
pnpm install
```

4. **Run the development server**

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the prototype.

---

## Architecture Highlights

- **React Flow canvas** separates node logic from canvas logic
- **Dynamic forms** for each node type using controlled components
- **Custom hooks** for drag-and-drop, node selection, and workflow validation
- **Mock API** for simulating automated node execution and validating workflow

---

## Future Enhancements

- Parallel approvals
- Allow array of multiple key-value pairs
- Export/import workflows as JSON
- Undo/Redo functionality
- Node templates and version history
- Auto-layout and enhanced visual validation
- Extended mock API for more complex simulation
