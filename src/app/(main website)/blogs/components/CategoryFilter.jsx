'use client';
import React from 'react';

function CategoriesFilter({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="w-full">
            <div className="sticky top-24 bg-white rounded-xl shadow-lg p-4">
                <h2 className="text-2xl font-bold text-[#0A3460] mb-4">Categories</h2>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => onSelectCategory('all')}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'all'
                                ? 'bg-[#0A3460] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            All Categories
                        </button>
                    </li>

                    {categories.data.map(cat => (
                        <li key={cat._id}>
                            <button
                                onClick={() => onSelectCategory(cat._id)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === cat._id
                                    ? 'bg-[#0A3460] text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategoriesFilter;

// 'use client';
// import React from 'react';

// function CategoriesFilter({ categories, selectedCategory, onSelectCategory }) {
//     return (
//         <div className="w-full">
//             <div className="sticky top-24 bg-white rounded-xl shadow-lg p-4">
//                 <h2 className="text-2xl font-bold text-[#0A3460] mb-4">Categories</h2>
//                 <ul className="space-y-2">
//                     <li>
//                         <button
//                             onClick={() => onSelectCategory('all')}
//                             className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'all'
//                                 ? 'bg-[#0A3460] text-white'
//                                 : 'text-gray-600 hover:bg-gray-100'
//                                 }`}
//                         >
//                             All Categories
//                         </button>
//                     </li>

//                     {categories.data.map(cat => (
//                         <li key={cat._id}>
//                             <button
//                                 onClick={() => onSelectCategory(cat._id)}
//                                 className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === cat._id
//                                     ? 'bg-[#0A3460] text-white'
//                                     : 'text-gray-600 hover:bg-gray-100'
//                                     }`}
//                             >
//                                 {cat.name}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default CategoriesFilter;
