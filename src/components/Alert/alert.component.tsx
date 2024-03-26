import React from 'react';
import './alert.styles.scss';

interface CustomAlertProps {
    alert: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ alert }) => {
    return (
        <div className="custom-alert">
            <div className="icon-container" id="error-icon">
                <div className="icon" title="error-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </div>
            <div className="message">{alert}</div>
        </div>
    );
};

export default CustomAlert;
