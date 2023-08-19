import { useEffect } from 'react';

import './TextSpan.css';

export default function TextSpan({ id, className, onFocus, onBlur }) {
    useEffect(() => {
        document.getElementById(`span-${id}`).focus();
    }, []);

    return (
        <span
            id={`span-${id}`}
            className={className}
            contentEditable={true}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            spellCheck={false}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
}