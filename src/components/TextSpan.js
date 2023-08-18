import { useEffect, useState } from 'react';

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
            autoCapitalize="false"
            autoCorrect="false"
            spellCheck="false"
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
}