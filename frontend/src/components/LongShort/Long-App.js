import './Long-App.scss';
// Components
import LongShort from './LongShort';
import '../linktree/linktree.scss';

// header
function App() {
  return (
    <div>
      <h1 className="Title-medium">Url Shortener</h1>
      <div className="LongApp">
        <LongShort />
        <div className="BackButtonContainer">
          <a href="/">
            <div className="BackButton">
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19 5v6a3 3 0 0 1 -3 3h-7" />
                <path d="M13 10l-4 4l4 4m-5 -8l-4 4l4 4" />
              </svg>
            </div>
          </a>
        </div>
        {/* <div className="end-tag">With ❤️ From Berlin</div> */}
      </div>
    </div>
  );
}

export default App;
