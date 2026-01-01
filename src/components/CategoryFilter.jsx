import { getCategoryIcon } from '../utils/icons';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-lg text-[11px] font-bold tracking-wider transition-all duration-300 flex items-center gap-2 border
            ${activeCategory === cat 
              ? 'bg-[#ff2d55]/10 border-[#ff2d55]/40 text-[#ff2d55]' 
              : 'bg-slate-900/30 text-slate-500 hover:text-white border-slate-800 hover:border-slate-700'}`}
        >
          {getCategoryIcon(cat)}
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

