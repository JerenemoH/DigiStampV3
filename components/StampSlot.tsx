
import React from 'react';

interface StampSlotProps {
    number: number;
    isStamped: boolean;
}

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
    >
        <path 
            fillRule="evenodd" 
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z" 
            clipRule="evenodd" 
        />
    </svg>
);


const StampSlot: React.FC<StampSlotProps> = ({ number, isStamped }) => {
    const baseClasses = "aspect-square w-full rounded-2xl flex flex-col items-center justify-center text-3xl font-bold transition-all duration-500 ease-in-out transform";
    
    const unstampedClasses = "bg-white dark:bg-gray-700 border-4 border-dashed border-gray-300 dark:border-gray-500 text-gray-400 dark:text-gray-500 hover:border-blue-400 hover:text-blue-500";
    
    const stampedClasses = `bg-yellow-100 dark:bg-yellow-900/50 border-4 border-solid border-yellow-500 dark:border-yellow-400 text-yellow-600 dark:text-yellow-300 shadow-lg scale-105`;

    return (
        <div className={`${baseClasses} ${isStamped ? stampedClasses : unstampedClasses}`}>
            {isStamped ? (
                 <div className="text-center relative">
                    <StarIcon className="w-16 h-16 text-yellow-500 dark:text-yellow-400 opacity-80" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white dark:text-gray-900 text-2xl font-black">
                        {number}
                    </span>
                </div>
            ) : (
                <span>{number}</span>
            )}
        </div>
    );
};

export default StampSlot;
