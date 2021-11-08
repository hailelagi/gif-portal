import { useState } from 'react';

const TEST_GIFS = [
	'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
	'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
	'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
	'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
]

export function GifContainer() {
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
      {TEST_GIFS.map(gif => (
        <div className="gif-item" key={gif}>
          <img src={gif} alt={gif} />
        </div>
      ))}
    </div>
  </div>);
};
