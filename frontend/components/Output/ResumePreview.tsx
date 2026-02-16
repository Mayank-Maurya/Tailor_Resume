import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ResumePreviewProps {
  markdownContent: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ markdownContent }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const handleDownloadPDF = () => {
    // Logic for downloading PDF will be implemented here
    console.log('Download PDF clicked');
  };

  return (
    <div className="flex flex-col w-full h-full bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      {/* Header Strip */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700">Resume Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className={`
              px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1
              ${copyStatus === 'copied'
                ? 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500'
                : copyStatus === 'error'
                ? 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500'}
            `}
            title="Copy markdown to clipboard"
          >
            {copyStatus === 'copied' ? 'Copied!' : copyStatus === 'error' ? 'Error' : 'Copy to Clipboard'}
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors"
            title="Download as PDF"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-8 bg-white">
        <article className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default ResumePreview;
