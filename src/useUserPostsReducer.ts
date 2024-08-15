import { useReducer, useEffect } from 'react';
import { User, Post } from './types';

interface State {
  users: User[];
  posts: { [key: number]: Post[] };
  loadingUsers: boolean;
  loadingPosts: { [key: number]: boolean };
  error: string | null;
}

type Action =
  | { type: 'FETCH_USERS_START' }
  | { type: 'FETCH_USERS_SUCCESS'; payload: User[] }
  | { type: 'FETCH_USERS_FAILURE'; payload: string }
  | { type: 'FETCH_POSTS_START'; userId: number }
  | { type: 'FETCH_POSTS_SUCCESS'; userId: number; payload: Post[] }
  | { type: 'FETCH_POSTS_FAILURE'; userId: number; payload: string };

const initialState: State = {
  users: [],
  posts: {},
  loadingUsers: false,
  loadingPosts: {},
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_USERS_START':
      return { ...state, loadingUsers: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, loadingUsers: false, users: action.payload };
    case 'FETCH_USERS_FAILURE':
      return { ...state, loadingUsers: false, error: action.payload };
    case 'FETCH_POSTS_START':
      return {
        ...state,
        loadingPosts: { ...state.loadingPosts, [action.userId]: true },
      };
    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        loadingPosts: { ...state.loadingPosts, [action.userId]: false },
        posts: { ...state.posts, [action.userId]: action.payload },
      };
    case 'FETCH_POSTS_FAILURE':
      return {
        ...state,
        loadingPosts: { ...state.loadingPosts, [action.userId]: false },
        error: action.payload,
      };
    default:
      return state;
  }
}

export function useUserPostsReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS_START' });

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data });
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
      });
  }, []);

  const fetchPosts = (userId: number) => {
    dispatch({ type: 'FETCH_POSTS_START', userId });

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'FETCH_POSTS_SUCCESS',
          userId,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_POSTS_FAILURE',
          userId,
          payload: error.message,
        });
      });
  };

  return { state, fetchPosts };
}
