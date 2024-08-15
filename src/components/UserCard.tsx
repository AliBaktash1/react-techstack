import React, { useState } from 'react';
import { User, Post } from '../types';

interface UserCardProps {
  user: User;
  posts: Post[] | null;
  loading: boolean;
  onFetchPosts: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, posts, loading, onFetchPosts }) => {
  const [showPosts, setShowPosts] = useState(false);

  const handleFetchPosts = () => {
    if (!posts) {
      onFetchPosts();
    }
    setShowPosts(true);
  };

  const handleClosePosts = () => {
    setShowPosts(false);
  };

  return (
    <div className="mb-4 p-4 border rounded-lg bg-gray-100">
      <h2 className="text-lg font-bold">{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <button
        className={`mt-2 px-4 py-2 text-white rounded ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary'
        }`}
        onClick={handleFetchPosts}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load Posts'}
      </button>
      {showPosts && posts && (
        <div className="mt-2">
          <button
            className="mt-2 mb-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleClosePosts}
          >
            Close Posts
          </button>
          {posts.map((post) => (
            <div key={post.id} className="mt-1 p-2 bg-white rounded shadow">
              {post.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCard;
