
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Application, ApplicationStatus, User, Job } from '../types';

interface KanbanBoardProps {
  applications: Application[];
  candidates: User[];
  jobs: Job[];
  onStatusChange: (appId: string, newStatus: ApplicationStatus) => void;
}

const COLUMNS: { label: string; status: ApplicationStatus }[] = [
  { label: 'Applied', status: 'APPLIED' },
  { label: 'Screening', status: 'SCREENING' },
  { label: 'Interview', status: 'INTERVIEW' },
  { label: 'Offer', status: 'OFFER' },
  { label: 'Rejected', status: 'REJECTED' },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ applications, candidates, jobs, onStatusChange }) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const getAppsByStatus = (status: ApplicationStatus) => 
    applications.filter(app => app.status === status);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-full min-h-[600px] overflow-x-auto pb-8 custom-scrollbar">
      {COLUMNS.map((col) => {
        const apps = getAppsByStatus(col.status);
        return (
          <div key={col.status} className="flex flex-col gap-4 min-w-[280px]">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/50">
                {col.label}
              </h3>
              <span className="bg-white/10 text-white/60 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {apps.length}
              </span>
            </div>

            <div 
              className={`flex-1 rounded-2xl p-3 flex flex-col gap-3 min-h-[200px] transition-colors ${
                draggingId ? 'bg-white/[0.02] border-2 border-dashed border-white/5' : 'bg-transparent'
              }`}
            >
              <AnimatePresence mode="popLayout">
                {apps.map((app) => {
                  const candidate = candidates.find(c => c.id === app.candidateId);
                  const job = jobs.find(j => j.id === app.jobId);
                  
                  return (
                    <motion.div
                      key={app.id}
                      layoutId={app.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      className="glass p-4 rounded-xl border border-white/10 shadow-lg cursor-grab active:cursor-grabbing"
                      draggable
                      onDragStart={() => setDraggingId(app.id)}
                      onDragEnd={(e) => {
                        setDraggingId(null);
                        // Handled by onDrop on column containers if we had full DnD implementation
                        // For this demo, we'll use a simple select or buttons within the card
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img src={candidate?.avatar} className="w-8 h-8 rounded-full bg-white" />
                        <div>
                          <p className="font-bold text-sm leading-tight">{candidate?.name}</p>
                          <p className="text-[10px] text-white/40 truncate w-32">{job?.title}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        <select 
                          value={app.status}
                          onChange={(e) => onStatusChange(app.id, e.target.value as ApplicationStatus)}
                          className="w-full bg-slate-dark text-[10px] p-1.5 rounded border border-white/10 text-white/80 focus:outline-none"
                        >
                          {COLUMNS.map(c => <option key={c.status} value={c.status}>{c.label}</option>)}
                        </select>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {apps.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                   <p className="text-[10px] text-white/20 italic">No candidates here</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
