import React from 'react';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  console.log(users);
  return (
    <div>
      <h2>Users</h2>
      <table>
        {users.map((user) => (
          <tr>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Users;
