import { useState } from 'react';

import { createPortal } from 'react-dom';

import AbcIcon from '@mui/icons-material/Abc';
import KeyIcon from '@mui/icons-material/Key';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import './Button.css';

import './ButtonDiv.css';

export default function ButtonDiv({ insertSpan, keyInput, openInstructionsModal }) {
    const [bottomPosition, setBottomPosition] = useState(10);

    visualViewport.addEventListener('resize', () => {
        setBottomPosition(window.innerHeight - window.visualViewport.height + 10);
    });

    return createPortal(
        <div className="button-div" style={{ bottom: `${bottomPosition}px` }}>
            <button className="border-button" style={{ backgroundColor: keyInput ? '#F2EAD3' : '#DFD7BF' }} onClick={() => insertSpan(false)}><AbcIcon /></button>
            <button className="border-button" style={{ backgroundColor: keyInput ? '#DFD7BF' : '#F2EAD3' }} onClick={() => insertSpan(true)}><KeyIcon /></button>
            <button className="border-button" onClick={() => openInstructionsModal()}><QuestionMarkIcon /></button>
        </div>,
        document.body,
    );
}