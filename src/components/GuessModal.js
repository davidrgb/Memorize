import { createPortal } from 'react-dom';

import CheckIcon from '@mui/icons-material/Check';

import './GuessModal.css';

export default function GuessModal({ submitGuess }) {
    return createPortal(
        <div className="guess-modal">
            <input
                id="guess-modal-input"
                className="guess-modal-input"
                placeholder="Type missing key here"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                spellCheck={false}
            />
            <button className="border-button" onClick={() => submitGuess()}><CheckIcon /></button>
        </div>,
        document.body,
    )
}