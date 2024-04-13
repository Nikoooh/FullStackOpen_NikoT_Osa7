import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../../requests'
import { useQuery } from '@tanstack/react-query';
import { getAll } from '../../requests';

const User = () => {

  const [user, setUser] = useState()
  const [error, setError] = useState()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    retry: false,
  });

  const id = useParams().id
  
  const getUserInfo = async () => {
    try {
      const request = await getUser(id)
      if (request.status === 200) {
        setUser(request.data)
      } else if (request.status === 400) {
        setError(request.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div>
      {user ? 
        <div>
          <h2>{user.name}</h2>
          <div>
            <h5>added blogs</h5>
            <div> 
              {result.isLoading ? 
                <p>loading... </p>
                :
                <div> 
                  {result.isError ?
                    <p>error</p>
                    :
                    <div>
                      <ul>
                        {result.data.filter((blog) => blog.user._id === id).map((blog, idx) => {
                          return(
                            <li key={idx}>{blog.title}</li>
                          )                      
                        })}
                      </ul>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </div>  
        :
        
        <div>
          {(error) ? <p style={{color: 'red'}}> ERROR! message: {error}. Try again </p> : <></>}
        </div>
       
      }              
    </div>
  )
}

export default User