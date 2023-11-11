import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      setComments((prevComments) => [...prevComments, comment]);
      setComment('');
    }
  };

  return (
    <div className="bg-green-200 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="text-3xl font-bold mb-4">Post Page</h1>
          <p className="text-gray-600">Post ID: {id}</p>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Post Title</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc id aliquam tincidunt, nunc nunc lacinia nunc, id lacinia nunc nunc id nunc.</p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Comments</h2>
            {comments.length === 0 ? (
              <p className="text-gray-600">No comments yet.</p>
            ) : (
              comments.map((comment, index) => (
                <div className="bg-green-100 rounded-lg p-4 mt-4" key={index}>
                  <p className="text-gray-800">{comment}</p>
                </div>
              ))
            )}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Add a Comment</h2>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                placeholder="Write your comment..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
