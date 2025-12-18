
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition, SlideIn, FadeIn } from '../components/MotionWrapper';
import JobCard from '../components/JobCard';
import { MOCK_JOBS, MOCK_COMPANIES } from '../constants';
import { Job } from '../types';

const SkeletonCard = () => (
  <div className="glass p-6 rounded-2xl border border-white/10 flex flex-col gap-4 animate-pulse">
    <div className="flex gap-4">
      <div className="w-14 h-14 rounded-xl bg-white/10" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    </div>
    <div className="flex gap-2 mt-2">
      <div className="h-5 bg-white/10 rounded w-16" />
      <div className="h-5 bg-white/10 rounded w-16" />
    </div>
    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
      <div className="h-4 bg-white/10 rounded w-20" />
      <div className="h-4 bg-white/10 rounded w-16" />
    </div>
  </div>
);

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(MOCK_JOBS);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setIsSearching(true);

    // Artificial delay to simulate network/AI processing
    setTimeout(() => {
      if (!searchQuery.trim() && !locationQuery.trim()) {
        setFilteredJobs(MOCK_JOBS);
        setIsSearching(false);
        setIsLoading(false);
        return;
      }

      const filtered = MOCK_JOBS.filter((job) => {
        const company = MOCK_COMPANIES.find(c => c.id === job.companyId);
        const searchMatch = 
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company?.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        const locationMatch = job.location.toLowerCase().includes(locationQuery.toLowerCase());
        
        return searchMatch && locationMatch;
      });

      setFilteredJobs(filtered);
      setIsLoading(false);
    }, 1200);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setLocationQuery('');
    setFilteredJobs(MOCK_JOBS);
    setIsSearching(false);
    setIsLoading(false);
  };

  const handleCategoryClick = (cat: string) => {
    setSearchQuery(cat);
    setIsLoading(true);
    setIsSearching(true);

    setTimeout(() => {
      const filtered = MOCK_JOBS.filter(job => 
        job.category.toLowerCase().includes(cat.toLowerCase()) ||
        job.title.toLowerCase().includes(cat.toLowerCase())
      );
      setFilteredJobs(filtered);
      setIsLoading(false);
    }, 800);
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-butter-yellow/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <SlideIn>
            <span className="inline-block px-4 py-1.5 rounded-full bg-butter-yellow/10 border border-butter-yellow/20 text-butter-yellow text-xs font-bold uppercase tracking-widest mb-6">
              The Future of Hiring is Here
            </span>
          </SlideIn>
          
          <SlideIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Landing Your <span className="text-butter-yellow">Dream Job</span><br />Just Got Personal.
            </h1>
          </SlideIn>
          
          <SlideIn delay={0.2}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-12">
              AIOJobs uses AI to match your unique skills with world-class opportunities. 
              No more black holes. Total transparency.
            </p>
          </SlideIn>

          {/* Prominent Redesigned Search Bar */}
          <SlideIn delay={0.3} className="max-w-4xl mx-auto mb-10">
            <div className="flex justify-center mb-6">
              <button 
                onClick={() => setIsAiMode(!isAiMode)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tighter transition-all ${
                  isAiMode 
                    ? 'bg-butter-yellow text-slate-dark shadow-[0_0_15px_rgba(249,224,118,0.4)]' 
                    : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isAiMode ? 'bg-slate-dark animate-pulse' : 'bg-white/20'}`} />
                {isAiMode ? 'AI Match Active' : 'Enable AI Magic'}
              </button>
            </div>

            <form 
              onSubmit={handleSearch}
              className={`glass p-2 md:p-3 rounded-[24px] md:rounded-[32px] border transition-all duration-500 shadow-2xl shadow-black/40 flex flex-col md:flex-row items-stretch gap-2 ${
                isAiMode ? 'border-butter-yellow/50 bg-butter-yellow/[0.02]' : 'border-white/10'
              }`}
            >
              {/* Job Search Input */}
              <div className="flex-[1.5] flex items-center px-6 gap-4 border-b md:border-b-0 md:border-r border-white/5 py-3 md:py-0 group">
                <div className={`transition-colors duration-300 ${isAiMode ? 'text-butter-yellow' : 'text-white/30'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder={isAiMode ? "Describe your ideal role (e.g. 'Frontend dev who loves motion')" : "Job title, keywords, or company"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                  className="bg-transparent border-none focus:ring-0 text-white placeholder-white/20 w-full text-base font-medium focus:outline-none disabled:opacity-50"
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 flex items-center px-6 gap-4 py-3 md:py-0">
                <div className="text-white/30">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  disabled={isLoading}
                  className="bg-transparent border-none focus:ring-0 text-white placeholder-white/20 w-full text-base font-medium focus:outline-none disabled:opacity-50"
                />
              </div>

              {/* Search Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-butter-yellow text-slate-dark font-bold px-10 py-5 rounded-2xl md:rounded-[24px] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-butter-yellow/10 flex items-center justify-center gap-3 min-w-[180px] disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-slate-dark border-t-transparent rounded-full animate-spin" />
                    <span>Crunching...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">Search Jobs</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </SlideIn>

          <SlideIn delay={0.4} className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/30">
            <span className="uppercase tracking-widest font-bold text-[10px]">Quick Filters:</span>
            {['Engineering', 'Design', 'Marketing', 'Sales', 'Remote'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => handleCategoryClick(cat)}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-butter-yellow/30 hover:text-butter-yellow transition-all font-semibold disabled:opacity-50"
                disabled={isLoading}
              >
                {cat}
              </button>
            ))}
          </SlideIn>
        </div>
      </section>

      {/* Stats/Social Proof */}
      {!isSearching && !isLoading && (
        <section className="py-12 px-6 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Jobs', val: '12k+' },
              { label: 'Companies', val: '450+' },
              { label: 'Successful Hires', val: '8.5k' },
              { label: 'AI Match Rate', val: '98%' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center">
                <h4 className="text-3xl font-display font-bold text-white mb-1">{stat.val}</h4>
                <p className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* Dynamic Results Section */}
      <section id="results" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-24">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            key={isSearching ? 'searching' : 'trending'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-display font-bold mb-2">
              {isLoading ? 'Finding the perfect fit...' : isSearching ? `Found ${filteredJobs.length} matches` : 'Trending Opportunities'}
            </h2>
            <p className="text-white/40">
              {isLoading 
                ? 'Our AI is analyzing thousands of roles for you' 
                : isSearching 
                  ? `Based on your ${isAiMode ? 'AI-powered' : 'keyword'} search` 
                  : 'Curated by our expert recruitment team'}
            </p>
          </motion.div>
          
          <div className="flex gap-4">
            {isSearching && !isLoading && (
              <button 
                onClick={resetSearch}
                className="text-cherry-red font-bold text-sm hover:underline flex items-center gap-2"
              >
                Clear Search
              </button>
            )}
            {!isSearching && !isLoading && (
              <button className="text-butter-yellow font-bold text-sm hover:underline">
                View All →
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              // Skeleton Loaders
              [1, 2, 3].map((n) => (
                <motion.div
                  key={`skeleton-${n}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job, i) => {
                const company = MOCK_COMPANIES.find(c => c.id === job.companyId)!;
                return (
                  <FadeIn key={job.id} delay={i * 0.05} layout>
                    <JobCard job={job} company={company} />
                  </FadeIn>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center glass rounded-2xl border border-dashed border-white/10"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                <p className="text-white/40 mb-6">Try adjusting your search filters or keywords.</p>
                <button 
                  onClick={resetSearch}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
