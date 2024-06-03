import React, { useEffect, useRef, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { Button } from '@material-tailwind/react';
import QrCode from 'qrcode-reader';
import Logo from '../assets/dhda.png';
import { ScaleLoader } from 'react-spinners';
import { useAldoAlert } from 'aldo-alert';
import ButtonBlockchain from '../components/ButtonBlockchain';
import QrScanner from 'qr-scanner';

// Printable content component
const PrintableContent = ({ qrCodeResult, formattedDateTime }) => (
    <div className='mt-5 bg-white rounded-lg shadow-md p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
            <div className='relative'>
                <h1 className="text-2xl font-bold">Patient Health Report</h1>
                <img src={Logo} alt="Logo" className="w-24 h-24 absolute top-[-1.5rem] left-[236px]" />
            </div>
            <div className='flex flex-col'>
                <p className='text-sm font-semibold text-black'>Patients Name:</p>
                <p className='text-base text-gray-800'>{JSON.parse(qrCodeResult).name}</p>
            </div>
            <div className='flex flex-col'>
                <p className='text-sm font-semibold text-black'>Age:</p>
                <p className='text-base text-gray-800'>{JSON.parse(qrCodeResult).age}</p>
            </div>
            <div className='flex flex-col'>
                <p className='text-sm font-semibold text-black'>Gender:</p>
                <p className='text-base text-gray-800'>{JSON.parse(qrCodeResult).gender}</p>
            </div>
            <div className='flex flex-col'>
                <p className='text-sm font-semibold text-black'>Dates:</p>
                <p className='text-base text-gray-800'>{formattedDateTime}</p>
            </div>
            <div className='flex flex-col'>
                <p className='text-sm font-semibold text-black'>Health Risks:</p>
                <p className='text-base text-gray-800'>{JSON.parse(qrCodeResult).healthRisks}</p>
            </div>
            <div className='flex flex-col'>
                <p className='text-sm font-semibold text-black'>Recommend Preventive Measures:</p>
                <p className='text-base text-gray-800'>{JSON.parse(qrCodeResult).recommendPreventiveMeasures}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col'>
                    <p className='text-sm font-semibold text-black'>Personalized Medicine:</p>
                    <p className='text-base text-gray-800'>{JSON.parse(qrCodeResult).personalizedMedicine}</p>
                </div>
                <div className='flex flex-col'>
                    <p className='text-sm font-semibold text-black'>Note:</p>
                    <p className='text-base text-gray-800'>Drink this medicine 3 times a day, after eating.</p>
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='text-sm font-semibold text-black'>Early Disease Detection:</p>
                <p className='text-base text-gray-800'>{JSON.parse(qrCodeResult).earlyDiseaseDetection}</p>
            </div>
            <div className='flex flex-col'>
                <p className='text-sm font-semibold text-black'>Public Health Monitoring:</p>
                <p className='text-base text-gray-800'>{JSON.parse(qrCodeResult).publicHealthMonitoring}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col'>
                    <p className='text-sm font-semibold text-black'>Total Payment</p>
                    <p className='text-base text-gray-800'>30$</p>
                </div>
                <div className='flex flex-col'>
                    <p className='text-sm font-semibold text-black'>Signature</p>
                    <p className='text-base text-gray-800'>Admin DHDA Hospital</p>
                </div>
            </div>
        </div>
    </div>
);

const Medichine = () => {
    const [qrCodeResult, setQrCodeResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    const videoRef = useRef();
    const currentDate = new Date();
    const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = currentDate.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions);
    const formattedDateTime = `${formattedDate} / ${formattedTime}`;
    const { showAldoAlert } = useAldoAlert();

    const handlePrint = () => {
        const printableContent = document.getElementById('printable-content');
        if (printableContent) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Invoice Patients</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    <style>
                        .mt-5 {
                            margin-top: 1.25rem;
                        }
                        .bg-white {
                            background-color: #fff;
                        }
                        .rounded-lg {
                            border-radius: 0.5rem;
                        }
                        .shadow-md {
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .p-6 {
                            padding: 1.5rem;
                        }
                        .text-lg {
                            font-size: 1.125rem;
                        }
                        .font-semibold {
                            font-weight: 600;
                        }
                        .mb-4 {
                            margin-bottom: 1rem;
                        }
                    </style>
                </head>
                <body>
                    <div id="printable-content" class="mt-5 bg-white rounded-lg shadow-md p-6">
                        ${printableContent.innerHTML}
                    </div>
                    <script>
                        window.onload = function() {
                            window.print();
                        }
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const handleScanClick = () => {
        const qrCodeData = localStorage.getItem('qrCodeData');
        if (!qrCodeData) {
            console.error('QR code data not found in local storage');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setQrCodeResult(qrCodeData);
            setLoading(false);
        }, 3000);
    };

    const toggleCamera = () => {
        setCameraOpen(prevState => !prevState);
    };

    const handleBlockchain = () => {
        showAldoAlert('Data stored in the blockchain successfully!', 'warning');
    };

    const handleQRCodeScanned = result => {
        setQrCodeResult(result.data);
    };

    const startScanner = async () => {
        try {
            const scanner = new QrScanner(videoRef.current, result => {
                handleQRCodeScanned(result);
                scanner.stop();
            });
            scanner.start();
        } catch (error) {
            console.error('Error starting QR scanner:', error);
        }
    };

    useEffect(() => {
        if (cameraOpen) {
            startScanner();
        }
    }, [cameraOpen]);

    return (
        <div className='flex flex-col'>
            <Topbar />
            <div className='flex'>
                <Sidebar />
                <div className='flex flex-col w-full p-5'>
                    <h1 className='text-xl font-semibold text-blue-gray-900'>
                        Medicine Store
                    </h1>
                    <div className='mt-5 flex gap-4 items-center'>
                        <input
                            type="file"
                            accept="image/*"
                        />
                        <Button onClick={toggleCamera}>
                            {cameraOpen ? 'Close Camera' : 'Camera Scanner'}
                        </Button>
                    </div>
                    {cameraOpen && (
                        <div className='mt-5 flex gap-4'>
                            <video ref={videoRef} style={{ width: '60%', height: '300px', marginLeft: 'auto', marginRight: 'auto' }}></video>
                        </div>
                    )}
                    <Button className='mt-5 focus:opacity-[200]' onClick={handleScanClick}>
                        {loading ? <ScaleLoader color='#ffffff' loading={loading} height={16} width={6} radius={2} margin={3} />
                            : "Image Scanner"}
                    </Button>

                    <Button className='mt-5' onClick={() => setQrCodeResult('')}>
                        Clear
                    </Button>

                    {qrCodeResult && (
                        <>
                            <h2 className='text-lg font-semibold my-4'>Scanned QR Code:</h2>
                            <div id="printable-content">
                                <PrintableContent qrCodeResult={qrCodeResult} formattedDateTime={formattedDateTime} />
                            </div>
                            <div className='flex gap-3 items-center mt-5'>
                                <Button className='w-fit no-print' onClick={handlePrint}>
                                    Print
                                </Button>
                                <ButtonBlockchain />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Medichine;
