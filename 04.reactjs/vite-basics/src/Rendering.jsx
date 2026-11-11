import { useState } from 'react'

function Rendering() {
  // 1. login state
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 2. empty list state
  const [items, setItems] = useState([])

  // 3 and 4. loading and error state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const loadData = (shouldFail) => {
    setLoading(true)
    setError(null)
    setData(null)

    setTimeout(() => {
      if (shouldFail) {
        setError('Failed to load data')
      } else {
        setData('Data loaded successfully')
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <div>
      <h3>Login state</h3>
      {isLoggedIn ? <p>Welcome back, Ashwin!</p> : <p>Please log in</p>}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>

      <h3>Empty list state</h3>
      {items.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <ul>
          {items.map(item => <li key={item}>{item}</li>)}
        </ul>
      )}
      <button onClick={() => setItems([...items, 'Item ' + (items.length + 1)])}>Add item</button>
      <button onClick={() => setItems([])}>Clear</button>

      <h3>Loading and error state</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {data && <p style={{ color: 'green' }}>{data}</p>}
      <button onClick={() => loadData(false)}>Load (success)</button>
      <button onClick={() => loadData(true)}>Load (fail)</button>
    </div>
  )
}

export default Rendering