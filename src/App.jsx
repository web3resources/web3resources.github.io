import { useState, useMemo } from 'react';
import { bookmarks } from './constants/bookmarks';
import { categories } from './constants/categories';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import BookmarkCard from './components/BookmarkCard';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import SubmissionModal from './components/SubmissionModal';
import './App.css';

const ITEMS_PER_PAGE = 16;

const App = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);

  const filteredBookmarks = useMemo(() => {
    if (!searchQuery) return activeCategory === 'All' ? bookmarks : bookmarks.filter(b => b.category === activeCategory);

    const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/);

    return bookmarks.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      if (!matchesCategory) return false;

      const itemText = `${item.title} ${item.desc} ${item.url}`.toLowerCase();

      // Smart search: Check if ALL search terms exist anywhere in the item data
      const matchesSearch = searchTerms.every(term => itemText.includes(term));

      return matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredBookmarks.length / ITEMS_PER_PAGE);
  const currentItems = filteredBookmarks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-300 font-sans selection:bg-[#22c55e]/20">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-12">
        <Header
          bookmarksCount={bookmarks.length}
          categoriesCount={categories.length - 1}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onOpenSubmission={() => setIsSubmissionOpen(true)}
        />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentItems.map((item, index) => (
            <BookmarkCard key={index} item={item} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <Footer />

        <SubmissionModal
          isOpen={isSubmissionOpen}
          onClose={() => setIsSubmissionOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;

