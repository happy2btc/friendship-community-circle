<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======
import React from 'react';
import MutualAidForm from './components/MutualAidForm';
import './styles/mutualAidForm.css';

function App() {
  return (
    <div>
      <h1>🌿 Friendship-Community-Contract</h1>
      <p>This is the mutual aid scroll. Share what you're tending to, request support, or offer care.</p>
      <MutualAidForm />
    </div>
  );
}

export default App;
>>>>>>> 0d09f95664eb9c6700772d38803f9ac125a5f1d0
