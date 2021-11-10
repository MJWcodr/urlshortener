import React from 'react';
// css
import './LongShort.scss'

// LongShort
class LongShort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShortURL: '',
      LongURL: '',
      InputFieldState: 'InputField Inactive'
    };
    this.warning = '';
    this.notSubmitable = '';

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
      this.setState({
        ShortURL: this.stringToHash(string)
      })
      if (string.length === 0) {
        this.setState({
          InputFieldState: 'InputField Inactive'
        })
      } else {
        this.setState({
          InputFieldState: 'InputField Active'
        })
      }
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

  warn(variable) {
    if (variable === 0) {
      this.warning = <div className="btn-alert" id="warning">{variable}</div>
    }
    else {
      this.warning = '';
    }
  }


  checkErr() {
    if (this.isValidUrl(this.state.LongURL)) {
      this.warn(null);
    }
    else {
      this.warn('Not a Valid URL!');
      this.forceUpdate();
      return 1
    }

  }
  alertSubmission(props) {
    let submission = this.state.ShortURL
    this.submission = <div className="btn-alert">Dein Link ist: <br />
      <div className="font-semibold">
        <span className="dot-typing">
          mjw.li/{submission}
        </span>
      </div>
      <div className="dot-typing"></div>
    </div>
    this.forceUpdate();
  }

  // handles and hooks
  handleAction(event) {
    this.autoShortURL(event.target.value);
    this.forceUpdate();
  }

  preventdefault(event) {
    event.preventDefault();
  }

  async handleSubmit() {
    if (this.checkErr() !== 1) {
      this.alertSubmission();
      let data = {
        "LongURL": this.state.LongURL,
        "ShortURL": this.state.ShortURL,
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
    }


  }
  handleURLChange(event) {
    if (event.target.value !== null) {
      this.setState({ LongURL: event.target.value });
      this.autoShortURL(event.target.value);
      console.log(event.target.value);
    }
  }
  handleShortURLinput(event) {
    if (event.target.value.length === 0) {
      this.setState({
        InputFieldState: 'InputField Inactive'
      })
    }
    else {
      this.setState({ InputFieldState: 'InputField Active' })
    }
    this.setState({ ShortURL: event.target.value })
  }
  componentDidMount() {
    document.title = "URL Shortener";
  }
  //render
  render() {
    return (
      <form
        className="URL-Form"
        onSubmit={this.preventdefault.bind(this)} method="post" action="/created">
        <div className="URLFormWoSubmit">
          {this.submission}
          {/*<!-- Long Url-->*/}
          <div className="InputGroup">
            <span className="InputDescription">Long URL</span><br />
            <div>
              <input
                className="InputField"
                autoFocus
                onBlur={this.handleAction}
                onSubmit={this.handleSubmit}
                onChange={this.handleURLChange}
                name="LongURL"
                placeholder="https://example.com"
                id="LongURL"
                autoComplete="off"
                value={this.LongURL} />
              {this.warning}
            </div>
          </div>
          {/*<!-- Short Url -->*/}
          <div className="InputGroup">
            <span className="InputDescription">Short URL</span><br />
            <div className="InputSubGroup">
              <span className={this.state.InputFieldState}>mjw.li/</span>
              <input
                contentEditable
                className="InputField"
                name="ShortURL"
                placeholder="hashj5"
                id="ShortURL"
                onChange={this.handleShortURLinput}
                defaultValue={this.state.ShortURL}/>
            </div>
          </div>

        </div>
        {/* Button */}

        <div onClick={this.handleSubmit} className="btn-submit">
          <input
            type="submit"
            value="Submit"
            id="submit" />
        </div>
        <span>

        </span>
      </form>
    )
  }
};

export default LongShort;
