import React from 'react';
import EmojiObject from '../../../ui/components/EmojiList/EmojiObject';
import emojiJSON from '../../resources/emoji.json';

import './emojiKeyboard.css';

class EmojiKeyboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            emoji: ''
        }
    }

    getEmoji = clickedEmoji =>  {
        console.log(clickedEmoji);
        return this.setState({emoji: clickedEmoji});
    }

    iterateList() {
        const keys = Object.keys(emojiJSON);
        return emojiJSON.map(keys => 
        <EmojiObject key={keys.id} emoji={keys.symbol} getEmoji={this.getEmoji}/>);
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