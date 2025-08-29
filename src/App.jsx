import React from 'react';
import MutualAidForm from './components/MutualAidForm';
import './styles/mutualAidForm.css';

function App() {
  const handleSubmit = (entry) => {
    console.log('🌿 New mutual aid entry:', entry);
    // Later we’ll connect this to Supabase
  };

  return (
    <div>
      <h1>🌟 Friendship-Community-Contract</h1>
      <p>This is a space for offerings, requests, and affirmations.</p>
      <MutualAidForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
