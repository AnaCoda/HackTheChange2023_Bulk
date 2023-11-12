import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`/post/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
          fetch(`/user/${data.post.user_id}`)
            .then((response) => response.json())
            .then((userData) => {
              if(userData.firstName || userData.lastName) setUserName(`${userData.firstName} ${userData.lastName}`);
            })
            .catch((error) => console.error(error));
            setIsLoading(false);

        })
        .catch((error) => console.error(error));
    }, 1);
  }, [id]);

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

  if (isLoading) {
    return (
      <div className="bg-green-200 min-h-screen py-8 flex items-center justify-center">
        <FaSpinner className="text-green-500 animate-spin text-4xl" />
      </div>
    );
  }

  return (
    <div className="bg-green-200 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="text-3xl font-bold mb-4">{post.post.title}</h1>
          <p className="text-gray-600">By: {userName != "" ? userName : "unnamed"} on {new Date(post.post.created_at).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</p>
          <div className="mt-8">
            <div className="flex justify-center">
              <img src={post.post.imageURL} className='h-40 object-cover mb-4 rounded-md bg-center'></img>
            </div>
            <p className="mb-2 text-center">{post.post.content}</p>
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
