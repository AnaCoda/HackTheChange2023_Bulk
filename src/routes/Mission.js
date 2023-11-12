import React, { useState, useEffect } from 'react';


export default function Mission() {

    /*      Left Section    */

    /*  Fetching User Data From /user   */

    const [userData, setUserData] = useState(null);
    const userAPIUrl = '/user';
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(userAPIUrl);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
    
        fetchData();
    }, []);
    
    // ...
    
    // Somewhere in your component where you use userData.email
    const userEmail = userData ? userData.email : null;
    const userFName = userData ? userData.firstName : null;
    const userLName = userData ? userData.lastName : null;
    const userId = userData ? userData.id : null;

    var Profile = (
        <>
            <div className="flex flex-col items-center pb-4">
                <img src="5856.jpg" alt="Profile Pic" className="rounded-full w-32 h-32 object-cover mb-4 border border-gray-300"/>
                <h2 className="text-lg font-semibold mb-2">{userEmail}</h2>
                <p className="text-sm text-gray-600">{userFName + userLName}</p>
            </div>
        </>
    )

    var Stats = (
        <>
            <div className="flex flex-row justify-center border rounded-lg w-3/5 p-2 border-gray-300 gap-3 items-center mx-auto">
                <div className="text-center">
                    <p className="text-sm text-gray-600">Spent</p>
                    <p className="text-m font-bold text-black">$45.28</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="text-m font-bold text-black">Jul 2023</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-600">Traded</p>
                    <p className="text-m font-bold text-black">$31.24</p>
                </div>
            </div>
        </>
    )

    /*      Right Section    */
    
    /* Tab Switching */
    const [activeTab, setActiveTab] = useState('overview');

    const showTab = (tabId) => {
        setActiveTab(tabId);
      }
    
    

    var ButtonHeader = (
        <>
            <div className="flex justify-center gap-12 p-4 border-b border-grey-300">
                <button 
                    className={`text-sm font-bold pt-2 pb-2 pl-4 pr-4 border rounded-md ${
                        activeTab === 'overview' ? 'active-tab bg-green-300' : 'hover:bg-green-100'
                    }`}
                    onClick={() => showTab('overview')}
                    >Overview
                </button>

                    <button 
                    className={`text-sm font-bold pt-2 pb-2 pl-4 pr-4 border rounded-md ${
                        activeTab === 'dropOffs' ? 'active-tab bg-green-300' : 'hover:bg-green-100'
                    }`}
                    onClick={() => showTab('dropOffs')}
                    >Drop Offs
                </button>

                <button 
                    className={`text-sm font-bold pt-2 pb-2 pl-4 pr-4 border rounded-md ${
                        activeTab === 'purchases' ? 'active-tab bg-green-300' : 'hover:bg-green-100'
                    }`}
                    onClick={() => showTab('purchases')}
                    >Purchases
                </button>

                <button 
                    className={`text-sm font-bold pt-2 pb-2 pl-4 pr-4 border rounded-md ${
                        activeTab === 'reserved' ? 'active-tab bg-green-300' : 'hover:bg-green-100'
                    }`}
                    onClick={() => showTab('reserved')}
                    >Reserved Items
                </button>


            </div>

        </>
    )
    
    var OverviewContent = (
        <>
            <div className="p-3">
                <div className="text-lg font-bold mb-2">Credit Balance</div>
                <div className="border rounded-md border-grey-300 p-2">$134.41</div>
            </div><div className="p-3">
                <div className="text-lg font-bold mb-2">Money Saved</div>
                <div className="border rounded-md border-grey-300 p-2">$40.05</div>
            </div>
        </>
    )


    


    var ProductCard = (
        <>
            <div className="flex border border-grey-300 rounded-md p-3 items-center">
                <div className="flex flex-row w-1/5">
                    <img src="bathtissue.webp" alt="Profile Pic" className=" w-36 h-36 object-cover border border-gray-300"/>

                </div>

                <div className="flex justify-between flex-col w-2/5">
                    <div className="text-lg font-bold text-black">Bath Tissue</div>
                    <div className="text-md">$21.23</div>

                </div>
                <div className="flex flex-row w-2/5 items-end justify-end">
                    <div className="">Quantity: 17</div>
                </div>
                
            </div>
        </>
    )

    var ProductCard2 = (
        <>
            <div className="flex border border-grey-300 rounded-md p-3 items-center">
                <div className="flex flex-row w-1/5">
                    <img src="cheetos.webp" alt="Profile Pic" className=" w-36 h-36 object-cover border border-gray-300"/>

                </div>

                <div className="flex justify-between flex-col w-2/5">
                    <div className="text-lg font-bold text-black">Cheetos Variety Pack</div>
                    <div className="text-md">$6.49</div>

                </div>
                <div className="flex flex-row w-2/5 items-end justify-end">
                    <div className="">Quantity: 12</div>
                </div>
                
            </div>
        </>
    )

    const [reservedData, setReservedData] = useState(null);
    const reservedDataAPIUrl = '/users/1/reserved_items';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(reservedDataAPIUrl);
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const data = await response.json();
                setReservedData(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
    
        fetchData();
    }, []);

    if (reservedData === null) {
        return <p>Loading...</p>;
    }
   
    const ReservedProductCards = reservedData.map((item, index) => (
        <div key={index} className="flex border border-grey-300 rounded-md p-3 relative">
            <div className="flex flex-row w-1/5">
                <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} className="w-36 h-36 object-cover border border-gray-300" />
            </div>
        
            <div className="flex justify-between flex-col w-2/5">
                <div className="text-lg font-bold text-black">{item.name}</div>
                <div className="text-md">${item.price}</div>
            </div>
        
            <div className="flex flex-row w-2/5 items-end justify-end">
                <div className="">Quantity: {item.reserved_amount}</div>
            </div>

            {index === 0 ? 
                <div className="absolute top-0 right-0 bg-green-500 text-white text-m font-bold px-2 py-1">
                    Ready for Pickup Within 7 Days
                </div> :
                <div className="absolute top-0 right-0 bg-red-500 text-white text-m font-bold px-2 py-1">
                    Not Yet Ready For Pickup
                </div>
            }
        </div>
     ));
     
     
    var DropOffsContent = (
        <>
            <div className="p-3">
                <div className="text-lg font-bold mb-2">Products You Dropped Off</div>
                {ProductCard}
            </div>
        </>
    )
    var PurchaseHistoryContent = (
        <>
             <div className="p-3">
                <div className="text-lg font-bold mb-2">Products You Purchased</div>
                {ProductCard2}
            </div>
        </>
    )


    

    var ReservedItemsContent = (
        <>
             <div className="p-3">
                <div className="text-lg font-bold mb-2">Products You Reserved For Pick Up</div>
                {ReservedProductCards}

            </div>
        </>
    )

    var Tabs = (
        <>
            <div id="overviewTab" className={`tab-content ${activeTab === 'overview' ? '' : 'hidden'}`}>
                    {/* Overview content goes here */}
                    {OverviewContent}
                </div>
                <div id="dropOffsTab" className={`tab-content ${activeTab === 'dropOffs' ? '' : 'hidden'}`}>
                    {/* Drop Offs content goes here */}
                    {DropOffsContent}
                </div>
                <div id="purchasesTab" className={`tab-content ${activeTab === 'purchases' ? '' : 'hidden'}`}>
                    {/* Purchase content goes here */}
                    {PurchaseHistoryContent}
                </div>
                <div id="reservedTab" className={`tab-content ${activeTab === 'reserved' ? '' : 'hidden'}`}>
                    {/* reserved content goes here */}
                    {ReservedItemsContent}
            </div>
        </>
    )
        

    var AllUserInfo = (<>{ButtonHeader}{Tabs}</>)
    

    return(
        <div className="flex justify-between border border-grey-300 gap-3 w-full h-full">
            <div className="w-1/3 pt-4 pb-4">
                {Profile}
                {Stats}
            </div>
            <div className="w-2/3 border-l border-grey-300">
                {AllUserInfo}
            
            </div>
        </div>
    )
}