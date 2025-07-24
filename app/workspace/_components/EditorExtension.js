import { api } from '@/convex/_generated/api';
import { useAction } from 'convex/react';
import { BoldIcon, ItalicIcon, Highlighter, Strikethrough, Subscript, Underline as UnderlineIcon, FileTextIcon, StickyNoteIcon } from 'lucide-react'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'

function EditorExtension({ editor }) {

    const { fileId } = useParams();
    const GenerateLongSummary = useAction(api.myAction.generateLongSummary);
    const GenerateShortSummary = useAction(api.myAction.generateShortSummary);
    const [currentSummary, setCurrentSummary] = useState(null);
    const [summaryType, setSummaryType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeEditor, setActiveEditor] = useState('main'); // Track which editor is active

    // Create a separate editor for the summary
    const summaryEditor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Underline,
            TextStyle
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'focus:outline-none p-3 md:p-4 prose prose-sm md:prose-base max-w-none min-h-[120px] md:min-h-[150px] text-sm md:text-base'
            }
        },
        immediatelyRender: false,
        onFocus: () => setActiveEditor('summary'), // Set summary as active when focused
    });

    // Set main editor as active when it's focused
    React.useEffect(() => {
        if (editor) {
            const handleFocus = () => {
                setActiveEditor('main');
            };
            
            editor.on('focus', handleFocus);
            
            return () => {
                editor.off('focus', handleFocus);
            };
        }
    }, [editor]);

    // Update summary editor content when currentSummary changes
    React.useEffect(() => {
        if (summaryEditor && currentSummary) {
            const formattedContent = currentSummary
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/#{3}\s(.*?)$/gm, '<h3>$1</h3>')
                .replace(/#{2}\s(.*?)$/gm, '<h2>$1</h2>')
                .replace(/#{1}\s(.*?)$/gm, '<h1>$1</h1>')
                .replace(/\n/g, '<br>');
            summaryEditor.commands.setContent(formattedContent);
        }
    }, [summaryEditor, currentSummary, summaryType]);

    // Get the currently active editor for toolbar commands
    const getCurrentEditor = () => {
        return activeEditor === 'summary' ? summaryEditor : editor;
    };

    const onLongSummaryClick = async () => {
        if (!editor) return;

        setIsLoading(true);
        setSummaryType('detailed'); // Set type immediately for loading state
        try {
            const result = await GenerateLongSummary({
                fileId: fileId
            });

            // Set the summary state instead of inserting into editor
            setCurrentSummary(result);

        } catch (error) {
            alert("Failed to generate detailed summary. Please try again.");
            setSummaryType(null); // Clear type on error
        } finally {
            setIsLoading(false);
        }
    }

    const onShortSummaryClick = async () => {
        if (!editor) return;

        setIsLoading(true);
        setSummaryType('brief'); // Set type immediately for loading state
        try {
            const result = await GenerateShortSummary({
                fileId: fileId
            });

            // Set the summary state instead of inserting into editor
            setCurrentSummary(result);

        } catch (error) {
            alert("Failed to generate brief summary. Please try again.");
            setSummaryType(null); // Clear type on error
        } finally {
            setIsLoading(false);
        }
    }

    const clearSummary = () => {
        setCurrentSummary(null);
        setSummaryType(null);
    }
    return editor && (
        <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className='p-2 md:p-4 lg:p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200'>
                <div className="flex flex-col space-y-3 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                    {/* Text Formatting Controls */}
                    <div className="flex items-center gap-1 bg-white rounded-lg p-1.5 md:p-2 shadow-sm overflow-x-auto">
                        <button
                            onClick={() => getCurrentEditor()?.chain().focus().toggleBold().run()}
                            className={`p-1.5 md:p-2 rounded-md transition-all duration-200 flex-shrink-0 ${getCurrentEditor()?.isActive('bold')
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            title="Bold"
                        >
                            <BoldIcon className='w-4 h-4 md:w-5 md:h-5' />
                        </button>
                        <button
                            onClick={() => getCurrentEditor()?.chain().focus().toggleItalic().run()}
                            className={`p-1.5 md:p-2 rounded-md transition-all duration-200 flex-shrink-0 ${getCurrentEditor()?.isActive('italic')
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            title="Italic"
                        >
                            <ItalicIcon className='w-4 h-4 md:w-5 md:h-5' />
                        </button>

                        <button
                            onClick={() => getCurrentEditor()?.chain().focus().toggleHighlight().run()}
                            className={`p-1.5 md:p-2 rounded-md transition-all duration-200 flex-shrink-0 ${getCurrentEditor()?.isActive('highlight')
                                ? 'bg-yellow-400 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            title="Highlight"
                        >
                            <Highlighter className='w-4 h-4 md:w-5 md:h-5' />
                        </button>
                        <button
                            onClick={() => getCurrentEditor()?.chain().focus().toggleStrike().run()}
                            className={`p-1.5 md:p-2 rounded-md transition-all duration-200 flex-shrink-0 ${getCurrentEditor()?.isActive('strike')
                                ? 'bg-red-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            title="Strikethrough"
                        >
                            <Strikethrough className='w-4 h-4 md:w-5 md:h-5' />
                        </button>

                        <button
                            onClick={() => {
                                const currentEditor = getCurrentEditor();
                                if (currentEditor?.commands?.toggleSubscript) {
                                    currentEditor.commands.toggleSubscript();
                                } else if (currentEditor?.chain().focus().toggleSubscript) {
                                    currentEditor.chain().focus().toggleSubscript().run();
                                }
                            }}
                            className={`p-1.5 md:p-2 rounded-md transition-all duration-200 flex-shrink-0 ${getCurrentEditor()?.isActive('subscript')
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            title="Subscript"
                        >
                            <Subscript className='w-4 h-4 md:w-5 md:h-5' />
                        </button>

                        <button
                            onClick={() => getCurrentEditor()?.chain().focus().toggleUnderline().run()}
                            className={`p-1.5 md:p-2 rounded-md transition-all duration-200 flex-shrink-0 ${getCurrentEditor()?.isActive('underline')
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            title="Underline"
                        >
                            <UnderlineIcon className='w-4 h-4 md:w-5 md:h-5' />
                        </button>

                        <div className="w-px h-4 md:h-6 bg-gray-300 mx-1 md:mx-2"></div>

                       
                    </div>

                    {/* AI Summary Controls */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                        <button
                            onClick={() => onLongSummaryClick()}
                            disabled={isLoading}
                            className={`flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base ${summaryType === 'detailed' ? 'ring-2 ring-blue-300' : ''}`}
                            title="Generate Detailed Summary"
                        >
                            <FileTextIcon className='w-4 h-4 md:w-5 md:h-5 flex-shrink-0' />
                            <span className="font-medium">
                                {isLoading && summaryType === 'detailed' ? 'Generating...' : 'Detailed Summary'}
                            </span>
                        </button>

                        <button
                            onClick={() => onShortSummaryClick()}
                            disabled={isLoading}
                            className={`flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base ${summaryType === 'brief' ? 'ring-2 ring-green-300' : ''}`}
                            title="Generate Brief Summary"
                        >
                            <StickyNoteIcon className='w-4 h-4 md:w-5 md:h-5 flex-shrink-0' />
                            <span className="font-medium">
                                {isLoading && summaryType === 'brief' ? 'Generating...' : 'Brief Summary'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary Display Area */}
            {currentSummary && (
                <div className="bg-white border-t border-gray-200 shadow-inner flex-shrink-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 md:p-4 bg-gray-50 border-b border-gray-200 gap-2 sm:gap-0">
                        <h3 className="text-base md:text-lg font-semibold text-gray-800">
                            {summaryType === 'detailed' ? '📄 Detailed Summary' : '📋 Brief Summary'}
                        </h3>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                onClick={clearSummary}
                                className="px-3 py-1 bg-gray-500 text-white text-xs md:text-sm rounded-md hover:bg-gray-600 transition-colors flex-1 sm:flex-none"
                            >
                                ✕ Close
                            </button>
                        </div>
                    </div>
                    {/* Editable Summary Content */}
                    <div className="bg-white max-h-48 md:max-h-64 overflow-y-auto">
                        <EditorContent
                            editor={summaryEditor}
                            className={`${summaryType === 'detailed' ? 'max-h-96 overflow-y-auto' : ''}`}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditorExtension