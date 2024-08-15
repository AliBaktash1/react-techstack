import React from 'react';
import { User, Post } from '../types';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  posts: { [key: number]: Post[] };
  loadingPosts: { [key: number]: boolean };
  onFetchPosts: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, posts, loadingPosts, onFetchPosts }) => {
  return (
    <div className="flex flex-wrap -mx-2">
      {users.map((user) => (
        <div key={user.id} className="w-full md:w-1/2 px-2 mb-4">
          <UserCard
            user={user}
            posts={posts[user.id] || null}
            loading={loadingPosts[user.id]}
            onFetchPosts={() => onFetchPosts(user.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default UserList;
