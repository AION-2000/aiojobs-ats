
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import { UserRole } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('CANDIDATE');

  const handleLogout = () => {
    alert("Logging out...");
  };

  const handleSwitchRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-blue-grey text-pure-white selection:bg-butter-yellow selection:text-slate-dark">
        <Navbar role={role} onLogout={handleLogout} onSwitchRole={handleSwitchRole} />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/dashboard" 
                element={role === 'CANDIDATE' ? <CandidateDashboard /> : <EmployerDashboard />} 
              />
              <Route path="/ats" element={<EmployerDashboard />} />
              <Route path="/my-applications" element={<CandidateDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>

        <footer className="py-12 border-t border-white/5 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-butter-yellow rounded-lg flex items-center justify-center">
                <span className="text-slate-dark font-bold">A</span>
              </div>
              <span className="text-xl font-display font-bold">AIOJobs</span>
            </div>
            
            <p className="text-white/20 text-xs">
              © 2026 AIOJobs ATS Portal. Built for the modern talent marketplace.
            </p>

            <div className="flex gap-6 text-white/40 text-sm">
              <a href="#" className="hover:text-butter-yellow transition-colors">Privacy</a>
              <a href="#" className="hover:text-butter-yellow transition-colors">Terms</a>
              <a href="#" className="hover:text-butter-yellow transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;