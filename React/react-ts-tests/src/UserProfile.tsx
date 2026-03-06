import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
}

export const UserProfile: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setUserData(null);
     try {
      const response = await fetch('/users.csv');
      if (!response.ok) throw new Error('Network error: Could not read database file');
      
      const csvText = await response.text(); 

      const rows = csvText.trim().split('\n');
      let foundUser: User | null = null;

      for (let i = 1; i < rows.length; i++) {
        const [csvUsername, csvId, csvName] = rows[i].split(',');
        if (csvUsername.trim() === username.trim()) {
          foundUser = { 
            id: parseInt(csvId, 10), 
            name: csvName.trim() 
          };
          break;
        }
      }
      if (!foundUser) {
        throw new Error('User not found in system');
      }
      
      setUserData(foundUser);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>User Profile Finder</h2>
      
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>

      {showForm && (
        <form onSubmit={fetchUser} aria-label="user-form">
          <input 
            type="text" 
            placeholder="Enter username..." 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" disabled={!username || isLoading}>
            Fetch User
          </button>
        </form>
      )}

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }} role="alert">{error}</p>}
      {userData && (
        <div data-testid="user-data">
          <h3>Welcome, {userData.name}!</h3>
        </div>
      )}
    </div>
  );
};