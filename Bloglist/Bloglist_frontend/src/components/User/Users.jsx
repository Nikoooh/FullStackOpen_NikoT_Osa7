import { useState, useEffect } from 'react'
import { getUsers } from '../../requests'
import { useNavigate } from 'react-router-dom'

const Users = () => {

  const [users, setUsers] = useState()
  const navigate = useNavigate()

  const getAllUsers = async () => { 
    const request = await getUsers()
    setUsers(request.data)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div>
      {users ?
        <div> 
          <h3> Users </h3>
          <table style={{width: '240px'}}> 
            <tbody>
              <tr>
                <th></th>
                <th>Blogs created</th>
              </tr>

              {users.map((user, idx) => {
                return (
                  <tr key={idx}>
                    <td> <a style={{ cursor: 'pointer', textDecorationLine: 'underline', color: 'blue' }} onClick={() => navigate(`/user/${user._id}`)}> {user.name} </a> </td> 
                    <td>{user.blogs.length} </td>
                  </tr>
                )
              })}
            </tbody>
          </table>        
        </div>
        :
        <></>
      }
    </div>
  )
}

export default Users