import React from 'react'


  const AllItemsPage = ({ onItemSelected, onBack }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Items");

  useEffect(() => {
    // ---------------------------------------------------------
    //  ⬇️ ADD YOUR API CALL TO FETCH ALL ITEMS HERE ⬇️
    // ---------------------------------------------------------
    const fetchAllItems = async () => {
      try {
        setLoading(true);
        // Replace this URL with your actual backend API endpoint for all items when ready
        // const response = await fetch('http://localhost:5000/api/all-items');
        // const data = await response.json();
        
        // Simulating a network request for the preview environment to prevent fetch errors
        await new Promise(resolve => setTimeout(resolve, 800));
        const data = FEATURED_ITEMS; // Using mock data as a placeholder
        
        setItems(data);
      } catch (err) {
        console.error("Error fetching all items:", err);
        setItems(FEATURED_ITEMS); 
      } finally {
        setLoading(false);
      }
    };

    fetchAllItems();
  }, []);

  const filteredItems = activeCategory === "All Items" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <button 
              onClick={onBack} 
              className="flex items-center gap-2 text-gray-500 hover:text-teal-600 mb-2 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900">Explore All Items</h1>
            <p className="text-gray-600 mt-2">Find exactly what you need from our entire catalog.</p>
          </div>

          {/* Quick Search & Filter Button */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-3 hide-scrollbar border-b border-gray-200">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Items Grid & Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="text-gray-500 mt-4 font-medium animate-pulse">Loading all items...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onClick={onItemSelected} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No items found</h3>
            <p className="text-gray-500 font-medium mt-1">Try selecting a different category or adjusting your search.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllItems
