import React from 'react';
import './emojiList.css';
import emoji from '../../resources/emoji.json';

class EmojiList extends React.Component {  
  constructor(props) {
    super(props)

    let emojis = emoji;

    this.state = { 
      emoji: JSON.stringify(emojis)
    }

    this.iterateList = this.iterateList.bind(this)
  }

  iterateList() {
    console.log(this.state.emoji)
    return Object.keys(this.state.emoji).map(symbol => { <p>{symbol.title}</p>});
  }

  render() {
    return (
      <div className="emojiiis">
        {this.iterateList()}
        <p>{this.state.emoji[1].title}</p>
      </div>
    );
  }
}

export default EmojiList;  