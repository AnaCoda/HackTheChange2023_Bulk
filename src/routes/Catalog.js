import React, { useState, useEffect } from 'react';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [counters, setCounters] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsWithPhotos, setItemsWithPhotos] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  const handlePriceFilterChange = (e) => {
    const value = e.target.value;
    if (priceFilter.includes(value)) {
      setPriceFilter(priceFilter.filter((filter) => filter !== value));
    } else {
      setPriceFilter([...priceFilter, value]);
    }
  };

  const clearFilters = () => {
    // Clear the selected filters
    setPriceFilter([]);
    setSearchTerm("");
    // ... additional filter states
  
    // Perform any other necessary actions after clearing the filters
    // For example, you might want to fetch updated data or update the UI
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
      <div className={` bg-neutral-200 border shadow-xl rounded-md border-black w-64 flex-shrink-0 ${isOpen ? '' : 'hidden'}`}>
      
       {/* Add your sidebar content here */}
       <div className="flex justify-between mb-1 mt-4 px-5">
            <div className="text-black font-bold flex-grow">Filters</div>
            <div className="text-gray-500 underline font-bold cursor-pointer" onClick={clearFilters}>Clear All</div>
        </div>
       <div className="rounded-lg mt-2 flex justify-center w-full">
        <div className="price-range mt-4 text-zinc-800 flex flex-col justify-center">
        <div className="border-b border-4 border-black w-full rounded-xl"></div> {/* Line divider */}
          <div className="rounded-lg p-2">
            <div className="price-range py-2 text-zinc-800 flex flex-col justify-center w-full">
              <p className="mb-2 font-bold">Price Range</p>
            <div className="flex justify-between mb-2 flex-row">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded-full text-black"
                  value="1-5"
                  checked={priceFilter.includes("1-5")}
                  onChange={handlePriceFilterChange}
                />
                <span className="ml-2 text-black">$1-5</span>
              </label>
            </div>
            <div className="flex justify-between mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded-full text-black"
                  value="6-25"
                  checked={priceFilter.includes("6-25")}
                  onChange={handlePriceFilterChange}
                />
                <span className="ml-2 text-black">$6-25</span>
              </label>
            </div>
            <div className="flex justify-between mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded-full text-black"
                  value="26-50"
                  checked={priceFilter.includes("26-50")}
                  onChange={handlePriceFilterChange}
                />
                <span className="ml-2 text-black">$26-50</span>
              </label>
            </div>
            <div className="flex justify-between mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded-full text-black"
                  value="50-100"
                  checked={priceFilter.includes("50-100")}
                  onChange={handlePriceFilterChange}
                />
                <span className="ml-2 text-black">$50-100</span>
              </label>
            </div>
            <div className="flex justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded-full text-black"
                  value="100+"
                  checked={priceFilter.includes("100+")}
                  onChange={handlePriceFilterChange}
                />
                <span className="ml-2 text-black">$100+</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      {/* Main Content */}
      <div>
        <div className="mt-2 flex justify-center items-center px-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 mt-4 w-full border border-gray-800 rounded-md shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-6 mt-4 mb-4">
      {/* Catalog items */}
      {itemsWithPhotos
        .filter((item) => {
          // Check if the item's price matches any of the selected price filters
          if (priceFilter.length === 0) {
            // If no price filters are selected, show all items
            return true;
          } else {
            return priceFilter.some((range) => {
              const [min, max] = range.split("-");
              return item.price >= parseInt(min) && item.price <= parseInt(max);
            });
          }
        })
    .filter((item) => {
      // Check if the searchTerm is present in the item's word or title
      if (!searchTerm) {
        // If no searchTerm is provided, show all items
        return true;
      } else {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          (item.name && item.name.toLowerCase().includes(searchTermLower)) ||
          (item.description && item.description.toLowerCase().includes(searchTermLower))
        );
      }
    })
    .map((item) => (
      <div key={item.id} className="bg-gray-100 border border-black shadow-lg font-sans rounded-md p-3">
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
        <h2 className="text-lg mx-3 font-bold tracking-tight mb-1 p-1 text-gray-900">
          {item.name}
          <span className="inline ml-2 text-blue-700 font-sans animate-pulse">{item.amount}</span>
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
 className=' text-gray-700 border-2  hover:text-gray-900 border-black ml-6 mt-2 hover:scale-110 text-sm p-2 font-mono tracking-tighter rounded-md shadow-sm'>Reserve</button>

<button
 className=' text-gray-700 border-2  hover:text-gray-900 border-black ml-6 mt-2 hover:scale-110 text-sm p-2 font-mono tracking-tighter rounded-md shadow-sm'>Watch</button>
      </div>
    ))}
    </div>

</div>




    </div>
  );
};

export default Catalog;
