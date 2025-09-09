import { onMount, createEffect } from 'solid-js';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  isDarkMode: boolean;
}

export function CodeEditor(props: CodeEditorProps) {
  let editorRef: HTMLDivElement | undefined;
  let view: EditorView | undefined;

  onMount(() => {
    const extensions = [
      basicSetup,
      markdown(),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          props.onChange(update.state.doc.toString());
        }
      }),
      EditorView.theme({
        '&': {
          height: '100%',
        },
        '.cm-scroller': {
          fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '14px',
          lineHeight: '1.5',
        },
        '.cm-focused': {
          outline: 'none',
        },
        '.cm-editor': {
          height: '100%',
        },
        '.cm-content': {
          padding: '16px',
          minHeight: '100%',
        }
      })
    ];

    if (props.isDarkMode) {
      extensions.push(oneDark);
    }

    const state = EditorState.create({
      doc: props.code,
      extensions
    });

    view = new EditorView({
      state,
      parent: editorRef!
    });
  });

  createEffect(() => {
    if (view && view.state.doc.toString() !== props.code) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: props.code
        }
      });
    }
  });

  createEffect(() => {
    if (view) {
      const extensions = [
        basicSetup,
        markdown(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            props.onChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          '&': {
            height: '100%',
          },
          '.cm-scroller': {
            fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '14px',
            lineHeight: '1.5',
          },
          '.cm-focused': {
            outline: 'none',
          },
          '.cm-editor': {
            height: '100%',
          },
          '.cm-content': {
            padding: '16px',
            minHeight: '100%',
          }
        })
      ];

      if (props.isDarkMode) {
        extensions.push(oneDark);
      }

      const newState = EditorState.create({
        doc: view.state.doc,
        extensions
      });

      view.setState(newState);
    }
  });

  return (
    <div class="h-full flex flex-col bg-white dark:bg-gray-800">
      <div class="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Mermaid Code</h3>
      </div>
      <div class="flex-1 overflow-hidden" ref={editorRef}></div>
    </div>
  );
}