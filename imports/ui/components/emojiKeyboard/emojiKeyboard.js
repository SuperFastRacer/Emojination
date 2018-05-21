import React from 'react';
import EmojiObject from './EmojiObject';
import emojiJSON from '../../resources/emoji.json';

import './emojiKeyboard.module.scss';

class EmojiKeyboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            emoji: ''
        }
    }
    
    getEmoji = clickedEmoji =>  {
        console.log(clickedEmoji);
        this.props.onEmojiClick(clickedEmoji)
    }
    

    iterateList() {
        const keys = Object.keys(emojiJSON);
        return emojiJSON.map(keys =>
        <EmojiObject key={keys.id} emoji={keys.symbol} getEmoji={this.props.getEmoji}/>);
    }

    render() {
        return (
            <div id="emojiKeyboardContainer">
                {this.iterateList()}
            </div>
        )
    }
}

export default EmojiKeyboard;
