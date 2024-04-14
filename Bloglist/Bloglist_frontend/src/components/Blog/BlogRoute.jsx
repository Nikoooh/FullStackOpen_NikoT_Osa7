import { useParams } from 'react-router-dom'
import { getBlog, getUser, newComment } from '../../requests'
import { useEffect, useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { editBlog } from '../../requests';
import { useNotificationDispatch } from '../../context/BlogContext';
import { Button, Col, Form, Row } from 'react-bootstrap'

const BlogRoute = () => {

  const [blog, setBlog] = useState()
  const [user, setUser] = useState()
  const id = useParams().id

  const getBlg = async () => {
    try {
      const request = await getBlog(id)
      if (request.status === 200) {
        setBlog(request.data)
      } else {
        console.log(request);
      } 
    } catch (error) {
      console.log(error);
    }
  }

  const getUsr = async () => {
    if (!blog) return
    const id = blog.user
    try {
      const request = await getUser(id)
      if (request.status === 200) {
        setUser(request.data)
      } else {
        console.log(request);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const queryClient = useQueryClient();
  const newLikeMutation = useMutation({ mutationFn: editBlog })
  const newCommentMutation = useMutation({ mutationFn: newComment })
  const dispatch = useNotificationDispatch()

  const handleLike = async () => {
    const newBlog = blog;
    newBlog.likes = newBlog.likes + 1;

    try {
      newLikeMutation.mutate(newBlog, {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['blogs']})
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault()

    if (e.target.comment.value.length <= 3) {

      dispatch({type: 'notification', payload: {type: 'error', message: 'comment has to be atleast 3 characters long'}})
      setTimeout(() => {
        dispatch({type: 'nullification'})
      }, 5000)
      return

    }

    try {
      const newBlog = blog
      newBlog.comments.push(e.target.comment.value)

      newCommentMutation.mutate({id: id, newBlog: newBlog}, {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['blogs']})
          dispatch({type: 'notification', payload: {type: 'success', message: `new comment ${e.target.comment.value} added`}})
          setTimeout(() => {
            dispatch({type: 'nullification'})
          }, 5000)
        }
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlg()
  }, [])

  useEffect(() => {
    getUsr()
  }, [blog])

  return (
    <div>
      {blog ? 
        <div> 
          {user ?
            <div> 
              <h2>{blog.title} {blog.author}</h2>
              <h5>{blog.url}</h5>
              <h5>likes: {blog.likes} <Button onClick={handleLike} variant='primary' style={{width: '100px'}}>like</Button></h5>
              <h5>added by {user.name}</h5>

              <div style={{marginTop: '18px'}}> 
                <Form onSubmit={handleComment}>
                  <Row>
                    <Col xs='3'>
                      <Form.Control type='text' name='comment' placeholder='good tips...' style={{width: '100%'}} required />       
                    </Col>
                    <Col xs='2'>
                      <Button type='submit' variant='primary' style={{width: '100%'}}>
                        comment
                      </Button>
                    </Col>
                  </Row>                
                </Form>
              </div>

              <div style={{marginTop: '15px'}}>
                <h5>Comments:</h5>

                <div>
                  {blog.comments.map((comment, idx) => (
                    <p key={idx} style={{marginBottom: '5px'}}>{comment}</p>                      
                  ))}
                </div>
              </div>
            </div>
            :
            <p>Not found</p>
          }
        </div>       
        :
        <p>Not found</p>
      }
    </div>
  )
}

export default BlogRoute