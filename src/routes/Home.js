import React from 'react';
import picture from "./images/premium_photo-1664302148512-ddea30cd2a92.avif"
import { FaDollarSign, FaUsers, FaLeaf } from 'react-icons/fa';
import "./Home.css"
import image from "./images/locations.png"

const CenteredDiv = () => {
    return (
      <div className="flex justify-center bg-orange-100 py-10 gap-x-60">
        <div className="text-green-900 max-w-md">
          <h1 className="text-[340%] font-thin mb-4">Too much food? Too little food? Love saving money? </h1>
          <p className="text-lg mb-4">Find out why BulkBuddies is the best platform for sustainably saving money on food.</p>
          <button className="bg-black text-white py-2 px-4 rounded-full">Sign up today</button>
        </div>
        <div className="flex justify-center">
          <img src={picture} alt="Image" className="h-auto max-h-96 rounded-lg" />
        </div>
      </div>
    );
  };
  

  const MissionValues = () => {
    return (
      <div className="grid grid-cols-3 gap-8 mt-16 p-10">
        <div className="rounded-lg bg-green-500 text-white p-4 flex flex-col items-center">
          <FaDollarSign className="text-4xl mb-2" />
          <h2 className="text-2xl font-bold mb-2">Pricing</h2>
          <p>Save money by buying other people's excess bulk purchases, including member's only stores like Costco!</p>
        </div>
        <div className="rounded-lg bg-green-500 text-white p-4 flex flex-col items-center">
          <FaUsers className="text-4xl mb-2" />
          <h2 className="text-2xl font-bold mb-2">Community</h2>
          <p>Drop off your own extra bulk food for others to enjoy (and earn in-store credit!).</p>
        </div>
        <div className="rounded-lg bg-green-500 text-white p-4 flex flex-col items-center">
          <FaLeaf className="text-4xl mb-2" />
          <h2 className="text-2xl font-bold mb-2">Sustainability</h2>
          <p>The perfect alternative to throwing food away, you can drop your extra purchases off for credits and use them anytime.</p>
        </div>
      </div>
    );
  };

  const Timeline = () => {
    return (
      <div className="flex justify-center items-center mt-16 flex-col bg-gray-800 p-16 text-white">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex justify-center items-center">
            <span className="text-white text-2xl">1</span>
          </div>
          <div className="w-80 h-1 bg-green-500"></div>
          <div className="w-16 h-16 bg-green-500 rounded-full flex justify-center items-center">
            <span className="text-white text-2xl">2</span>
          </div>
          <div className="w-80 h-1 bg-green-500"></div>
          <div className="w-16 h-16 bg-green-500 rounded-full flex justify-center items-center">
            <span className="text-white text-2xl">3</span>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-54 ml-6">
          <div className="flex flex-col items-center">
            <div className="text-lg font-bold mb-2">Join</div>
            <p className="text-center">Step 1: Join BulkBuddies<br/>for free!</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg font-bold mb-2">Earn Credit</div>
            <p className="text-center">Step 2: Submit your excess<br/>food items and drop them off<br/>for BulkBuddies credit</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg font-bold mb-2">Use Credit</div>
            <p className="text-center">Step 3: Reserve other<br/>BulkBuddies' items<br/>and pick up when you're ready</p>
          </div>
        </div>
      </div>
    );
  };
    
  const LocationMap = () => {
    return (
      <div className="flex justify-center items-center p-3 mt-8">
        <div className="w-2/3 h-auto border-l-4 p-4 rounded-2xl border-4 border-gray-700 flex flex-col justify-center items-center">
        <div className="mt-2 text-center">
            <p className="text-4xl p-2 mb-4">We are partnered with food banks across Canada</p>
            <p className="text-xl p-1">Here are our Calgary locations:</p>
        </div>

          <img src={image} alt="Your Image" className="w-4/5 h-auto" />
        </div>
      </div>
    );
  };

const HomePage = () => {
  return (
    <div>
      <CenteredDiv />
      <MissionValues />
      <Timeline/>
      <LocationMap/>
      <div className='p-10 w-full h-12'></div>
      <div className='p-10 w-full h-25 bg-yellow-100'></div>
    </div>
  );
};

export default HomePage;
