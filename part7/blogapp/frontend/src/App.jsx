import { useEffect, createRef } from 'react';
import userService from './services/users';
import blogService from './services/blogs';
import loginService from './services/login';
import storage from './services/storage';
import Login from './components/Login';
import Notification from './components/Notification';
import { useNotificationDispatch } from './context/notificationContext';
import { useUserValue, useUserDispatch } from './context/userContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import { Routes, Route, useMatch } from 'react-router-dom';
import Blogs from './views/Blogs';
import Blog from './views/Blog';
import Users from './views/Users';
import User from './views/User';

const App = () => {
  const queryClient = useQueryClient();

  const users = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: (args) => blogService.update(args.id, args.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const blogMatch = useMatch('/blogs/:id');
  const blog =
    blogMatch && !blogs.isLoading
      ? blogs.data.find((b) => b.id === blogMatch.params.id)
      : null;

  const blogFormRef = createRef();

  const userMatch = useMatch('/users/:id');
  const matchedUser =
    userMatch && !users.isLoading
      ? users.data.find((u) => u.id === userMatch.params.id)
      : null;

  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      userDispatch({ type: 'SET', payload: user });
    }
  }, []);

  const notify = (message, type = 'success') => {
    notificationDispatch({ type: 'SET', payload: { message, type } });
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' });
    }, 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      userDispatch({ type: 'SET', payload: user });
      storage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify('Wrong credentials', 'error');
    }
  };

  const handleCreate = async (blog) => {
    newBlogMutation.mutate(blog);
    notify(`Blog created: ${blog.title}, ${blog.author}`);
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async (blog) => {
    updateBlogMutation.mutate({
      id: blog.id,
      data: {
        ...blog,
        likes: blog.likes + 1,
      },
    });

    notify(`You liked ${blog.title} by ${blog.author}`);
  };

  const handleLogout = () => {
    const userName = user.name;
    userDispatch({ type: 'CLEAR' });
    storage.removeUser();
    notify(`Bye, ${userName}!`);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <Navigation username={user.name} onLogout={handleLogout} />
      <h2>Blogs</h2>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            !blogs.isLoading && (
              <Blogs
                blogs={blogs.data}
                onCreate={handleCreate}
                onVote={handleVote}
                onDelete={handleDelete}
                blogFormRef={blogFormRef}
              />
            )
          }
        />
        <Route
          path="/blogs/:id"
          element={<Blog blog={blog} onVote={handleVote} />}
        />
        <Route
          path="/users"
          element={!users.isLoading && <Users users={users.data} />}
        />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
      </Routes>
    </div>
  );
};

export default App;
