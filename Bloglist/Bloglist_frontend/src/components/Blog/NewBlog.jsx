import { useState } from 'react';
import { newBlog } from '../../requests';
import { useNotificationDispatch } from '../../context/BlogContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NewBlog = ({ setVisible }) => {
  const [newBlogContent, setNewBlogContent] = useState({title: '', url: '', author: ''});

  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient();
  const newMutation = useMutation({ mutationFn: newBlog });

  const handleNew = async (e) => {
    e.preventDefault();

    if (newBlogContent.title.length > 0 || newBlogContent.url.length > 0 || newBlogContent.author.length > 0) {
      newMutation.mutate(newBlogContent, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['blogs'] });
          dispatch({type: 'notification', payload: {
            message: `new blog ${newBlogContent.title} by ${newBlogContent.author} created`,
            type: 'success',
          }});
          setNewBlogContent({ title: '', url: '', author: '' });
          setVisible(false)
          setTimeout(() => {
            dispatch({type: 'nullification'});
          }, 3000);
        },
      });
    } else {
      dispatch({type: 'notification', payload: { message: 'input title, author, url', type: 'error' }});
      setTimeout(() => {
        dispatch({type: 'nullification'});
      }, 3000);
    }
  };

  return (
    <div>
      <form style={{ marginBottom: 5 }} onSubmit={handleNew}>
        <h2>Create new</h2>
        <a>title:</a>{' '}
        <input
          value={newBlogContent.title}
          onChange={(e) =>
            setNewBlogContent({ ...newBlogContent, title: e.target.value })
          }
          name="title"
          placeholder="title"
        />
        <br />
        <br />
        <a>author:</a>{' '}
        <input
          value={newBlogContent.author}
          onChange={(e) =>
            setNewBlogContent({ ...newBlogContent, author: e.target.value })
          }
          name="author"
          placeholder="author"
        />
        <br />
        <br />
        <a>url:</a>{' '}
        <input
          value={newBlogContent.url}
          onChange={(e) =>
            setNewBlogContent({ ...newBlogContent, url: e.target.value })
          }
          name="url"
          placeholder="url"
        />
        <br />
        <br />
        <br />
        <br />
        <button type="submit">Create blog</button>
      </form>
    </div>
  );
};

export default NewBlog;
