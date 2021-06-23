import '../../css/tailwind.css';
import React from 'react';
// Components
import LongShort from './LongShort';




// header
const header = <div className="mx-auto container">
<h1 className="text-center text-5xl text-white font-semibold">  Url Shortener</h1>
</div>


function App() {
  return (   
    <div className="h-screen font-sans bg-black">
      <div class="h-screen pt-20 p-5 text-white">
        {/* Header*/}
        {header}
        <LongShort/>
        <div class="end-tag">With ❤️ From Berlin</div>
      </div> 
    </div>
       
  );
}

export default App;
