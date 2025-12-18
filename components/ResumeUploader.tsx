
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geminiService } from '../services/geminiService';
import { ResumeData } from '../types';

interface ResumeUploaderProps {
  onParsed: (data: ResumeData) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onParsed }) => {
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setError(null);

    // Simulate reading text from PDF/DOCX (In real app, use a lib like pdf-parse)
    // For this prototype, we'll simulate a mock resume text
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        // Simulating the text extracted from a file
        const mockText = `
          John Doe
          Full Stack Developer
          john.doe@email.com | 555-0199
          
          SKILLS:
          React, TypeScript, Node.js, Python, PostgreSQL, AWS
          
          EXPERIENCE:
          Senior Developer at TechGlobal (2020 - Present)
          Built cloud-native microservices using Node.js.
          
          Frontend Engineer at DesignFirst (2018 - 2020)
          Responsive web design and animation.
          
          EDUCATION:
          B.S. in Computer Science, University of Technology (2018)
        `;

        const parsedData = await geminiService.parseResume(mockText);
        onParsed(parsedData);
      } catch (err) {
        setError("AI failed to parse the resume. Please try again or fill manually.");
      } finally {
        setIsParsing(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full">
      <div className="relative group">
        <input 
          type="file" 
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileUpload}
          disabled={isParsing}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className={`p-10 border-2 border-dashed rounded-2xl transition-all flex flex-col items-center gap-4 ${
          isParsing ? 'bg-white/5 border-butter-yellow' : 'bg-white/[0.02] border-white/10 group-hover:border-butter-yellow/50 group-hover:bg-white/[0.05]'
        }`}>
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
            {isParsing ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-butter-yellow border-t-transparent rounded-full"
              />
            ) : (
              <svg className="w-8 h-8 text-butter-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
          </div>
          <div className="text-center">
            <h4 className="font-bold text-lg">{isParsing ? 'AI Parsing Resume...' : 'Upload Resume'}</h4>
            <p className="text-white/40 text-sm mt-1">PDF, DOCX, or TXT (Max 5MB)</p>
          </div>
          {isParsing && (
             <p className="text-butter-yellow text-xs animate-pulse">Extracting skills, experience, and contact info...</p>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-cherry-red text-xs mt-3 text-center font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeUploader;
