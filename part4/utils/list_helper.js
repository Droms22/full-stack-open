const _ = require('lodash');

const dummy = () => 1;
const totalLikes = (blogs) => blogs.reduce((total, blog) => total += blog.likes, 0);
const favoriteBlog = (blogs) => blogs.length === 0 ? null : blogs.reduce((max, current) => current.likes > max.likes ? current : max, blogs[0]);

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  
  const groupedByAuthor = _.groupBy(blogs, 'author');
  const mostBlogsGroup = _.maxBy(Object.entries(groupedByAuthor), ([, blogs]) => blogs.length);

  return {
    author: mostBlogsGroup[0],
    blogs: mostBlogsGroup[1].length
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupedByAuthor = _.groupBy(blogs, 'author');
  const mostLikesGroup = _.maxBy(Object.entries(groupedByAuthor), ([, blogs]) => totalLikes(blogs));
  
  return {
    author: mostLikesGroup[0],
    likes: totalLikes(mostLikesGroup[1])
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
