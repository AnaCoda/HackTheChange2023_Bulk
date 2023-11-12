import { Link, Route, Routes } from "react-router-dom";
import Upload from './routes/Upload';
import Home from "./routes/Home";
import Discussion from './routes/Discussion';
import Mission from './routes/Mission';
import TheHatchText from "./routes/images/The Hatch Finals_Text Only_small.png";
import PostPage from "./routes/PostPage";
import NewPostPage from "./routes/NewPost";

import Catalog from "./routes/Catalog";
function App() {
  return (
    <>
    <div className="bg-white">
      <nav className="flex justify-between items-center py-3">
        <Link to="/" title="home-page">
          <img
            src={TheHatchText}
            alt="the-hatch-logo-text-only"
            className="h-8"
          />
        </Link>
        <div className="flex space-x-12 mx-[10vh] items-center text-lg">
          <Link to="/" className="hover:text-gray-600 font-sans font-thin tracking-tight text-gray-800">
            <b>Shop</b>
          </Link>
          <Link to="/Discussion" className="hover:text-gray-600 font-sans font-thin tracking-tight text-gray-800">
            <b>Discussion</b>
          </Link>
          <Link to="/Profile" className="hover:text-gray-600 font-sans font-thin tracking-tight text-gray-800">
            <b>Profile</b>
          </Link>
          <Link to="/Catalog" className="hover:text-gray-600 font-sans font-thin tracking-tight text-gray-800">
            <b>Marketplace</b>
          </Link>
          <Link to="/upload" className="bg-green-500 text-white px-4 py-2 font-sans font-thin tracking-tight rounded hover:bg-green-600 text-base">
            <b>Drop off Food</b>
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Discussion" element={<Discussion />}></Route>
        <Route path="/Profile" element={<Mission />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/post/:id" element={<PostPage/>}></Route>
        <Route path="/newPost/" element={<NewPostPage/>}></Route>
        <Route path="/Catalog" element={<Catalog />}></Route>
      </Routes>      
    </div>
    </>
  );
}

export default App;
