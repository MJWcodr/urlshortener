//TODO: RE-ADD import '../../styles/tailwind.css';
import React from 'react';
import './Long-App.scss';

// Components
import LongShort from './LongShort';

// header

function App() {
  return (
    <div className="h-screen font-sans bg-black">
      <div class="h-screen pt-20 p-5 text-white">
        <h1 className="Title-medium">Url Shortener</h1>
        <LongShort />
        <div class="end-tag">With ❤️ From Berlin</div>
      </div>
    </div>

  );
}

export default App;
