import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import svgImage from './images/undraw_small_town_re_7mcn.svg';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(title)
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log(description)
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    console.log(imageUrl)

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', description);
    formData.append('imageURL', imageUrl);

    try {
      const response = await fetch('/posts', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Post created successfully');
        navigate('/Discussion');
      } else {
        console.log('Failed to create post');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  return (
    <div className="min-h-screen py-8 mt-12">
      <div className="max-w-4xl mx-auto flex justify-center items-center">
        <div className="mr-8">
          <div className="flex justify-center items-center h-96">
            <img src={svgImage} alt="Small Town" className="w-96" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-8 text-green-600">New Discussions Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                className="border border-green-500 rounded-md px-4 py-2 w-96"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className="border border-green-500 rounded-md px-4 py-2 w-96"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={handleImageUrlChange}
                className="border border-green-500 rounded-md px-4 py-2 w-96"
                required
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;
