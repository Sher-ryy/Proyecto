import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users/')
      .then(response => {
        setUsers(response.data);
      });
  }, []);

  const handleClick = async (id) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    setComments(response.data);
    setSelectedUser(id);
  }

  return (
    <>
      <div className="container">
        <div className="user-list">
          {users.map(user => (
            <div key={user.id}>
              <h2>{user.id}. {user.name}</h2>
              <p>{user.phone}</p>
              <button onClick={() => handleClick(user.id)}>Show comments</button>
            </div>
          ))}
        </div>
        <div className="comment-list">
          {selectedUser && (
            <>
              {comments.map(comment => (
                <div key={comment.id} className="comment">
                  <p>{comment.name}</p>
                  <p>{comment.email}</p>
                  <p>{comment.body}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
