/* eslint-disable indent */
import { createContext, useContext, useReducer, useState } from 'react';

const BloglistContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'notification': 
      return action.payload;  
    case 'nullification':  
      return {type: null, message: ''};  
    default: 
      return state
  }
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return action.payload
    case 'logout':
      return null
    default: 
      return state
  }
}

export const BloglistContextProvider = (props) => {
  
  const [notification, notificationDispatch] = useReducer(notificationReducer, null);
  const [user, userDispatch] = useReducer(userReducer, null)

  const [blogs, setBlogs] = useState([]);

  return (
    <BloglistContext.Provider
      value={{ blogs, setBlogs, user, userDispatch, notification, notificationDispatch }}
    >
      {props.children}
    </BloglistContext.Provider>
  );
};

export const useNotificationVal = () => {
  const notificationAndDispatch = useContext(BloglistContext);
  return notificationAndDispatch.notification;
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(BloglistContext);
  return notificationAndDispatch.notificationDispatch;
};

export const useUserVal = () => {
  const userAndDispatch = useContext(BloglistContext);
  return userAndDispatch.user
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(BloglistContext);
  return userAndDispatch.userDispatch
}

export default BloglistContext;
