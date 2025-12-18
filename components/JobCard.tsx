
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Job, Company } from '../types';

interface JobCardProps {
  job: Job;
  company: Company;
  onClick?: () => void;
}

const TYPE_DESCRIPTIONS: Record<string, string> = {
  'Full-time': 'Standard employment with full benefits and core hours.',
  'Part-time': 'Reduced hours employment, perfect for flexibility.',
  'Remote': 'Work from anywhere in the world, no office required.',
  'Contract': 'Project-based work with a specific duration or scope.',
};

const JobCard: React.FC<JobCardProps> = ({ job, company, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={{
        initial: { y: 0, scale: 1 },
        hover: { y: -5, scale: 1.01 }
      }}
      onClick={onClick}
      className="glass group cursor-pointer p-6 rounded-2xl flex flex-col gap-4 border border-white/10 hover:border-butter-yellow/30 transition-all shadow-xl shadow-black/10"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <img 
            src={company.logo} 
            alt={company.name} 
            className="w-14 h-14 rounded-xl object-cover bg-white shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <motion.h3 
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.04 }
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="font-display font-bold text-lg group-hover:text-butter-yellow transition-colors origin-left truncate"
            >
              {job.title}
            </motion.h3>
            <motion.p 
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.02 }
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="text-white/60 text-sm origin-left truncate"
            >
              {company.name} • {job.location}
            </motion.p>
            <p className="text-[11px] text-white/30 line-clamp-1 mt-0.5 font-medium leading-tight">
              {company.description}
            </p>
          </div>
        </div>
        
        <div className="relative shrink-0">
          <motion.span 
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="px-3 py-1 bg-white/5 rounded-full text-[11px] font-bold text-white/40 group-hover:bg-butter-yellow group-hover:text-slate-dark transition-all cursor-help"
          >
            {job.type}
          </motion.span>

          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute right-0 bottom-full mb-3 w-48 z-20"
              >
                <div className="glass bg-slate-dark/95 border border-white/20 p-3 rounded-xl shadow-2xl">
                  <p className="text-[10px] leading-relaxed text-white font-medium">
                    {TYPE_DESCRIPTIONS[job.type] || 'Information about this job type.'}
                  </p>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full right-4 -translate-y-1/2 w-2 h-2 bg-slate-dark border-r border-b border-white/20 rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {job.requirements.slice(0, 3).map((req, i) => (
          <span key={i} className="px-2 py-1 rounded-md bg-slate-dark/50 border border-white/5 text-[10px] text-white/50">
            {req}
          </span>
        ))}
        {job.requirements.length > 3 && (
          <span className="text-[10px] text-white/30 self-center">+{job.requirements.length - 3} more</span>
        )}
      </div>

      <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/5">
        <span className="font-bold text-butter-yellow">{job.salary}</span>
        <button className="text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
          View Details →
        </button>
      </div>
    </motion.div>
  );
};

export default JobCard;
