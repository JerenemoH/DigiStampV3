
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-2">
                我的電子集章冊
            </h1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400">
                掃描 QR Code 來收集所有的印章吧！
            </p>
        </header>
    );
};

export default Header;
