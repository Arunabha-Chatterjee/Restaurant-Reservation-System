import React, { useState } from 'react';

function PopupEditor() {
    const [text, setText] = useState("I want this");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleModify = () => {
        setInputValue(text); // set current text in input
        setIsPopupOpen(true); // open popup
    };

    const handleSave = () => {
        setText(inputValue); // update text
        setIsPopupOpen(false); // close popup
    };

    return (
        <div>
            <h2>{text}</h2>
            <button onClick={handleModify}>Modify</button>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%',
                    height: '100%', backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{
                        background: 'white', padding: '20px', borderRadius: '8px'
                    }}>
                        <h3>Edit Text</h3>
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setIsPopupOpen(false)} style={{ marginLeft: '10px' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PopupEditor;
