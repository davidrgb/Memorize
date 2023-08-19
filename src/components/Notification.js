import { createPortal } from 'react-dom';

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import './Button.css';

import './Notification.css';

export default function Notification({ openNotification }) {
    return createPortal(
        <button className="notification border-button" onClick={() => openNotification()}><PriorityHighIcon /></button>,
        document.body,
    )
}