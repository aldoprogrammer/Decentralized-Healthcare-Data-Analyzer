import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/dhda.png';
import { useAldoAlert } from 'aldo-alert';
import { HashLoader } from 'react-spinners';
import ButtonBlockchain from '../components/ButtonBlockchain';

const PrintInvoice = () => {
    const { showAldoAlert } = useAldoAlert();
    const qrCodeData = localStorage.getItem('qrCodeData');
    const qrData = qrCodeData ? JSON.parse(qrCodeData) : {};
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handlePrint = () => {
        window.print();
    };

    const handleBlockchain = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            showAldoAlert('Data stored in the blockchain successfully!', 'warning');
        }, 3000);
    }

    return (
        <div className="p-10 bg-white text-black w-4/5 mx-auto shadow-lg rounded-lg mt-5">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Patient Health Report</h1>
                <img src={Logo} alt="Logo" className="w-24 h-24" />
            </div>
            <div className="mb-5">
                <h2 className="text-lg">Name: {qrData.name}</h2>
                <h2 className="text-lg">Age: {qrData.age}</h2>
                <h2 className="text-lg">Gender: {qrData.gender}</h2>
                <h2 className="text-lg">Date: {new Date().toLocaleDateString()}</h2>
            </div>
            <div className="flex justify-center">
                <QRCode value={qrCodeData} size={200} />
            </div>
            <div className="flex gap-5 items-center justify-center">
                <div className="mt-5 flex justify-center no-print">
                    <button 
                        onClick={handlePrint} 
                        className="px-5 py-2 bg-blue-500 text-white rounded transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Print
                    </button>
                </div>
                <div className="mt-5 flex justify-center no-print">
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="px-5 py-2 bg-gray-500 text-white rounded transition duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Back
                    </button>
                </div>
                <div className="mt-5 flex justify-center no-print">
                  <ButtonBlockchain />
                </div>
            </div>
        </div>
    );
};

export default PrintInvoice;
