import { Link, Route, Routes } from "react-router-dom";
import Upload from './routes/Upload';
import Home from "./routes/Home";
import Discussion from './routes/Discussion';
import Mission from './routes/Mission';
import PostPage from "./routes/PostPage";
import NewPostPage from "./routes/NewPost";
import { AiOutlineBell } from 'react-icons/ai';
import NavBar from "./routes/Navbar"
import Catalog from "./routes/Catalog";
function App() {
  return (
    <>
    <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Discussion" element={<Discussion />}></Route>
        <Route path="/Profile" element={<Mission />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/post/:id" element={<PostPage/>}></Route>
        <Route path="/newPost/" element={<NewPostPage/>}></Route>
        <Route path="/Catalog" element={<Catalog />}></Route>
      </Routes>      
    </>
  );
}

export default App;
