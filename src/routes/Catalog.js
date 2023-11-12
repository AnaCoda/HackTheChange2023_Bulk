import React, { useState, useEffect } from 'react';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [counters, setCounters] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsWithPhotos, setItemsWithPhotos] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [value, setValue] = useState(100);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  // const dummyData = [
  //   { id: 1, title: '$15.97', imageUrl: 'https://source.unsplash.com/Hz4FAtKSLKo' },
  //   { id: 2, title: '$20.90', imageUrl: 'https://source.unsplash.com/8RaUEd8zD-U' },
  //   { id: 3, title: '$7.98', imageUrl: 'https://via.placeholder.com/300' },
  //   { id: 4, title: '$7.98', imageUrl: 'https://source.unsplash.com/8RaUEd8zD-U' },
  //   { id: 5, title: '$7.98', imageUrl: 'https://source.unsplash.com/cTTLTD5zsPA' },
  //   { id: 6, title: '$7.98', imageUrl: 'https://source.unsplash.com/8RaUEd8zD-U' },
  //   { id: 7, title: '$7.98', imageUrl: 'https://source.unsplash.com/cTTLTD5zsPA' },
  //   { id: 8, title: '$7.98', imageUrl: 'https://source.unsplash.com/cTTLTD5zsPA' },
  //   // Add more dummy data as needed
  // ];




  const handleReserveClick = (id) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) + 1,
    }));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/catalogPosts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setItemsWithPhotos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);



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
  {itemsWithPhotos.map((item) => (
    // <div key={item.id} className="bg-neutral-100 p-3 rounded-md shadow-md overflow-hidden">
    //   {/* Assuming 'item.image' is a base64 encoded image */}
    //   <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} className="h-56 w-full object-cover rounded-lg p-3" />
    //   <h3 className="text-base font-semibold">{item.name}</h3>
    //   <p className="text-gray-600 overflow-hidden">{item.description}</p>
    //   <p className="text-gray-600 overflow-hidden">{item.amount}</p>
    //   <button className='p-2 text-base bg-gray-500 text-gray-50 shadow-sm rounded-md font-sans mt-3 hover:scale-105' onClick={() => handleReserveClick(item.id)}>Reserve</button>
    //   <p className='inline bg-green-500 text-white text-sm font-sans p-2 ml-2 shadow-lg rounded-sm'>{counters[item.id] || 0}</p>
    //   {/* ADD HERE ANY FOOD ITEMS OR DETAILS FROM BACKEND FOR USER VIEW */}
    // </div>
    <div  key={item.id}className="bg-neutral-100 border border-black shadow-xl font-sans rounded-md p-3">
        {/* Card content */}
        <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
        <img
        src={`data:image/jpeg;base64,${item.image}`}
        alt={item.name}
        className="h-56 w-full object-cover shadow-sm rounded-lg p-3"
        />
         
        </div>
          <h2 className="text-lg mx-3 font-bold tracking-tight mb-1 p-1 text-gray-900">{item.name}
          <span className='inline ml-2 text-black font-sans'>{item.amount}</span>
        </h2>
        <div className="text-gray-900 p-1 mx-3 font-sans text-sm">Expiry:{item.expiry_date}</div>
        {/* <div className="text-gray-900 p-1 mx-3 mb-1 font-sans text-sm">Uploaded On:{item.date_posted}</div> */}
          <button onClick={() => handleReserveClick(item.id) } className='text-zinc-900 font-sans text-lg border-white p-2 ml-3'>+
          </button>
        <p className='inline bg-gray-800 text-white text-sm font-sans p-2 ml-2 shadow-sm'>{counters[item.id] || 0}</p>
        {/* Add other properties here */}
      </div>
  ))}
</div>




    </div>
  );
};

export default Catalog;
