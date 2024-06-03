import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { Input, Textarea, Button, Select, Option } from '@material-tailwind/react';
import { useAldoAlert } from 'aldo-alert';
import QRCode from 'qrcode.react';

const Dashboard = () => {
    const { showAldoAlert } = useAldoAlert();

    const healthRisks = "predict health risks"
    const recommendPreventiveMeasures = "to recommend preventive measures to the patient. " 
    const personalizedMedicine = "this is dummy medicnie"
    const earlyDiseaseDetection = "this is dummy disease"
    const publicHealthMonitoring = "please dont go to crowsed places"

    const [patientDetails, setPatientDetails] = useState({
        name: '',
        age: '',
        gender: '',
        symptoms: '',
        healthRisks: healthRisks,
        recommendPreventiveMeasures: recommendPreventiveMeasures,
        personalizedMedicine: personalizedMedicine,
        earlyDiseaseDetection: earlyDiseaseDetection,
        publicHealthMonitoring: publicHealthMonitoring,
    });
    const [tab, setTab] = useState('image');
    const [file, setFile] = useState(null);
    const [qrCodeValue, setQrCodeValue] = useState('');

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
        const { name, age, gender, symptoms, healthRisks, recommendPreventiveMeasures, personalizedMedicine   } = patientDetails;
        // Combine patient details into one object
        const qrData = {
            name,
            age,
            gender,
            symptoms,
            healthRisks,
            recommendPreventiveMeasures,
            personalizedMedicine
        };
        // Convert the data to a string
        const qrCodeValue = JSON.stringify(qrData);
        setQrCodeValue(qrCodeValue);
        console.log(qrCodeValue);
    
        showAldoAlert("Scan disease successfully!", 'success');
    };
    
    
    


    return (
        <div className='flex flex-col'>
            <Topbar />
            <div className='flex'>
                <Sidebar />
                <div className='flex flex-col w-full p-5'>
                    <h1 className='text-xl font-semibold text-blue-gray-900'>
                        Input Patients
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
                        <Button type='submit'>Submit</Button>
                    </form>
                    {qrCodeValue && (
                        <div className='mt-5'>
                            <h2 className='text-lg font-semibold'>Generated QR Code:</h2>
                            <QRCode value={qrCodeValue} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
