
import React from 'react';
import { HashRouter as Router, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  onLogout: () => void;
  onSwitchRole: (role: UserRole) => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, onLogout, onSwitchRole }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Find Jobs', path: '/', roles: ['CANDIDATE', 'ADMIN'] },
    { label: 'Dashboard', path: '/dashboard', roles: ['CANDIDATE', 'EMPLOYER'] },
    { label: 'ATS', path: '/ats', roles: ['EMPLOYER', 'ADMIN'] },
    { label: 'Applications', path: '/my-applications', roles: ['CANDIDATE'] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(role));

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-butter-yellow rounded-xl flex items-center justify-center shadow-lg shadow-butter-yellow/20">
            <span className="text-slate-dark font-bold text-xl">A</span>
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">AIOJobs</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {filteredItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`relative py-1 text-sm font-medium transition-colors hover:text-butter-yellow ${
                location.pathname === item.path ? 'text-butter-yellow' : 'text-white/70'
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-butter-yellow"
                />
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-slate-dark rounded-full p-1 border border-white/5">
          {(['CANDIDATE', 'EMPLOYER', 'ADMIN'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => onSwitchRole(r)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                role === r ? 'bg-butter-yellow text-slate-dark shadow-sm' : 'text-white/40 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        
        <button 
          onClick={onLogout}
          className="text-white/70 hover:text-cherry-red transition-colors text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;