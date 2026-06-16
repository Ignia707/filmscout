// App component

import { useState } from 'react';
import './App.css'
import Search from './components/Search';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className="pattern"/>

      <div className='wrapper'>
        <header>
          <img src='hero.png' alt='hero-banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> That Resonate With You</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
    </main>
  );
}

