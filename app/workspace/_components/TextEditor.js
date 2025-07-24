import { Placeholder } from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { TextStyle } from '@tiptap/extension-text-style'
import FontSize from '@tiptap/extension-font-size'
import Underline from '@tiptap/extension-underline'
import React from 'react'
import EditorExtension from './EditorExtension'

function TextEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Start typing your text here...'
            }),
            Highlight,
            Subscript,
            Superscript,
            TextStyle,
            FontSize,
            Underline
        ],

        editorProps: {
            attributes: {
                class: 'focus:outline-none p-3 md:p-6 prose prose-sm md:prose-lg max-w-none h-full overflow-y-auto text-sm md:text-base'
            }
        },
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false

    })

    // Editor setup complete
    React.useEffect(() => {
        if (editor) {
            // Editor is ready
        }
    }, [editor]);
    return (
        <div className="h-full flex flex-col">
            <EditorExtension editor={editor} />
            <div className="flex-1 overflow-hidden">
                <EditorContent editor={editor} className="h-full" />
            </div>
        </div>
    );
}

export default TextEditor