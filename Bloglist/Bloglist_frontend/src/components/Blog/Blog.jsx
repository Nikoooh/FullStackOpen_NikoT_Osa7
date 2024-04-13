//import { useState } from 'react';
//import { deleteBlog } from '../../requests';
//import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  //const queryClient = useQueryClient()
  //const newMutation = useMutation({mutationFn: deleteBlog})

  //const handleDelete = async () => {
  //  const confirmation = window.confirm(`Delete blog ${blog.title} ?`);
  //  if (confirmation) {
  //    newMutation.mutate(blog, {
  //      onSuccess: () => {
  //        queryClient.invalidateQueries({ queryKey: ['blogs'] })
  //      },
  //      onError: (err) => {
  //        console.log(err);
  //      }
  //    })
  //  }
  //};

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(5, 5, 5, 0.4)',
        marginBottom: 10,
        padding: 4,
      }}
    >
      <p style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue'}} onClick={() => navigate(`/blog/${blog.id}`)}>
        <span> {blog.title} </span>
        <span> {blog.author} </span>
      </p>
    </div>
  );
};

export default Blog;
