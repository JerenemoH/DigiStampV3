
import React, { useState, useEffect, useCallback } from 'react';
import StampSlot from './components/StampSlot';
import Header from './components/Header';
import Toast from './components/Toast';
import QRCodeGenerator from './components/QRCodeGenerator';
import PasswordModal from './components/PasswordModal';

const TOTAL_STAMPS = 6;
const STORAGE_KEY = 'myStamps';
const ADMIN_PASSWORD = '423609';

type View = 'stamps' | 'qr';

const App: React.FC = () => {
    const [collectedStamps, setCollectedStamps] = useState<number[]>([]);
    const [notification, setNotification] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [view, setView] = useState<View>('stamps');
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    useEffect(() => {
        // 1. Load from localStorage on initial mount
        try {
            const savedStamps = localStorage.getItem(STORAGE_KEY);
            if (savedStamps) {
                const parsedStamps: number[] = JSON.parse(savedStamps);
                setCollectedStamps(parsedStamps);
            }
        } catch (error) {
            console.error("Failed to parse stamps from localStorage", error);
        }
        setIsInitialized(true);
    }, []);

    const showNotification = (message: string) => {
        setNotification(message);
    };

    const handleStampCollection = useCallback((pointToStamp: number) => {
        if (!collectedStamps.includes(pointToStamp)) {
            const newStamps = [...collectedStamps, pointToStamp].sort((a, b) => a - b);
            setCollectedStamps(newStamps);
            showNotification(`成功集到第 ${pointToStamp} 個章！`);
        }
    }, [collectedStamps]);


    useEffect(() => {
        if (!isInitialized) return;
        
        // 2. Process URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const pointParam = urlParams.get('point');
        
        if (pointParam) {
            const pointToStamp = parseInt(pointParam, 10);
            if (!isNaN(pointToStamp) && pointToStamp > 0 && pointToStamp <= TOTAL_STAMPS) {
                handleStampCollection(pointToStamp);
            } else {
                 showNotification(`無效的集章點: ${pointParam}`);
            }
            // Clean the URL to prevent re-stamping on refresh
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [isInitialized, handleStampCollection]);

    useEffect(() => {
        if (!isInitialized) return;
        
        // 3. Save to localStorage whenever stamps change
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedStamps));
        } catch (error) {
            console.error("Failed to save stamps to localStorage", error);
        }
    }, [collectedStamps, isInitialized]);
    
    const resetStamps = () => {
        setCollectedStamps([]);
        showNotification("集章紀錄已重設！");
    };

    const handleQRCodeAccess = () => {
        setIsPasswordModalOpen(true);
    };

    const handlePasswordSubmit = (password: string) => {
        if (password === ADMIN_PASSWORD) {
            setView('qr');
        } else {
            showNotification("密碼錯誤！");
        }
        setIsPasswordModalOpen(false);
    };

    const allStampsCollected = collectedStamps.length === TOTAL_STAMPS;

    if (view === 'qr') {
        return <QRCodeGenerator 
                    baseUrl="https://digistampv3.netlify.app/" 
                    totalStamps={TOTAL_STAMPS} 
                    onBack={() => setView('stamps')} 
                />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
            <div className="w-full max-w-2xl mx-auto">
                <Header />
                
                {allStampsCollected && (
                     <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-lg mb-6 text-center" role="alert">
                        <p className="font-bold text-lg">恭喜！</p>
                        <p>您已集滿所有印章！</p>
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    {[...Array(TOTAL_STAMPS).keys()].map(i => {
                        const stampNumber = i + 1;
                        return (
                            <StampSlot
                                key={stampNumber}
                                number={stampNumber}
                                isStamped={collectedStamps.includes(stampNumber)}
                            />
                        );
                    })}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
                     <button
                        onClick={handleQRCodeAccess}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        展示 QR Code (需密碼)
                    </button>
                     <button
                        onClick={resetStamps}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        重設集章紀錄
                    </button>
                </div>
            </div>
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSubmit={handlePasswordSubmit}
            />
             {notification && (
                <Toast 
                    message={notification} 
                    onClose={() => setNotification(null)} 
                />
            )}
        </div>
    );
};

export default App;
