import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (t) => {
  token = `Bearer ${t}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const add = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: token },
  });

  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: { Authorization: token },
  });

  return response.data;
};

const deleteBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: { Authorization: token },
  });

  return response.data;
};

export default { getAll, setToken, add, update, deleteBlog };
