import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import leven from 'leven';

import CloseIcon from '@mui/icons-material/Close';

import './ResultModal.css';

export default function ResultModal({ guess, value, closeModal }) {
    const [similarity, setSimilarity] = useState(0);

    useEffect(() => {
        setSimilarity(value.length >= guess.length ?
            (((value.length - leven(guess, value)) / value.length) * 100).toFixed(1) :
            (((guess.length - leven(value, guess)) / guess.length) * 100).toFixed(1));
    }, []);

    return createPortal(
        <div className="result-modal-wrapper fade">
            <div className="result-modal">
                <span>
                    <div className="result-modal-scroll">
                        <div className="result-modal-text">
                            {
                                guess.length === 0 ?
                                    <>The original key is <span className="underlined">{value}</span></> :
                                    similarity === (100.0).toFixed(1) ?
                                        <>Perfect!</> :
                                        <>Your response <span className="underlined">{guess}</span> is {similarity}% accurate to the original key <span className="underlined">{value}</span></>
                            }
                        </div>
                        <button className="border-button" onClick={() => closeModal()}><CloseIcon /></button>
                    </div>
                </span>
            </div>
        </div>,
        document.body
    )
}