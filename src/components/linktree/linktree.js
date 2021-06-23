import '../../css/tailwind.css';
import React from 'react';

// Components
import Tous from './tous/tous';

// css
import './stylesheet(index).css'

// class everything

    function linktree() {  
        return (   
        <div className="h-screen font-sans bg-black">
            <div class="h-screen pt-20 p-5 text-white">
                <Tous/>
                <div class="end-tag">With ❤️ From Berlin</div>
            </div>  
        </div>
        );
    }
  

      
  export default linktree;