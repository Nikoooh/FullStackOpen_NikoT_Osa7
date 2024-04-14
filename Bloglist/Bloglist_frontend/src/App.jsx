import { useEffect } from 'react';
import BlogList from './components/BlogList';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Users from './components/User/Users';
import { useUserDispatch, useUserVal } from './context/BlogContext';
import Login from './components/Login';
import User from './components/User/User';
import BlogRoute from './components/Blog/BlogRoute';
import Notification from './components/Notification';
import { Button } from 'react-bootstrap'

const App = () => {

  const user = useUserVal()
  const dispatch = useUserDispatch()
  
  const navigate = useNavigate()

  const logOut = () => {
    window.localStorage.removeItem('user');
    dispatch({type: 'logout'});
  };

  useEffect(() => {
    const localUser = window.localStorage.getItem('user');
    if (localUser) {
      dispatch({type: 'login', payload: JSON.parse(localUser)})
    }
  }, []);

  return (
    <div className='container'>
      {user ?
        <div> 
          <div style={{width: '100%', backgroundColor: 'lightblue', paddingLeft: '15px', marginBottom: '20px'}}> 
            <div style={{display: 'flex', width: '40%', justifyContent: 'space-between', verticalAlign: 'baseline', alignItems: 'center'}}>
              <p style={{margin: 0, textDecoration: 'underline', color: 'darkblue', cursor: 'pointer'}} onClick={() => navigate('/')}>blogs</p>
              <p style={{margin: 0, textDecoration: 'underline', color: 'darkblue', cursor: 'pointer'}} onClick={() => navigate('/users')}>users</p>
              <p style={{margin: 0}}><a>{user.name} logged in</a></p>
              <Button onClick={logOut} variant='danger'>Log out</Button>
            </div>
          </div>  

          <h2>Blogs</h2>

          <Notification />

          <Routes> 
            <Route path='/' element={<BlogList user={user}/>} />
            <Route path='/users' element={<Users />} />
            <Route path='/user/:id' element={<User />} />
            <Route path='/blog/:id' element={<BlogRoute />} />
          </Routes>

        </div>
        :
        <Login />
      }
      
    </div>
  );
};

export default App;
