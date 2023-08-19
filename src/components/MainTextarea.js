import './MainTextarea.css';

export default function MainTextarea() {
    const placeholderText = `Begin typing here and press the button once before a key word or phrase, then again to return to normal text. Periodically, you'll be prompted to retype the keys, whether it be a missing letter or the entire phrase.`;

    return (
        <div id="textarea" contentEditable={true} data-text={placeholderText} autoCapitalize="false" autoCorrect="false" spellCheck="false"></div>
    );
}