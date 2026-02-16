"use client";

import React, { useState } from 'react';

interface ResumeFormData {
  jobDescription: string;
  roleContext: string;
  apiKey: string;
}

interface ResumeFormProps {
  onSubmit: (data: ResumeFormData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [roleContext, setRoleContext] = useState('Fullstack');
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ jobDescription, roleContext, apiKey });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="mb-4">
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900 placeholder-gray-400"
          rows={4}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="roleContext" className="block text-sm font-medium text-gray-700 mb-2">
          Role Context
        </label>
        <select
          id="roleContext"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white text-gray-900"
          value={roleContext}
          onChange={(e) => setRoleContext(e.target.value)}
        >
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="Fullstack">Fullstack</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
          LLM API Key
        </label>
        <input
          type="password"
          id="apiKey"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900 placeholder-gray-400"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      >
        Submit
      </button>
    </form>
  );
};

export default ResumeForm;
