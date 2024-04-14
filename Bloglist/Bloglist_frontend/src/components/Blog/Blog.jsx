import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const navigate = useNavigate()

  return (
    <tbody style={{cursor: 'pointer', color: 'darkblue', marginBottom: '15px'}} onClick={() => navigate(`/blog/${blog.id}`)}>
      <tr>
        <td style={{border: 0}}>Title: {blog.title} </td>     
      </tr>

      <tr>
        <td>Author: {blog.author} </td>
      </tr>
    </tbody>
  );
};

export default Blog;
