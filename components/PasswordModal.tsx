
import React, { useState, useEffect, useRef } from 'react';

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (password: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [password, setPassword] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Focus the input when the modal opens
            inputRef.current?.focus();
        } else {
            // Reset password when modal closes
            setPassword('');
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(password);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity"
            onClick={onClose} // Close on backdrop click
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm m-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">
                    請輸入密碼
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                    此區域需要管理員權限
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            ref={inputRef}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                        >
                            確認
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordModal;
