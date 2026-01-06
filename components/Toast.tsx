
import React, { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                // Allow time for fade-out animation before calling onClose
                setTimeout(onClose, 300); 
            }, duration);
    
            return () => {
                clearTimeout(timer);
            };
        }
    }, [message, duration, onClose]);

    return (
        <div 
            className={`fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg text-white font-semibold transition-all duration-300 ease-in-out
            ${isVisible ? 'opacity-100 translate-y-0 bg-gray-800 dark:bg-gray-200 dark:text-gray-800' : 'opacity-0 translate-y-4'}`}
        >
            {message}
        </div>
    );
};

export default Toast;
