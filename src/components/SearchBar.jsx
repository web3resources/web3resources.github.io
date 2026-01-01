import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative w-full lg:w-80 group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="text-slate-500 group-focus-within:text-[#22c55e] transition-colors" size={16} />
      </div>
      <input
        type="text"
        placeholder="Search resources..."
        className="block w-full pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-800/80 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#22c55e]/50 focus:bg-slate-900/80 focus:ring-1 focus:ring-[#22c55e]/30 transition-all shadow-sm"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <kbd className="hidden sm:inline-block h-5 text-[10px] items-center gap-1 font-mono font-medium text-slate-600 bg-slate-800/50 px-1.5 rounded border border-slate-700/50">/</kbd>
      </div>
    </div>
  );
};

export default SearchBar;

