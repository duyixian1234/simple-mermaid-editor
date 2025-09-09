import { createSignal, onMount } from 'solid-js';
import { CodeEditor } from './CodeEditor';
import { MermaidPreview } from './MermaidPreview';
import { Toolbar } from './Toolbar';
import { TemplateSelector } from './TemplateSelector';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

type ExportFormat = 'svg' | 'png' | 'pdf';

const defaultMermaidCode = `graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    B -->|No| D[End]
    C --> D`;

export function MermaidEditor() {
  const [code, setCode] = createSignal(defaultMermaidCode);
  const [isDarkMode, setIsDarkMode] = createSignal(false);
  const [isTemplateOpen, setIsTemplateOpen] = createSignal(false);

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode();
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const exportDiagram = async (format: ExportFormat) => {
    const previewElement = document.getElementById('mermaid-preview');
    if (!previewElement) return;

    if (format === 'svg') {
      const svgElement = previewElement.querySelector('svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mermaid-diagram.svg';
        a.click();
        URL.revokeObjectURL(url);
      }
    } else if (format === 'png' || format === 'pdf') {
      const canvas = await html2canvas(previewElement, {
        backgroundColor: isDarkMode() ? '#1f2937' : '#ffffff',
        scale: 2
      });

      if (format === 'png') {
        const link = document.createElement('a');
        link.download = 'mermaid-diagram.png';
        link.href = canvas.toDataURL();
        link.click();
      } else if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('mermaid-diagram.pdf');
      }
    }
  };

  const handleTemplateSelect = (template: string) => {
    setCode(template);
    setIsTemplateOpen(false);
  };

  return (
    <div class="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Toolbar 
        isDarkMode={isDarkMode()}
        onToggleTheme={toggleTheme}
        onExport={exportDiagram}
        onOpenTemplates={() => setIsTemplateOpen(true)}
      />
      
      <div class="flex-1 flex overflow-hidden">
        <div class="w-1/2 border-r border-gray-300 dark:border-gray-600">
          <CodeEditor 
            code={code()}
            onChange={setCode}
            isDarkMode={isDarkMode()}
          />
        </div>
        
        <div class="w-1/2">
          <MermaidPreview 
            code={code()}
            isDarkMode={isDarkMode()}
          />
        </div>
      </div>

      {isTemplateOpen() && (
        <TemplateSelector 
          onSelect={handleTemplateSelect}
          onClose={() => setIsTemplateOpen(false)}
        />
      )}
    </div>
  );
}