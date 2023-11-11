import { Link, Route, Routes } from "react-router-dom";
import Account from './routes/Account';
import Home from "./routes/Home";
import Howitworks from './routes/Howitworks';
import Mission from './routes/Mission';
import ShopSwap from './routes/ShopSwap';
import TheHatchText from "./routes/images/The Hatch Finals_Text Only_small.png";

function App() {
  return (
    <div className="bg-white">
      <nav className="flex justify-between items-center py-4">
        <Link to="/" title="home-page">
          <img
            src={TheHatchText}
            alt="the-hatch-logo-text-only"
            className="h-8"
          />
        </Link>

        <div className="flex space-x-12 mx-[10vh] items-center">
          <Link to="/" className="hover:text-gray-600 text-gray-800">
            <b>Shop</b>
          </Link>
          <Link to="/Howitworks" className="hover:text-gray-600 text-gray-800">
            <b>Discussion</b>
          </Link>
          <Link to="/ShopSwap" className="hover:text-gray-600 text-gray-800">
            <b>Profile</b>
          </Link>
          <Link to="/Mission" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            <b>Drop off Food</b>
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Howitworks" element={<Howitworks />}></Route>
        <Route path="/ShopSwap" element={<ShopSwap/>}></Route>
        <Route path="/Mission" element={<Mission />}></Route>
        <Route path="/Account" element={<Account />}></Route>
      </Routes>      
    </div>
  );
}

export default App;
