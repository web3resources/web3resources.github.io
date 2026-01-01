import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-16 flex justify-center items-center gap-6">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-500 hover:text-[#22c55e] hover:border-[#22c55e] disabled:opacity-20 transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-[11px] font-black font-mono tracking-widest text-slate-500">
        PAGE {currentPage} / {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-500 hover:text-[#22c55e] hover:border-[#22c55e] disabled:opacity-20 transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;

