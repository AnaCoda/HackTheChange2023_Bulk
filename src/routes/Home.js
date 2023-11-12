import React from 'react';
import picture from "./images/premium_photo-1664302148512-ddea30cd2a92.avif"
import { FaDollarSign, FaUsers, FaLeaf } from 'react-icons/fa';

const CenteredDiv = () => {
    return (
      <div className="flex justify-center bg-orange-100 py-10 gap-x-60">
        <div className="text-green-900 max-w-md">
          <h1 className="text-[340%] font-thin mb-4">Too much food? Too little food? Love saving money? </h1>
          <p className="text-lg mb-4">Find out why ___ is the best platform for saving money on foods</p>
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
          <p>Value proposition for pricing</p>
        </div>
        <div className="rounded-lg bg-green-500 text-white p-4 flex flex-col items-center">
          <FaUsers className="text-4xl mb-2" />
          <h2 className="text-2xl font-bold mb-2">Community</h2>
          <p>Value proposition for community</p>
        </div>
        <div className="rounded-lg bg-green-500 text-white p-4 flex flex-col items-center">
          <FaLeaf className="text-4xl mb-2" />
          <h2 className="text-2xl font-bold mb-2">Sustainability</h2>
          <p>Value proposition for sustainability</p>
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
        <div className="flex justify-center mt-4 relative mx-auto gap-10">
          <div className="flex flex-col items-center">
            <div className="text-lg font-bold mb-2">Login</div>
            <p>Step 1: Login to your </p>
          </div>
          <div className="flex flex-col items-center ml-8">
            <div className="text-lg font-bold mb-2">Search for items</div>
            <p>Step 2: Search  on</p>
          </div>
          <div className="flex flex-col items-center ml-8">
            <div className="text-lg font-bold mb-2">Drop it off</div>
            <p>Step 3: Drop off the </p>
          </div>
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
      <div className='p-10 w-full h-25'></div>
      <div className='p-10 w-full h-25 bg-yellow-100'></div>
    </div>
  );
};

export default HomePage;
