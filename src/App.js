import React from 'react';

import './App.css';
import './index.css'
import './assets/tailwind.css'

// Components
import LongShort from './components/LongShort';


// header
const header = <div class="mx-auto container">
<h1 class="text-center text-5xl text-white font-semibold">  Url Shortener</h1>
</div>


function App() {
  return (   
    <div class="h-screen font-sans bg-black">
      <div class="h-screen pt-20 p-5 text-white">
        {/* Header*/}
        {header}
        <LongShort/>
        <div class="text-center container mx-auto font-bold">With ❤️ From Berlin</div>
      </div> 
    </div>
       
  );
}

export default App;