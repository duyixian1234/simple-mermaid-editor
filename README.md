# Mermaid Editor

A modern, interactive Mermaid diagram editor built with SolidJS and Vite. Create, edit, and export beautiful diagrams with real-time preview.

## Features

- 🎨 Real-time Mermaid diagram preview
- 🌙 Dark/Light theme support
- 📝 Syntax-highlighted code editor with CodeMirror
- 📤 Export diagrams as SVG, PNG, or PDF
- 📋 Built-in diagram templates
- 🎯 Responsive design with Tailwind CSS

## Installation

```bash
$ npm install # or pnpm install or yarn install
```

## Usage

Start the development server:

```bash
$ npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the editor in your browser.

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode with hot reload.<br>
Open [http://localhost:5173](http://localhost:5173) to view the Mermaid editor in your browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
Optimizes the build for best performance with minified files and hashed filenames.

### `npm run preview`

Serves the production build locally for testing before deployment.

## Tech Stack

- **SolidJS** - Reactive UI framework
- **Vite** - Build tool and development server
- **Mermaid** - Diagram rendering engine
- **CodeMirror** - Code editor with syntax highlighting
- **Tailwind CSS** - Utility-first CSS framework
- **html2canvas** - HTML to canvas conversion for PNG export
- **jsPDF** - PDF generation library

## Project Structure

```
src/
├── components/
│   ├── MermaidEditor.jsx    # Main editor component
│   ├── CodeEditor.jsx       # Code input with syntax highlighting
│   ├── MermaidPreview.jsx   # Live diagram preview
│   ├── Toolbar.jsx          # Top toolbar with actions
│   └── TemplateSelector.jsx # Diagram template picker
├── App.jsx                  # Root application component
└── index.jsx               # Application entry point
```

## Deployment

Learn more about deploying your application with the [Vite deployment guide](https://vite.dev/guide/static-deploy.html)
