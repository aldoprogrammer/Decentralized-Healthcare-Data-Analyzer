import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { Input, Textarea, Button, Select, Option } from '@material-tailwind/react';
import { useAldoAlert } from 'aldo-alert';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

const Dashboard = () => {
    const { showAldoAlert } = useAldoAlert();

    const healthRisks = "Increased risk of heart disease, Higher susceptibility to respiratory infections, Higher probability of developing osteoporosis."
    const recommendPreventiveMeasures = "Maintain a balanced diet rich in fruits and vegetables, Avoid tobacco smoke and limit alcohol consumption, Ensure regular check-ups with your healthcare provider."
    const personalizedMedicine = "Paracetamol, Ibuprofen, Prednisone, Atorvastatin, Levothyroxine";
    const earlyDiseaseDetection = "Blood tests to monitor cholesterol levels and detect heart disease risk, Regular screenings for cancer, such as mammograms or colonoscopies, Regular eye exams to detect vision problems or eye diseases."
    const publicHealthMonitoring = "Follow public health guidelines regarding social distancing and mask-wearing, Report any symptoms of contagious illnesses to healthcare authorities, Advocate for policies that promote public health and safety."
    const symptoms = "this is dummy symptoms"
    const [patientDetails, setPatientDetails] = useState({
        name: '',
        age: '',
        gender: '',
        symptoms: symptoms,
        healthRisks: healthRisks,
        recommendPreventiveMeasures: recommendPreventiveMeasures,
        personalizedMedicine: personalizedMedicine,
        earlyDiseaseDetection: earlyDiseaseDetection,
        publicHealthMonitoring: publicHealthMonitoring,
    });

    const [tab, setTab] = useState('image');
    const [file, setFile] = useState(null);
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [loading, setLoading] = useState(false); // State to manage the loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails({
            ...patientDetails,
            [name]: value,
        });
    };

    const handleGenderChange = (value) => {
        setPatientDetails({
            ...patientDetails,
            gender: value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Extract necessary data for the QR code
        const { name, age, gender, symptoms, healthRisks, recommendPreventiveMeasures, personalizedMedicine, earlyDiseaseDetection, publicHealthMonitoring } = patientDetails;
        // Combine patient details into one object
        const qrData = {
            name,
            age,
            gender,
            symptoms,
            healthRisks,
            recommendPreventiveMeasures,
            personalizedMedicine,
            earlyDiseaseDetection,
            publicHealthMonitoring,
        };
        // Convert the data to a string

        const qrCodeValue = JSON.stringify(qrData);
        setLoading(true);
        setTimeout(() => {
        // Store the JSON data in local storage
        localStorage.setItem('qrCodeData', qrCodeValue);
        setQrCodeValue(qrCodeValue);
        console.log(qrCodeValue);
        setLoading(false);
        showAldoAlert("Scan disease successfully!", 'warning');
       
            // setQrCodeResult(qrCodeData);
            // setLoading(false);
        }, 3000);

       
    };






    return (
        <div className='flex flex-col'>
            <Topbar />
            <div className='flex'>
                <Sidebar />
                <div className='flex flex-col w-full p-5'>
                    <h1 className='text-xl font-semibold text-blue-gray-900'>
                        Patient's Health Consultation
                    </h1>
                    <form className='mt-5' onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <Input
                                type='text'
                                name='name'
                                label='Name'
                                value={patientDetails.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <Input
                                type='number'
                                name='age'
                                label='Age'
                                value={patientDetails.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <Select
                                label="Gender"
                                value={patientDetails.gender}
                                onChange={handleGenderChange}
                                required
                            >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </div>
                        <div className='mb-4'>
                            <h2 className='block mb-2 text-xl font-bold '>
                                Scan the Disease
                            </h2>
                            <div className='mb-4 gap-5 flex'>
                                <Button
                                    type='button'
                                    onClick={() => setTab('image')}
                                    className={tab === 'image' ? 'bg-blue-500' : ''}
                                >
                                    Upload Image
                                </Button>
                                <Button
                                    type='button'
                                    onClick={() => setTab('symptoms')}
                                    className={tab === 'symptoms' ? 'bg-blue-500' : ''}
                                >
                                    Enter Symptoms
                                </Button>
                            </div>
                            {tab === 'image' ? (
                                <div className='mb-4'>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Upload File</label>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                    />
                                </div>
                            ) : (
                                <Textarea
                                    name='symptoms'
                                    label='Symptoms'
                                    value={patientDetails.symptoms}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                        <Button type='submit'>
                        {loading ? <ScaleLoader color='#ffffff' loading={loading} height={16} width={6} radius={2} margin={3} />
                            : "Submit"}
                            </Button>
                    </form>
                    {qrCodeValue && (
                        <div className='mt-5'>
                            <h2 className='text-lg font-semibold'>Generated QR Code:</h2>
                            <QRCode value={qrCodeValue} />
                            <Link to='/print-invoice'>
                                <Button type='button' className='mt-5'>Print</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
