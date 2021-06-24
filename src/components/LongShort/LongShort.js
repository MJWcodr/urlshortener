import React from 'react';

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
        this.warning = <div className="btn-alert" id="warning">{variable}</div> 
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
    this.submission = <div className="btn-alert">Dein Link ist: <br/>
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
        await fetch('/created', {
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
        
        });
        this.ShortURL = ''
        this.LongURL = ''
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
            className="form-big"
            >
              {this.submission}
              {/*<!-- Long Url-->*/}
                <div className="">
                    <span className="">Long URL</span> <br/> 
                    <div className="text-xl">
                        <input className="input-text w-full" 
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
                      <div className="pt-7 pb-1">
                        <span>Short Url</span><br/>
                            <div className="w-full input-text text-grayText">
                              mjw.li/
                              <input 
                              className="input-text w-min" 
                              name="ShortURL" 
                              placeholder="hashj5" 
                              id="ShortURL" 
                              onChange={this.handleShortURLinput}
                              defaultValue={this.ShortURL}/>
                              
                            </div>
                  </div>
                
                </div>
                {/* Button */}
                  <div onClick={this.handleSubmit} className="btn-submit">
                    <input className="font-semibold text-xl bg-transparent text-white" 
                    type="submit" 
                    value="Submit" 
                    id="submit"/>
                  </div>
            </form>
        )
  }
};

export default LongShort;

