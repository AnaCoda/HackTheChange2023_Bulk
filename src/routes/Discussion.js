import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowRightSLine, RiPencilLine } from 'react-icons/ri';

const DiscussionsPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the posts data from the server
    fetch('/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log('Error:', error));
  }, []);

  const categories = [
    { value: '', label: 'All Categories', description: 'Show posts from all categories' },
    { value: 'sales', label: 'Sales', description: 'Show posts related to the sales of products and discounts' },
    { value: 'social', label: 'Social', description: 'Show posts related to social activities' },
    { value: 'shopping list', label: 'Shopping List', description: 'Show posts related to shopping lists, allowing you to group orders with other people' },
  ];

  const filteredPosts = posts.filter(
    (post) =>
    {
        return (post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.description.toLowerCase().includes(searchText.toLowerCase())) &&
      (selectedCategory === '' || post.catagory === selectedCategory)
    }
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleCreatePostClick = () => {
    navigate(`/newPost`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-1 text-green-600">Welcome to the Discussions Page</h1>
        <i>
          <p className="mb-8">
            Find out what people are looking for 🕵️‍♂️, what is on sale 💸, and connect with the community 🤝
          </p>
        </i>
        <div className="flex mb-4">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-green-500 rounded-md px-4 py-2 mr-2"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
            className="border border-green-500 rounded-md px-4 py-2 w-full"
          />
        </div>
        {selectedCategory && (
            <p className="text-gray-500 text-sm">{categories.find((category) => category.value === selectedCategory)?.description}</p>
          )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-green-100 flex items-center justify-center"
            onClick={handleCreatePostClick}
          >
            <span className="text-green-500 mr-2">
              <RiPencilLine />
            </span>
            <span className="text-green-500">Create Post</span>
          </div>

          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-green-100"
              onClick={() => handlePostClick(post.id)}
            >
            {post.imageURL != "" && <img src={post.imageURL} alt={post.title} className="w-full h-40 object-cover mb-4 rounded-md" />}
              <h2 className="text-xl font-bold mb-2 text-green-600">{post.title} - {post.catagory}</h2>
              <p className="text-gray-600">{post.content}</p>
              <div className="flex items-center mt-4">
                <span className="text-green-500 mr-2">
                  <RiArrowRightSLine />
                </span>
                <span className="text-green-500">Read More</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscussionsPage;
