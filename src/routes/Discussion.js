import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  // Sample data for posts
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      description: 'This is the first post',
      image: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      title: 'Post 2',
      description: 'This is the second post',
      image: 'https://example.com/image2.jpg',
    },
    // Add more posts here
  ];

  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase()) ||
    post.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome to the Reddit-like Page</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <img src={post.image} alt={post.title} className="w-full h-40 object-cover mb-4 rounded-md" />
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
