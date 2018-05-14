import React from 'react';
import './EmojiObject.css';

class EmojiObject extends React.Component {  
    constructor(props) {
        super(props)
    }

  handleOnClick = e => {
    e.preventDefault();
    return this.props.getEmoji(this.props.emoji);
  }

  render() {
    return (
      <p className="emojiObject" onClick={this.handleOnClick}>{this.props.emoji}</p>
    );
  }
}

export default EmojiObject;  