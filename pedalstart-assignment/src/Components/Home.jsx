import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskTile from './TaskTile';
import Loading from '../Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState([]);

    const handleTask = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Reset the input fields when closing the modal
        setDate('');
        setTitle('');
        setDescription('');
    };

    const handleSubmit = async () => {
        console.log(date, title, description);
        try {
            const response = await axios.post('http://localhost:5000/api/tasks', {
                title: title,
                date: date,
                description: description
            });

            console.log('API Response:', response.data);

            if (response.status === 201 ) {
                setDetails(prevDetails => [...prevDetails, response.data]);
                handleCloseModal();
                toast.success('Successfully Submitted');
                console.log('Successfully created');
            } else {
                console.error('Unexpected response structure:', response);
                toast.error('Unexpected response structure');
            }

        } catch (error) {
            toast.error('Error while creating task');
            console.error("Error creating task:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            if (response.status === 200) {
                toast.success('Successfully Deleted');
                setDetails(prevDetails => prevDetails.filter(task => task._id !== id));
                console.log('Task deleted');
            }
        } catch (error) {
            toast.error('Error while deleting');
            console.error("Error deleting task:", error);
        }
    };

    useEffect(() => {
        const fetchTask = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/tasks');
                if (response.status === 200) {
                    setDetails(response.data);
                    console.log('Fetched tasks:', response.data);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, []);

    return (
        <div className='border border-gray-200 shadow-md rounded-lg'>
            <div className='flex flex-col sm:flex-row justify-between items-center p-2'>
                <div className='text-lg font-medium'>Shailesh's Task Scheduler</div>
                <div className="mt-3 sm:mt-0">
                    <button className='bg-purple-400 whitespace-nowrap rounded-lg shadow-md px-3 py-1 text-white' onClick={handleTask}>Create Task +</button>
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : details.length === 0 ? (
                <div className='w-full mt-2 text-center'>Tasks not created yet</div>
            ) : (
                <TaskTile details={details} onDelete={handleDelete} />
            )}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-2xl mx-4 sm:mx-auto">
                        <div className="space-y-4">
                            <div className="space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                                <div className="flex-1">
                                    <label className="text-lg font-normal">Title :</label>
                                    <input type="text" className="mt-1 border border-black rounded-lg w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="flex-1">
                                    <label className="text-lg font-normal">Due Date :</label>
                                    <input type="date" className="mt-1 border border-black rounded-lg w-full" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="text-lg font-normal">Description</label>
                                <textarea className="mt-1 w-full px-3 py-2 border border-black rounded-lg" placeholder="Write here.." rows={2} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button className="bg-gray-300 rounded-lg px-4 py-2" onClick={handleCloseModal}>Cancel</button>
                                <button className="bg-blue-600 text-white rounded-lg px-4 py-2" onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Home;
