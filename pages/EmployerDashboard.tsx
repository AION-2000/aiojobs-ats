
import React, { useState } from 'react';
import { PageTransition, FadeIn } from '../components/MotionWrapper';
import KanbanBoard from '../components/KanbanBoard';
import { Application, ApplicationStatus, User, Job } from '../types';
import { MOCK_APPLICATIONS, MOCK_JOBS, MOCK_USER } from '../constants';

const EmployerDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);

  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === appId 
        ? { 
            ...app, 
            status: newStatus, 
            history: [...app.history, { status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }] 
          } 
        : app
    ));
  };

  const stats = [
    { label: 'Active Jobs', val: '12', trend: '+2 this month' },
    { label: 'New Applicants', val: '148', trend: '+12% vs last week' },
    { label: 'Interview Stages', val: '24', trend: 'Active' },
    { label: 'Avg. Hire Time', val: '14d', trend: 'Optimal' },
  ];

  return (
    <PageTransition className="p-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Employer Dashboard</h1>
          <p className="text-white/40">Manage your company's talent pipeline</p>
        </div>
        <button className="px-6 py-3 bg-butter-yellow text-slate-dark font-bold rounded-xl shadow-lg shadow-butter-yellow/10">
          + Post New Job
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <FadeIn key={i} delay={i * 0.1} className="glass p-6 rounded-2xl border border-white/10">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-display font-bold mb-2">{stat.val}</h3>
            <span className={`text-[10px] font-bold ${stat.trend.includes('+') ? 'text-butter-yellow' : 'text-white/30'}`}>
              {stat.trend}
            </span>
          </FadeIn>
        ))}
      </div>

      {/* ATS Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Applicant Pipeline</h2>
        <div className="flex gap-2">
          <select className="bg-slate-dark text-xs p-2 rounded border border-white/10 focus:outline-none">
            <option>All Jobs</option>
            {MOCK_JOBS.map(j => <option key={j.id}>{j.title}</option>)}
          </select>
          <button className="glass p-2 rounded border border-white/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Kanban Component */}
      <div className="min-h-[600px]">
        <KanbanBoard 
          applications={applications}
          candidates={[MOCK_USER]}
          jobs={MOCK_JOBS}
          onStatusChange={handleStatusChange}
        />
      </div>
    </PageTransition>
  );
};

export default EmployerDashboard;
