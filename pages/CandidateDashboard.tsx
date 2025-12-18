
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition, FadeIn } from '../components/MotionWrapper';
import ResumeUploader from '../components/ResumeUploader';
import { ResumeData, Application, Job } from '../types';
import { MOCK_APPLICATIONS, MOCK_JOBS, MOCK_COMPANIES } from '../constants';

const CandidateDashboard: React.FC = () => {
  const [parsedResume, setParsedResume] = useState<ResumeData | null>(null);

  return (
    <PageTransition className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div className="flex-1">
          <h1 className="text-4xl font-display font-bold mb-2">Candidate Dashboard</h1>
          <p className="text-white/40">Welcome back, Alex. Here's your application status.</p>
        </div>
        
        <div className="w-full md:w-80">
          <ResumeUploader onParsed={setParsedResume} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Applications */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold">Recent Applications</h3>
          <div className="space-y-4">
            {MOCK_APPLICATIONS.map((app) => {
              const job = MOCK_JOBS.find(j => j.id === app.jobId)!;
              const company = MOCK_COMPANIES.find(c => c.id === job.companyId)!;
              
              return (
                <FadeIn key={app.id} className="glass p-6 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                      <img src={company.logo} className="w-12 h-12 rounded-xl" />
                      <div>
                        <h4 className="font-bold text-lg">{job.title}</h4>
                        <p className="text-white/40 text-sm">{company.name}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      app.status === 'REJECTED' ? 'bg-cherry-red/20 text-cherry-red' : 
                      app.status === 'OFFER' ? 'bg-butter-yellow text-slate-dark' : 'bg-white/10 text-white/60'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="relative h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-butter-yellow transition-all duration-1000"
                      style={{ width: app.status === 'APPLIED' ? '20%' : app.status === 'SCREENING' ? '40%' : app.status === 'INTERVIEW' ? '70%' : '100%' }}
                    />
                  </div>

                  <div className="space-y-4">
                    {app.history.map((h, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-butter-yellow" />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-white/80">{h.status}</p>
                          <p className="text-[10px] text-white/40">{h.updatedAt} • {h.note || 'No additional notes'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Sidebar: AI Profile / Recommendations */}
        <div className="space-y-8">
          <FadeIn className="glass p-6 rounded-2xl border border-white/10">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-butter-yellow rounded-full animate-pulse" />
              AI Profile Strength
            </h3>
            {parsedResume ? (
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-xs text-white/40 mb-1">Detected Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {parsedResume.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-butter-yellow/10 text-butter-yellow text-[10px] font-bold">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-xs text-white/40 mb-1">Education</p>
                  {parsedResume.education.map((e, i) => (
                    <p key={i} className="text-[10px] font-medium">{e.degree} - {e.institution}</p>
                  ))}
                </div>
                <button className="w-full py-3 bg-butter-yellow text-slate-dark text-xs font-bold rounded-xl mt-4">
                  Update AI Profile
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-white/30 italic mb-4">Upload a resume to unlock AI profile insights.</p>
                <div className="h-2 bg-white/5 rounded-full" />
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.2} className="glass p-6 rounded-2xl border border-white/10">
             <h3 className="font-bold mb-4">Job Recommendations</h3>
             <div className="space-y-4">
               {MOCK_JOBS.slice(0, 2).map(job => (
                 <div key={job.id} className="group cursor-pointer">
                    <p className="text-sm font-bold group-hover:text-butter-yellow transition-colors">{job.title}</p>
                    <p className="text-[10px] text-white/40">{job.salary} • {job.location}</p>
                 </div>
               ))}
             </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
};

export default CandidateDashboard;
