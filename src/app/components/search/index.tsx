// // components/Search.js

// import { useState } from 'react';
// import Fuse from 'fuse.js';

// const searchModules = (query) => {
//  // Your Fuse.js setup and search logic here
//  // For example:
//  const options = {
//     keys: ['name', 'description'],
//     includeScore: true,
//     threshold: 0.4,
//  };
//  const fuse = new Fuse(modules, options);
//  return fuse.search(query);
// };

// const SearchBar = () => {
//  const [inputValue, setInputValue] = useState('');
//  const [suggestions, setSuggestions] = useState([]);

//  const handleInputChange = (e) => {
//     const query = e.target.value;
//     setInputValue(query);
//     const results = searchModules(query);
//     setSuggestions(results.map(result => result.item));
//  };

//  return (
//     <div className="search-container">
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder="Search Modules"
//       />
//       {/* Display suggestions */}
//       <ul>
//         {suggestions.map((suggestion, index) => (
//           <li key={index}>
//             <p>{suggestion.name}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//  );
// };
