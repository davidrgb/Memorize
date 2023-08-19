import { useEffect, useRef, useState } from 'react';

import ButtonDiv from './ButtonDiv';
import GuessModal from './GuessModal';
import InstructionsModal from './InstructionsModal';
import Notification from './Notification';
import ResultModal from './ResultModal';
import TextSpan from './TextSpan';

import './Button.css';
import './Fade.css';

import './Wrapper.css';

export default function Wrapper() {
    const currentId = useRef(1);
    const guess = useRef(null);
    const [guessModalActive, setGuessModalActive] = useState(false);
    const [instructionsModalActive, setInstructionsModalActive] = useState(false);
    const [keyInput, setKeyInput] = useState(false);
    const [keySpans, setKeySpans] = useState([]);
    const max = useRef(1);
    const [notificationActive, setNotificationActive] = useState(false);
    const notificationTimeoutRef = useRef(null);
    const [resultModalActive, setResultModalActive] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [selectedId, setSelectedId] = useState(null);
    const [spans, setSpans] = useState([]);
    const value = useRef(null);

    useEffect(() => {
        const wrapper = document.getElementById('wrapper');

        wrapper.addEventListener('scroll', () => {
            setScrollOffset(wrapper.scrollTop);
        });

        wrapper.addEventListener('paste', (e) => {
            e.preventDefault();

            const text = e.clipboardData ?
                (e.originalEvent || e).clipboardData.getData('text/plain') :
                window.clipboardData ?
                    window.clipboardData.getData('Text') :
                    '';

            if (document.queryCommandEnabled('insertText')) {
                document.execCommand('insertText', false, text);
            }
            else {
                const range = document.getSelection().getRangeAt(0);
                range.deleteContents();

                const textNode = document.createTextNode(text);
                range.insertNode(textNode);
                range.selectNodeContents(textNode);
                range.collapse(false);

                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedId !== null) {
            const spanId = `span-${selectedId}`;
            document.getElementById(spanId).scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [selectedId]);

    const getIndex = (id) => {
        let index = -1;
        for (let i = 0; i < spans.length; i++) {
            if (spans[i].id === id) {
                index = i;
            }
        }
        return index;
    }

    const getKeys = () => {
        let temp = [];
        const spans = document.querySelectorAll(".key-span");
        spans.forEach((span) => {
            if (span.innerHTML.trim().length > 0) {
                temp = [
                    ...temp,
                    {
                        component: span,
                        id: Number(span.id.substring(5)),
                    },
                ]
            }
        });
        setKeySpans([...temp]);
    }

    const selectKey = () => {
        getKeys();
        const index = Math.floor(Math.random() * keySpans.length);
        const id = keySpans[index].id;
        setSelectedId(id);
        const spanId = `span-${id}`;
        const selectedSpan = document.getElementById(spanId);
        selectedSpan.classList.add("selected-span")
        document.querySelectorAll("span").forEach((span) => {
            span.contentEditable = false;
        })
        setNotificationActive(false);
        setGuessModalActive(true);
    }

    const startTimeout = () => {
        resetTimeout();
        notificationTimeoutRef.current = setTimeout(() => { if (!notificationActive) setNotificationActive(true) }, (Math.floor(Math.random() * 60)) * 1000);
    }

    function resetTimeout() {
        if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current);
        }
    }

    const checkTimer = () => {
        if (notificationTimeoutRef.current === null) {
            const randomThreshold = Math.floor(Math.random() * 3) + 3;
            getKeys();
            if (keySpans.length >= randomThreshold) startTimeout();
        }
    }

    const insertSpan = isKey => {
        if (selectedId !== null) return;
        let currentSpans = [...spans];
        const currentIndex = getIndex(currentId.current);
        max.current = max.current + 1;
        let currentMax = max.current;
        currentSpans = [
            ...currentSpans.slice(0, currentIndex + 1),
            isKey ?
                {
                    component: <TextSpan
                        id={currentMax}
                        className={'key-span'}
                        onFocus={() => { currentId.current = currentMax; setKeyInput(true) }}
                        onBlur={() => { checkTimer(); }}
                    />,
                    id: currentMax,
                } :
                {
                    component: <TextSpan
                        id={currentMax}
                        className={'text-span'}
                        onFocus={() => { currentId.current = currentMax; setKeyInput(false) }}
                        onBlur={() => { }}
                    />,
                    id: currentMax,
                },
            ...currentSpans.slice(currentIndex + 1)
        ];
        setSpans([...currentSpans]);
    }

    const submitGuess = () => {
        const guessInput = document.getElementById('guess-modal-input');
        guess.current = guessInput.value.trim();
        const spanId = `span-${selectedId}`;
        const selectedSpan = document.getElementById(spanId);
        value.current = selectedSpan.innerHTML.trim();
        setGuessModalActive(false);
        setSelectedId(null);
        selectedSpan.classList.remove("selected-span");
        document.querySelectorAll("span").forEach((span) => {
            span.contentEditable = true;
        });
        startTimeout();
        setResultModalActive(true);
    }

    return (
        <div id="wrapper" className="wrapper" style={{ paddingTop: `${guessModalActive ? '5rem' : '10px'}` }}>
            {notificationActive && <Notification openNotification={() => selectKey()} />}
            {guessModalActive && <GuessModal submitGuess={() => submitGuess()} />}
            {resultModalActive && <ResultModal guess={guess.current} value={value.current} closeModal={() => setResultModalActive(false)} />}
            <TextSpan
                id={1}
                className={'text-span'}
                onFocus={() => { currentId.current = 1; setKeyInput(false) }}
                onBlur={() => { }}
            />
            {
                spans.map((span) => {
                    return span.component;
                })
            }
            <ButtonDiv insertSpan={insertSpan} keyInput={keyInput} openInstructionsModal={() => setInstructionsModalActive(true)} />
            {instructionsModalActive && <InstructionsModal closeModal={() => { setInstructionsModalActive(false); document.getElementById(`span-${currentId.current}`).focus(); }} />}
        </div>
    );
}