import { useState } from 'react';
import Blog from './Blog/Blog';
import NewBlog from './Blog/NewBlog';
import { useQuery } from '@tanstack/react-query';
import { getAll } from './../requests';

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
      <button
        style={{ marginBottom: 15 }}
        onClick={() => setVisible(!visible)}
      >
        {!visible ? 'New blog' : 'Cancel'}
      </button>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          id={blog.id}
        />
      ))}    
    </div>
  );
};

export default BlogList