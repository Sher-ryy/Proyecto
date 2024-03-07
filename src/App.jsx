import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const [userComments, setUserComments] = useState(new Map())
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users/')
      .then(response => {
        setUsers(response.data)
      })
  }, [])

  const handleClick = async (id) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?userId=${id}`)
    setUserComments(new Map(userComments.set(id, response.data)))
    logComments(response.data)
    setSelectedUser(id)
  }

  const logComments = (comments) => {
    console.log(comments)
  }

  return (
    <>
      <div>
        {users.map(user => (
          <div key={user.id}>
            <h2>{user.id}. {user.name}</h2>
            <p>{user.phone}</p>
            <button onClick={() => handleClick(user.id)}>
              Show comments
            </button>
          </div>
        ))}
      </div>
      {selectedUser && (
        <div>
          {userComments.get(selectedUser).map(comment => (
            <div key={comment.id}>
              <p>{comment.name}</p>
              <p>{comment.email}</p>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App