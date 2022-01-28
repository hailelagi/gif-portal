import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { createGifAccount, checkIfWalletIsConnected } from "./connect";

const { solana } = window;

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    window.addEventListener('load', async (event) => {
      await checkIfWalletIsConnected();
    });
  }, []);

  useEffect(() => {
      if (walletAddress) {
        console.log('Fetching GIF list...');
        getGifs();
      };
  
    }, [walletAddress]);

  async function getGifs(){
    const gifs = await createGifAccount();
    setGifs(gifs)
  }

  async function connectWallet() {
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString())
    };
  };

  function NotConnected() {
    return (
      <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );
  }

  function GifContainer() {
    const [gifLink, setGifLink] = useState('');
  
    function onGifLinkChange(event) {
      const { value } = event.target;
      setGifLink(value);
    };
  
    async function sendGif() {
      if (gifLink.length > 0) {
      console.log('Gif link:', gifLink);
    } else {
      console.log('Empty input. Try again.');
    }
    };

    if (gifs === null) {
      return (
        <div className="connected-container">
        <button className="cta-button submit-gif-button" onClick={createGifAccount}>
          Do One-Time Initialization For GIF Program Account
        </button>
      </div>
      );
    } else {
    return (
      <div className="gif-container">
        <input 
          type="text"
          placeholder="Enter gif link!"
          value={gifLink}
          onChange={onGifLinkChange}
         />

        <button 
        className="cta-button submit-gif-button"
        onClick={sendGif}
        >Submit</button>

        <div className="gif-grid">
        {gifs.map((item, index) => (
          <div className="gif-item" key={index}>
            <img src={item.gifLink} alt={item.gifLink} />
          </div>
        ))}
      </div>
    </div>);
    }
  };
  

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>

          {!walletAddress && NotConnected()}
          {walletAddress && <GifContainer />}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href='https://twitter.com/_buildspace'
            target="_blank"
            rel="noreferrer"
          >{`built on @'_buildspace'`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
