
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
    baseUrl: string;
    totalStamps: number;
    onBack: () => void;
}

interface QRData {
    id: number;
    url: string;
    dataUrl: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ baseUrl, totalStamps, onBack }) => {
    const [qrCodes, setQrCodes] = useState<QRData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const generateQRCodes = async () => {
            const generatedCodes: QRData[] = [];
            for (let i = 1; i <= totalStamps; i++) {
                const fullUrl = `${baseUrl}?point=${i}`;
                try {
                    const dataUrl = await QRCode.toDataURL(fullUrl, {
                        errorCorrectionLevel: 'H',
                        type: 'image/png',
                        quality: 0.9,
                        margin: 1,
                        width: 256
                    });
                    generatedCodes.push({ id: i, url: fullUrl, dataUrl });
                } catch (err) {
                    console.error(`Failed to generate QR code for point ${i}`, err);
                }
            }
            setQrCodes(generatedCodes);
            setIsLoading(false);
        };

        generateQRCodes();
    }, [baseUrl, totalStamps]);

    return (
        <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
            <div className="w-full max-w-4xl mx-auto">
                <header className="text-center mb-8 relative">
                    <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg transition-colors">
                        &larr; 返回
                    </button>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-400">
                        QR Code 產生器
                    </h1>
                </header>

                {isLoading ? (
                    <div className="text-center">
                        <p className="text-lg text-gray-500 dark:text-gray-400">正在產生 QR Code...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {qrCodes.map(qr => (
                            <div key={qr.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
                                <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">集章點 {qr.id}</h2>
                                <div className="p-2 bg-white rounded-lg mb-4">
                                    <img src={qr.dataUrl} alt={`QR Code for stamp point ${qr.id}`} className="w-48 h-48" />
                                </div>
                                <a 
                                    href={qr.dataUrl} 
                                    download={`stamp_point_${qr.id}.png`}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mt-auto"
                                >
                                    下載
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRCodeGenerator;
