import { ExternalLink, ChevronRight, Globe } from 'lucide-react';
import { getFavicon } from '../utils/favicon';

const BookmarkCard = ({ item }) => {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between bg-slate-900/20 border border-slate-800/60 rounded-2xl p-5 hover:bg-slate-800/40 transition-all duration-500 hover:border-[#22c55e]/50 hover:translate-y-[-4px] hover:shadow-[0_0_20px_-5px_rgba(34,197,94,0.15)]"
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[9px] font-bold font-mono uppercase tracking-widest px-2 py-1 rounded bg-slate-950 text-[#22c55e] border border-[#22c55e]/20">
            {item.category}
          </span>
          <ExternalLink className="text-slate-700 group-hover:text-[#22c55e] transition-colors" size={14} />
        </div>

        <h3 className="text-lg font-bold text-slate-100 group-hover:text-white mb-2 tracking-tight">
          {item.title}
        </h3>
        <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 font-medium">
          {item.desc}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-800/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-1 group-hover:border-[#22c55e]/50 transition-all">
            <img
              src={getFavicon(item.url)}
              alt=""
              className="w-full h-full object-cover rounded-full"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
            <Globe size={14} className="text-slate-600 group-hover:text-[#22c55e] transition-colors hidden" />
          </div>
          <span className="text-[12px] font-semibold text-[#ff2d55] tracking-tight">
            {new URL(item.url).hostname.replace('www.', '')}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-black text-slate-700 group-hover:text-[#22c55e] transition-all uppercase tracking-[0.15em]">
          VISIT <ChevronRight size={14} />
        </div>
      </div>
    </a>
  );
};

export default BookmarkCard;

