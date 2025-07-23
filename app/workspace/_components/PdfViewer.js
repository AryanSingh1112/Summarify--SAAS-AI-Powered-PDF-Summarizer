import React from 'react'

function PdfViewer({fileUrl}) {
    
    if (!fileUrl) {
        return (
            <div className="flex items-center justify-center h-[90vh] bg-gray-50">
                <p className="text-gray-500">Loading PDF...</p>
            </div>
        )
    }
    
    return (
        <iframe 
            src={fileUrl + "#toolbar=0"} 
            height="90vh" 
            width="100%" 
            className="w-full h-[90vh]"
            style={{ border: 'none', outline: 'none' }}
            title="PDF Viewer"
        />
    )
}

export default PdfViewer
