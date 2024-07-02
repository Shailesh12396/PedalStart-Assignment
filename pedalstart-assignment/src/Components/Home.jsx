import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading]=useState(false);

    const handleTask = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitDoubt = async () => {
        console.log(date, title, description);
    }

    useEffect(() => {
        const fetchTask = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/tasks');
                console.log('fetch', response.data);
            } catch (error) {
                console.error("Error fetching notice:", error);
            }
            finally {
                setLoading(false)
            }
        };
        fetchTask();
    });

    return (
        <div>
            <div className='flex justify-between w-full'>
                <div className='text-lg font-medium'>Shailesh's Task Scheduler </div>
                <div className="mt-3 ">
                    <button className='bg-purple-400 rounded-lg shadow-md px-3 py-1 text-white' onClick={handleTask}>Create Task +</button>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-1/2">
                        <div className="flex-1 mobile:max-tablet:w-full">
                            <label className="text-lg font-normal">Title</label>
                            <input type="text" className="mt-2 border border-black rounded-lg w-full md:w-auto" value={title} onChange={((e) => setTitle(e.target.value))} />
                        </div>

                        <div className="flex-1 mobile:max-tablet:w-full">
                            <label className="text-lg font-normal">Due Date</label>
                            <input type="date" className="mt-2 border border-black rounded-lg w-full md:w-auto" value={date} onChange={((e) => setDate(e.target.value))} />
                        </div>

                        <div className="flex-1 mobile:max-tablet:w-full">
                            <label className="text-lg font-normal">Description</label>
                            <textarea className="w-full px-3 py-2 mb-4 border rounded-lg" placeholder="Write here.." rows={2} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button className="bg-gray-300 rounded-lg px-4 py-2 mr-2" onClick={handleCloseModal}>Cancel</button>
                            <button className="bg-blue-600 text-white rounded-lg px-4 py-2" onClick={handleSubmitDoubt}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home