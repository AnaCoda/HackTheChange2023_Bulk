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
  const [value, setValue] = useState(20);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
 



  const handleAddClick = (id) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) + 1,
    }));
  };
  const handleSubtractClick = (id) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) - 1,
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



  // const handleUpdateAmount = async (itemId, newAmount) => {
  //   try {
  //     const response = await fetch(`/update_amount/${itemId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ new_amount: newAmount }),
  //     });

  //     if (response.ok) {
  //       // Update the local state with the updated amount
  //       setCatalogPosts(prevPosts =>
  //         prevPosts.map(post =>
  //           post.id === itemId ? { ...post, amount: newAmount } : post
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error updating amount:', error);
  //   }
  // };

  return (
    <div className={`h-screen flex overflow-hidden white ${isOpen ? 'overflow-x-hidden' : ''}`}>
      {/* Sidebar */}
      <div className={` bg-neutral-200 border shadow-xl rounded-md border-black p-2 w-64 flex-shrink-0 ${isOpen ? '' : 'hidden'}`}>
      
        {/* Add your sidebar content here */}
       
        
        <div className="rounded-lg p-2 mt-16" >
          <div className="price-range p-4 text-zinc-800">
            <span className="text-sm">$</span>
            <span className="text-sm">{value}</span>
            <input
              className="w-full accent-slate-700"
              type="range"
              name=""
              value={value}
              min="0"
              max="150"
              onInput={(e) => (e.target.previousElementSibling.innerText = e.target.value)}
              onChange={handleInputChange}
            />
        <div className="-mt-2 flex w-full justify-between text-zinc-800 ">
          <span className="text-sm ">0</span>
          <span className="text-sm ">150</span>
        </div>
      </div>
     

    </div>



      </div>
      {/* Main Content */}
      <div className="mt-2 flex justify-center items-center absolute">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 mt-4 mx-2 border border-gray-800 rounded-md shadow-sm"
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
    <div  key={item.id}className="bg-gray-100 border border-black shadow-lg font-sans rounded-md p-3">
        {/* Card content */}
        <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
        <img
          src={`data:image/jpeg;base64,${item.image}`}
          alt={item.name}
          className="h-56 w-full object-cover shadow-sm rounded-lg p-3"
        />
         
        </div>
          <h2 className="text-lg mx-3 font-bold tracking-tight mb-1 p-1 text-gray-900">{item.name}
          <span className='inline ml-2 text-blue-700 font-sans animate-pulse'>{item.amount}</span>
        </h2>
        <div className="text-gray-900 p-1 mx-3 font-sans text-sm mb-3">Expiry: {item.expiry_date.slice(0, -12)}</div>
        {/* <div className="text-gray-900 p-1 mx-3 mb-1 font-sans text-sm">Uploaded On:{item.date_posted}</div> */}
          <button onClick={() => handleSubtractClick(item.id) } className='text-zinc-900 font-sans text-xl p-2 ml-3 hover:scale-150'>-
          </button>
          <p className='inline bg-slate-500 text-white text-base font-sans p-2 ml-2 shadow-sm rounded-full'>{counters[item.id] || 0}</p>
          <button onClick={() => handleAddClick(item.id) } className='text-zinc-900 font-sans text-xl p-2 ml-3 hover:scale-150'>+
          </button>
       
        {/* Add other properties here */}
        <p className='inline justify-end items-end ml-5 font-sans text-lg'>${item.price}</p>
        <button className=' bg-black ml-6 mt-2 hover:scale-110 text-base p-2 font-sans tracking-wider text-zinc-100 rounded-md shadow-sm'>RESERVE</button>
      </div>
  ))}
</div>




    </div>
  );
};

export default Catalog;
