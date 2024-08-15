import React from 'react';
import { useUserPostsReducer } from './useUserPostsReducer';
import UserList from './components/UserList';

const App: React.FC = () => {
  const { state, fetchPosts } = useUserPostsReducer();

  if (state.loadingUsers) {
    return <div className="text-center text-white">Loading users...</div>;
  }

  if (state.error) {
    return <div className="text-center text-red-500">Error: {state.error}</div>;
  }

  return (
    <div className="bg-secondary min-h-screen p-4">
      <UserList
        users={state.users}
        posts={state.posts}
        loadingPosts={state.loadingPosts}
        onFetchPosts={fetchPosts}
      />
    </div>
  );
};

export default App;
