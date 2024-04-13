import { useRef } from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';
import { useNotificationDispatch, useUserDispatch } from '../context/BlogContext';

const Login = () => {
  const loginRef = useRef();
  const dispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginInfo = {
      username: loginRef.current.username.value,
      password: loginRef.current.password.value,
    };

    if (loginInfo.username && loginInfo.password) {
      const request = await blogService.login(loginInfo);

      if (request.status === 200) {
        userDispatch({type: 'login', payload: request.data})
        window.localStorage.setItem('user', JSON.stringify(request.data));
      } else {
        dispatch({type: 'notification', payload: {
          message: request.response.data.error,
          type: 'error',
        }});
        setTimeout(() => {
          dispatch({ type: 'nullification' });
        }, 3000);
      }
    } else {
      dispatch({type: 'notification', payload: { message: 'missing input', type: 'error' }});
      setTimeout(() => {
        dispatch({ type: 'nullification' });
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Log in to the application</h2>
      <form ref={loginRef} onSubmit={handleLogin}>
        <p>Username</p>
        <input data-testid="username" name="username" />
        <p>Password</p>
        <input data-testid="password" name="password" />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <Notification />
    </div>
  );
};

export default Login;
