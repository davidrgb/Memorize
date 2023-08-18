import { createPortal } from 'react-dom';

import CheckIcon from '@mui/icons-material/Check';

import './GuessModal.css';

export default function GuessModal({ submitGuess }) {
    return createPortal(
        <div className="guess-modal">
            <input className="guess-modal-input" placeholder="Type missing key here"></input>
            <button className="border-button" onClick={() => { }}><CheckIcon /></button>
        </div>,
        document.body,
    )
}