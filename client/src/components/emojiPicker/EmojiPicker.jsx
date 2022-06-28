import * as React from 'react';
import { useState } from 'react';
import Picker from 'emoji-picker-react';

export default function EmojiPicker ({ newMessage, setNewMessage }) {
  // const [chosenEmoji, setChosenEmoji] = useState(null);


  const onEmojiClick = (event, emojiObject) => {
    // console.log(emojiObject);
    // setChosenEmoji(emojiObject);
    setNewMessage(`${newMessage}${emojiObject.emoji}`);
  };

  return (
    <div style = {{
        position: 'absolute',
        left: '10px',
        top: '-310px'
    }}>
      {/* {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )} */}
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};