import { useState } from 'react';
import { newBlog } from '../../requests';
import { useNotificationDispatch } from '../../context/BlogContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'react-bootstrap'

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
      <Form style={{ marginBottom: 5 }} onSubmit={handleNew}>
        <h4>New blog</h4>
        <Form.Group className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={newBlogContent.title}
            onChange={(e) =>
              setNewBlogContent({ ...newBlogContent, title: e.target.value })
            }
            name="title"
            placeholder="title"
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            value={newBlogContent.author}
            onChange={(e) =>
              setNewBlogContent({ ...newBlogContent, author: e.target.value })
            }
            name="author"
            placeholder="author"
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label>Url</Form.Label>
          <Form.Control
            value={newBlogContent.url}
            onChange={(e) =>
              setNewBlogContent({ ...newBlogContent, url: e.target.value })
            }
            name="url"
            placeholder="url"
          />
        </Form.Group>
        <Button type="submit" variant='success'>Create blog</Button>
      </Form>
    </div>
  );
};

export default NewBlog;
