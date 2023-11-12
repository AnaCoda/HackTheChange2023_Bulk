import React, { useState, useEffect } from 'react';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [counters, setCounters] = useState({});
  const [reservations, setReservations] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsWithPhotos, setItemsWithPhotos] = useState([]);
  const [minSliderValue, setMinSliderValue] = useState(0);
  const [maxSliderValue, setMaxSliderValue] = useState(150);
  const [sliderValues, setSliderValues] = useState({ min: 0, max: 150 });
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [value, setValue] = useState(maxSliderValue);
  const handleInputChange = (e) => {
    setSliderValues((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }));
  };


  const handleMaxInputChange = (e) => {
    const newValue = e.target.value;
    setMaxSliderValue(newValue);
    // Add any logic if you want to handle the case when max and min should not be equal
    if (newValue < minSliderValue) {
      setMinSliderValue(newValue);
    }
  };
 



  const handleAddClick = (id) => {
    setCounters((prevCounters) => {
      const newCount = (prevCounters[id] || 0) + 1;
      const maxAmount = itemsWithPhotos.find((item) => item.id === id)?.amount || 0;
  
      return {
        ...prevCounters,
        [id]: newCount <= maxAmount ? newCount : maxAmount,
      };
    });
  };
  const handleSubtractClick = (id) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: Math.max((prevCounters[id] || 0) - 1, 0),
    }));
  };

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/catalogPosts', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //       setItemsWithPhotos(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [searchTerm]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/catalogPosts?min_price=${minSliderValue}&max_price=${maxSliderValue}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  
  //       const data = await response.json();
  //       console.log('Received data:', data);
  //       console.log('minSliderValue:', minSliderValue);
  //       console.log('maxSliderValue:', maxSliderValue);
  
  //       setItemsWithPhotos(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  
  //   fetchData();
  // }, [minSliderValue, maxSliderValue]);
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`/catalogPosts?min_price=${minSliderValue}&max_price=${maxSliderValue}&search=${searchTerm}`, {
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
}, [searchTerm, minSliderValue, maxSliderValue]);

  
  
  const handleReserveItem = async (itemId, itemName, reservedAmount) => {
    
    // Create a copy of the form data to log it without interfering with the original
    const formDataCopy = new FormData();
    formDataCopy.append('user_id', 1);
    formDataCopy.append('itemForSale', itemName);
    formDataCopy.append('itemForSale_id', itemId);
    formDataCopy.append('reserved_amount', reservedAmount);
  
    try {
      const response = await fetch('/reservations', {
        method: 'POST',
        body: formDataCopy,
      });
  
      if (response.ok) {
       
        // Update the local state with the updated amount
        setItemsWithPhotos((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? { ...item, amount: item.amount - (counters[itemId] || 0) }
            : item
        )
      
      );
    
        console.log('Reservation created for user');
        console.log(formDataCopy);
      } else {
        console.log('Failed to create reservation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
  };
  
  
  
  
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
     
        <div className=' container flex justify-center items-center h-screen -mt-24'>
        <p className='absolute mb-10 font-sans tracking-wider'>Filter by price</p>
  <div className="rounded-lg p-2 mt-16 flex items-center justify-center">
    <div className="price-range p-4 text-zinc-800">
      <span className="text-sm">$</span>
      <span className="text-sm">{value}</span>
      <input
        className="w-full accent-slate-700"
        type="range"
        name=""
        value={maxSliderValue}
        min={minSliderValue}
        max="150"
        onInput={(e) => (e.target.previousElementSibling.innerText = e.target.value)}
        onChange={handleMaxInputChange}
      />
      <div className="-mt-2 flex w-full justify-between text-zinc-800">
        <span className="text-sm ">0</span>
        <span className="text-sm ">150</span>
      </div>
    </div>
  </div>
</div>


      </div>
      {/* Main Content */}
      <div className="border-t my-4"></div>
      <div className="h-96 flex justify-center items-center absolute">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 mt-4 mx-2 border border-gray-800 rounded-md shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-6 mt-4 mb-4 ">
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
    <div  key={item.id}className=" bg-gray-100 border border-black shadow-lg font-sans rounded-md p-4">
        {/* Card content */}
        <div className="relative w-full overflow-hidden rounded-t-lg">
          <img
            src={`data:image/jpeg;base64,${item.image}`}
            alt={item.name}
            className="w-full object-cover shadow-sm rounded-lg p-3"
          />
          { item.originalPrice &&
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-tr-md">
            Discount: {((item.originalPrice - item.price).toFixed(2))} off!
          </div>
          }
        { item.origin &&
          <div className="absolute top-0 left-0 bg-zinc-900 text-white text-xs font-bold px-2 py-1">
            {item.origin}
          </div>
        }
        </div>
          <h2 className="text-lg mx-3 font-bold tracking-tight mb-1 p-1 text-gray-900">{item.name}
          <span className='inline ml-2 text-blue-700 font-sans animate-pulse'>{item.amount}</span>
        </h2>
        <div className="text-gray-900 p-1 mx-3 font-sans text-sm mb-3">Expiry: {item.expiry_date.slice(0, -12)}</div>
        {/* <div className="text-gray-900 p-1 mx-3 mb-1 font-sans text-sm">Uploaded On:{item.date_posted}</div> */}
          <div className='bg-gray-700'></div>
          <button onClick={() => handleSubtractClick(item.id) } className='text-zinc-900 font-sans text-xl p-2 ml-3 hover:scale-150'>-
          </button>
          <p className='inline  border-2 border-gray-600 text-black text-base font-sans rounded-full py-1 px-2 ml-2'>{counters[item.id] || 0}</p>
          <button onClick={() => handleAddClick(item.id) } className='text-zinc-900 font-sans text-xl p-2 ml-3 hover:scale-150'>+
          </button>
       
        {/* Add other properties here */}
        <p className='inline justify-end items-end ml-5 font-sans font-bold text-blue-600 text-lg'>${item.price}</p>
        <button onClick={() => handleReserveItem(item.id, item.name, counters)}
 className=' text-gray-700 border-2  hover:text-gray-900 border-black ml-6 mt-2 hover:scale-110 text-sm p-2 font-mono tracking-tighter rounded-md shadow-sm'>RESERVE</button>
      </div>
  ))}
</div>




    </div>
  );
};

export default Catalog;
