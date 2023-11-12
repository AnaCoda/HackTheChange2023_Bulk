import React, { useState, useEffect } from 'react';


export default function Mission() {

    /*      Left Section    */
    var Profile = (
        <>
            <div className="flex flex-col items-center pb-4">
                <img src="5856.jpg" alt="Profile Pic" className="rounded-full w-32 h-32 object-cover mb-4 border border-gray-300"/>
                <h2 className="text-lg font-semibold mb-2">John Doe</h2>
                <p className="text-sm text-gray-600">john.doe@example.com</p>
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
    
    var CreditBalance = (
        <>
            <div className="p-3">
                <div className="text-lg font-bold mb-2">Credit Balance</div>
                <div className="border rounded-md border-grey-300 p-2">$134.41</div>
            </div>
        </>
    )

    /*  Fetching User Data From /user   */

    const [userData, setUserData] = useState(null);
    const apiUrl = '/user'
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(apiUrl);
    
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


    var ProductCard = (
        <>
            <div className="flex">
                <img src="5856.jpg" alt="Profile Pic" className="rounded-full w-32 h-32 object-cover mb-4 border border-gray-300"/>
                <div className="text-md">Product Name</div>
                <div className="">$23.23</div>
                <div className="">Quantity: 2</div>
            </div>
        </>
    )
     
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
                {ProductCard}
            </div>
        </>
    )
    var ReservedItemsContent = (
        <>
             <div className="p-3">
                <div className="text-lg font-bold mb-2">Products You Reserved For Pick Up</div>
                {ProductCard}
            </div>
        </>
    )

    var Tabs = (
        <>
            <div id="overviewTab" className={`tab-content ${activeTab === 'overview' ? '' : 'hidden'}`}>
                    {/* Overview content goes here */}
                    {CreditBalance}
                    <p>Overview content</p>
                </div>
                <div id="dropOffsTab" className={`tab-content ${activeTab === 'dropOffs' ? '' : 'hidden'}`}>
                    {/* Drop Offs content goes here */}
                    {DropOffsContent}
                </div>
                <div id="purchasesTab" className={`tab-content ${activeTab === 'purchases' ? '' : 'hidden'}`}>
                    {/* Purchase content goes here */}
                    <p>Purchase History</p>
                </div>
                <div id="reservedTab" className={`tab-content ${activeTab === 'reserved' ? '' : 'hidden'}`}>
                    {/* reserved content goes here */}
                    <p>Reserved Items</p>
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