import React, { useState, useEffect } from 'react';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [counters, setCounters] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [value, setValue] = useState(100);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const dummyData = [
    { id: 1, title: '$15.97', imageUrl: 'https://source.unsplash.com/Hz4FAtKSLKo' },
    { id: 2, title: '$20.90', imageUrl: 'https://source.unsplash.com/8RaUEd8zD-U' },
    { id: 3, title: '$7.98', imageUrl: 'https://via.placeholder.com/300' },
    { id: 4, title: '$7.98', imageUrl: 'https://source.unsplash.com/8RaUEd8zD-U' },
    { id: 5, title: '$7.98', imageUrl: 'https://source.unsplash.com/cTTLTD5zsPA' },
    { id: 6, title: '$7.98', imageUrl: 'https://source.unsplash.com/8RaUEd8zD-U' },
    { id: 7, title: '$7.98', imageUrl: 'https://source.unsplash.com/cTTLTD5zsPA' },
    { id: 8, title: '$7.98', imageUrl: 'https://source.unsplash.com/cTTLTD5zsPA' },
    // Add more dummy data as needed
  ];




  const handleReserveClick = (id) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) + 1,
    }));
  };

  return (
    <div className={`h-screen flex overflow-hidden white ${isOpen ? 'overflow-x-hidden' : ''}`}>
      {/* Sidebar */}
      <div className={` bg-emerald-500 p-3 w-64 flex-shrink-0 ${isOpen ? '' : 'hidden'}`}>
        {/* <button className="text-white focus:outline-none" onClick={toggleSidebar}>
          {isOpen ? 'Close' : 'Open'} Sidebar
        </button> */}
        {/* Add your sidebar content here */}
       
        <div className="rounded-lg p-4 " >
        <div className="rounded-lg p-4 " >
          <div className="price-range p-4 text-white">
            <span className="text-sm">$</span>
            <span className="text-sm">{value}</span>
            <input
              className="w-full accent-slate-300"
              type="range"
              name=""
              value={value}
              min="0"
              max="1000"
              onInput={(e) => (e.target.previousElementSibling.innerText = e.target.value)}
              onChange={handleInputChange}
            />
        <div className="-mt-2 flex w-full justify-between">
          <span className="text-sm text-white">0</span>
          <span className="text-sm text-white">1000</span>
        </div>
      </div>
        </div> 

    </div>
      </div>





      {/* Main Content */}
      <div className="mb-4 flex justify-center items-center absolute">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 mt-4 mx-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-6 mt-4 mb-4">
    {dummyData.map((card) => (
      <div key={card.id} className="bg-neutral-100 p-3 rounded-md shadow-md overflow-hidden">
        <img src={card.imageUrl} alt={card.title} className="h-56 w-full object-cover rounded-lg p-3" />
        <h3 className="text-base font-semibold">{card.title}</h3>
        <p className="text-gray-600 overflow-hidden">[Title]</p>
        <p className="text-gray-600 overflow-hidden">[Weight]</p>
        <button className='p-2 text-base bg-gray-500 text-gray-50 shadow-sm rounded-md font-sans mt-3 hover:scale-105' onClick={() => handleReserveClick(card.id)}>Reserve</button>
        <p className=' inline bg-green-500 text-white text-sm font-sans p-2 ml-2 shadow-lg rounded-sm'>{counters[card.id] || 0}</p>
        {/* ADD HERE ANY FOOD ITEMS OR DETAILS FROM BACKEND FOR USER VIEW*/}
      </div>
    ))}
</div>

    </div>
  );
};

export default Catalog;
