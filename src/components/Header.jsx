import { Database, Layers, Lock, ArrowUpRight } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = ({ bookmarksCount, categoriesCount, searchQuery, onSearchChange, onOpenSubmission }) => {
  return (
    <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12 border-b border-slate-800/40 pb-10">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase">
          WEB3<span className="text-[#ff2d55]">RESOURCES</span>
        </h1>

        {/* Description Pill */}
        <div className="mt-4 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#22c55e]/10 to-transparent border border-[#22c55e]/20 group cursor-default transition-all hover:border-[#22c55e]/40 hover:from-[#22c55e]/20 w-fit">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-[#22c55e]/50 opacity-25 group-hover:opacity-50 blur animate-pulse"></div>
            <Lock size={12} className="text-[#22c55e] relative z-10" />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80] text-[10px] font-bold tracking-[0.2em] uppercase">
            Web3 & Security Resources Directory
          </span>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-4 mt-4 px-4 py-2 rounded-lg bg-slate-900/30 border border-slate-800/50 w-fit">
          <div className="flex items-center gap-2 text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400">
            <Database size={13} className="text-[#3b82f6]" />
            <span><span className="text-slate-200">{bookmarksCount}</span> RESOURCES</span>
          </div>
          <div className="w-px h-3 bg-slate-800"></div>
          <div className="flex items-center gap-2 text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400">
            <Layers size={13} className="text-[#8b5cf6]" />
            <span><span className="text-slate-200">{categoriesCount}</span> CATEGORIES</span>
          </div>
        </div>

      </div>

      <div className="flex flex-col items-center justify-end pb-2 hidden lg:flex">
        <div className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0a0a0c_0%,#22c55e_50%,#0a0a0c_100%)]" />
          <span className="inline-flex h-full w-full cursor-default items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-[9px] font-bold text-slate-400 backdrop-blur-3xl tracking-[0.15em] uppercase gap-2">
            <span className="w-1 h-1 rounded-full bg-[#22c55e] animate-pulse"></span>
            Powered by Artificial Intelligence
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4">
        <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />

        <button
          onClick={onOpenSubmission}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold text-slate-500 hover:text-[#22c55e] transition-all duration-300 uppercase tracking-widest group border border-transparent hover:border-[#22c55e]/20 hover:bg-[#22c55e]/5"
        >
          <span>Submit Resource</span>
          <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
        </button>
      </div>
    </header>

  );
};

export default Header;

