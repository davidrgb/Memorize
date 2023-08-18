import { createPortal } from 'react-dom';

import CloseIcon from '@mui/icons-material/Close';

import './InstructionsModal.css';

export default function InstructionsModal({ closeModal }) {
    return createPortal(
        <div className="instructions-modal-wrapper fade">
            <div className="instructions-modal">
                <span>
                    <div className="instructions-modal-scroll">
                        <p>
                            Welcome to Memorize!
                        </p>
                        <p>
                            In this app, there are two different types of text input: key input and regular input.
                            Key input is used for the specific words or phrases that you are trying to memorize.
                            Regular input is for anything else, such as secondary or contextual information,
                            stuff that is imporant in relation to the key phrases.
                        </p>
                        <p>
                            To type a key, press the key button and begin typing. To type regular
                            text, press the text button. After you've finished typing your first few keys,
                            you'll begin receiving notifications. Whenever you're ready, tap the notification.
                            You'll be shown an empty field where you can attempt to replace the key based on the
                            remaining regular text. When finished, hit the checkmark button and the original key
                            will be shown to you before returning you to your last typing position.
                        </p>
                        <p>
                            That's all there is to it, good luck!
                        </p>
                        <button className="border-button" onClick={() => closeModal()}><CloseIcon /></button>
                    </div>
                </span>
            </div>
        </div>,
        document.body
    );
}