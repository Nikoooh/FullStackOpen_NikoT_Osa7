import axios from 'axios';
const baseUrl = '/api/blogs';

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const login = async (loginInfo) => {
  try {
    const request = await axios.post('http://localhost:3003/login', loginInfo);
    return request;
  } catch (error) {
    return error;
  }
};

export const newBlog = async (newBlogContent) => {
  const user = JSON.parse(window.localStorage.user);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
  };

  try {
    const request = await axios.post(baseUrl, newBlogContent, {
      headers: headers,
    });
    return request;
  } catch (error) {
    return error;
  }
};

export const editBlog = async (blog) => {
  try {
    const request = await axios.put(`${baseUrl}/${blog.id}`, blog);
    return request;
  } catch (error) {
    return error;
  }
};

export const deleteBlog = async (blog) => {
  const user = JSON.parse(window.localStorage.user);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
  };

  try {
    const request = await axios.delete(`${baseUrl}/${blog.id}`, {
      headers: headers,
    });
    console.log(request, blog);
    return request;
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    const request = await axios.get('/api/users')
    return request
  } catch (error) {
    console.log(error);
  }
}

export const getUser = async id => {
  try {
    const request = await axios.get(`/api/users/${id}`)
    return request
  } catch (error) {
    return {status: error.response.status, message: error.response.data.err.name}
  }
}

export const getBlog = async id => {
  try {
    const request = await axios.get(`/api/blogs/${id}`)
    return request
  } catch (error) {
    console.log(error)
  }
}

export const newComment = async ({ id, newBlog }) => {
  try {
    const request = await axios.post(`/api/blogs/${id}/comments`, newBlog)
    return request
  } catch (error) {
    console.log(error);
  }
}