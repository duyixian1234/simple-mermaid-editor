import { createSignal, createEffect, onMount } from 'solid-js';
import mermaid from 'mermaid';

export function MermaidPreview(props) {
  const [error, setError] = createSignal(null);
  const [isLoading, setIsLoading] = createSignal(false);
  let previewRef;

  onMount(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: props.isDarkMode ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    });
  });

  createEffect(async () => {
    if (!previewRef) return;

    const code = props.code;
    const isDark = props.isDarkMode;

    if (!code.trim()) {
      previewRef.innerHTML = '<div class="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">Enter Mermaid code to see preview</div>';
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        themeVariables: {
          darkMode: isDark,
          primaryColor: isDark ? '#3b82f6' : '#2563eb',
          primaryTextColor: isDark ? '#f9fafb' : '#1f2937',
          primaryBorderColor: isDark ? '#4b5563' : '#d1d5db',
          lineColor: isDark ? '#6b7280' : '#374151',
          secondaryColor: isDark ? '#374151' : '#f3f4f6',
          tertiaryColor: isDark ? '#1f2937' : '#ffffff',
          background: isDark ? '#1f2937' : '#ffffff',
          mainBkg: isDark ? '#374151' : '#f9fafb',
          secondBkg: isDark ? '#4b5563' : '#f3f4f6',
        }
      });

      const { svg } = await mermaid.render('mermaid-diagram', code);
      previewRef.innerHTML = svg;
      setError(null);
    } catch (err) {
      console.error('Mermaid render error:', err);
      setError(err.message || 'Failed to render diagram');
      previewRef.innerHTML = `
        <div class="flex items-center justify-center h-full">
          <div class="text-center">
            <div class="text-red-500 dark:text-red-400 mb-2">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Render Error</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 max-w-md">${err.message || 'Invalid Mermaid syntax'}</p>
          </div>
        </div>
      `;
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div class="h-full flex flex-col bg-white dark:bg-gray-800">
      <div class="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 flex items-center justify-between">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Preview</h3>
        {isLoading() && (
          <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Rendering...
          </div>
        )}
      </div>
      <div 
        id="mermaid-preview"
        class="flex-1 p-4 overflow-auto bg-white dark:bg-gray-800"
        ref={previewRef}
      >
        <div class="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          Enter Mermaid code to see preview
        </div>
      </div>
    </div>
  );
}