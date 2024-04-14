import { useState } from 'react';
import Blog from './Blog/Blog';
import NewBlog from './Blog/NewBlog';
import { useQuery } from '@tanstack/react-query';
import { getAll } from './../requests';
import { Table, Button } from 'react-bootstrap'

const BlogList = ({ user }) => {

  const [visible, setVisible] = useState(false);

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading....</div>;
  }

  if (result.isError) {
    return <div>service not available due to server error</div>;
  }
  
  let blogs = (result.data).sort((a, b) => b.likes - a.likes)
  
  return (
    <div>
      <div style={{ display: visible ? 'block' : 'none' }}>
        <NewBlog setVisible={setVisible}/>
      </div>
      <Button
        style={{ marginBottom: 15 }}
        onClick={() => setVisible(!visible)}
        variant='secondary'
      >
        {!visible ? 'New blog' : 'Cancel'}
      </Button>
      <Table> 
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            id={blog.id}
          />  
        ))} 
      </Table>   
    </div>
  );
};

export default BlogList