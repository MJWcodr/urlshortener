import React from 'react';
import './../index.css'


// LongShort
class LongShort extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      LongURL: '',
    };
    this.warning = '';
    this.notSubmitable = '';
    this.LongURL = '';

    // handle stuff + binding
    this.handleAction = this.handleAction.bind(this);
    this.autoShortURL = this.autoShortURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleShortURLinput = this.handleShortURLinput.bind(this);
  
  }

  // functions
  autoShortURL(string) {
    
    if (this.isValidUrl(string)) {
        this.ShortURL = this.stringToHash(string);
    }
    else {
    }
  };

  stringToHash(string) {
    let i = '';
    let char = '';
  var hash = 0;

  if (string.length === 0) return hash;

  for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      hash = ((hash << 8) + hash) + char;
      hash = hash & hash;
  }

  return Math.abs(hash).toString(36)
  /* Cool Outputs 
      pornhub.com/hotmilfsinyourarea becomes hashj5*/    
  };

  isValidUrl(string) {
    let url;
  
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
    };

  warn(variable){
      if (variable !== null) {
        this.warning = <div className="animated slideInDown text-center mx-auto container m-10 mt-3 mb-3 px-10 bg-red max-w-screen-sm shadow-md rounded-3xl mx-10  px-20 py-3 text-black hover:shadow-lg" id="warning">{variable}</div> 
      }
      else {
        this.warning = '';
      }
  }

  
  checkErr(){
    if (this.isValidUrl(this.LongURL)){
      this.warn(null);
    }
    else {
      this.warn('Not a Valid URL!');
      this.forceUpdate();
      return 1
    }
    
  }
  alertSubmission (props) {
    let submission = this.ShortURL
    this.submission = <div className="animated slideInDown text-center mx-auto container m-5 mb-3 bg-red max-w-screen-sm shadow-md rounded-full mx-10  px-20 py-5 text-black hover:shadow-lg">Dein Link ist: <br/>
    <div className="font-semibold">mjw.li/{submission}</div>
    </div>
    this.forceUpdate();
  }

  // handles and hooks
    handleAction (event){
      this.autoShortURL(event.target.value);
      this.forceUpdate();
    }

    preventdefault(event){
      event.preventDefault();
    }

    async handleSubmit () {
      if (this.checkErr() !== 1) {
        this.alertSubmission();
        let data = {
          "LongURL" : this.LongURL,
          "ShortURL" :this.ShortURL,
        };
        console.log(data.LongURL, data.ShortURL)
        await fetch('http://127.0.0.1:3001/created', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'omit', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        
        })
      }
      
      
      }
    handleURLChange (event) {
      if (event.target.value !== null) {
        this.setState({ LongURL : event.target.value});
        this.LongURL = event.target.value;
        this.autoShortURL(event.target.value);
        console.log(event.target.value);
      }
    }
    handleShortURLinput(event) {
      this.ShortURL = event.target.value
    }
  //render
    render(){
      return (
            <form 
            onSubmit={this.preventdefault.bind(this)} 
            method="post" 
            action="/created">
              
            <div 
            className="mx-auto container m-10 px-10 max-w-screen-sm bg-gray shadow-md hover:shadow-lg rounded-3xl mx-10 mt-10 p-5 px-10 py-3 text-grayText"
            >
              {this.submission}
              {/*<!-- Long Url-->*/}
                <div className="mx-auto ">
                    <span className="">Long URL</span> <br/> 
                    <div className="rounded-lg text-xl">
                        <input className="w-full form-control bg-transparent placeholder-grayText placeholder-opacity-100" 
                        autoFocus
                        onBlur={this.handleAction}
                        onSubmit={this.handleSubmit}
                        onChange={this.handleURLChange}
                        name="LongURL"  
                        placeholder="https://example.com" 
                        id="LongURL" 
                        autoComplete="off"
                        value={this.LongURL}/>
                        {this.warning}
                    </div>
                </div>
                {/*<!-- Short Url -->*/}
                      <div className="mx-auto pt-7 pb-1">
                        <span>Short Url</span><br/>
                            <div className="w-full rounded-lg text-xl text-grayText">
                              mjw.li/
                              <input 
                              className="w-20 bg-transparent placeholder-grayText placeholder-opacity-100" 
                              name="ShortURL" 
                              placeholder="hashj5" 
                              id="ShortURL" 
                              onChange={this.handleShortURLinput}
                              defaultValue={this.ShortURL}/>
                              
                            </div>
                  </div>
                
                </div>
                {/* Button */}
                  <div className="mx-auto max-w-screen-sm hover:bg-green-500 bg-gray shadow-md hover:shadow-lg rounded-full m-10 mx-20 mt-15 p-5 text-center transition duration-700 ease-in-out disable:bg-black">
                    <input className="font-semibold text-xl bg-transparent text-white" 
                    type="submit" 
                    value="Submit" 
                    id="submit"
                    onClick={this.handleSubmit}/>
                  </div>
            </form>
            
        )
  }
};

export default LongShort;