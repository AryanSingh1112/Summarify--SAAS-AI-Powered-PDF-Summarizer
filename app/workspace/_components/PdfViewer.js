import React from 'react';

function PdfViewer({ fileUrl }) {
    if (!fileUrl) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-100">
                <p className="text-gray-500">Loading PDF...</p>
            </div>
        );
    }

    return (
        <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=fitH`}
            title="PDF Viewer"
            className="w-full h-full"
            style={{
                border: 'none',
                backgroundColor: 'white',
            }}
        />
    );
}

export default PdfViewer;
