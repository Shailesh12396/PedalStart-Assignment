import { useState } from "react";
import { MdEdit, MdDeleteForever, MdCheck } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TaskTile({ details, onDelete }) {
    const [editingRow, setEditingRow] = useState(null);
    const [editDetails, setEditDetails] = useState([]);

    const handleUpdateClick = (index) => {
        setEditingRow(index);
        setEditDetails(details.map((detail, i) => i === index ? { ...detail } : detail));
    };

    const handleCancel = () => {
        setEditingRow(null);
    };

    const handleConfirmClick = async (index) => {
        try {
            const updatedTask = editDetails[index];
            const response = await axios.put(`http://localhost:5000/api/tasks/${updatedTask._id}`, updatedTask);
            if (response.status === 200) {
                toast.success('Updated Successfully');
                console.log('Task updated');
                setEditingRow(null);
            }
        } catch (error) {
            toast.error('Error while Updating');
            console.error("Error updating task:", error);
        }
    };

    const handleDelete = async (index) => {
        try {
            const taskToDelete = details[index];
            console.log(taskToDelete._id);
            await onDelete(taskToDelete._id);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleChange = (index, field, value) => {
        const updatedDetails = editDetails.map((detail, i) =>
            i === index ? { ...detail, [field]: value } : detail
        );
        setEditDetails(updatedDetails);
    };

    return (
        <div className="w-full ">
            {details.map((detail, index) => (
                <div key={index} className="p-4 rounded-lg shadow-md mt-3 border bg-white">
                    {editingRow === index ? (
                        <>
                            <input
                                type="text"
                                className="mt-2 font-normal text-base w-full border border-black rounded-lg px-2 py-1"
                                value={editDetails[index].title}
                                onChange={(e) => handleChange(index, "title", e.target.value)}
                            />
                            <input
                                type="text"
                                className="mt-2 font-light text-base text-gray-600 w-full border border-black rounded-lg px-2 py-1"
                                value={editDetails[index].date}
                                onChange={(e) => handleChange(index, "date", e.target.value)}
                            />
                            <textarea
                                className="mt-2 font-normal text-base w-full border border-black rounded-lg px-2 py-1"
                                value={editDetails[index].description}
                                onChange={(e) => handleChange(index, "description", e.target.value)}
                            />
                        </>
                    ) : (
                        <div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div className="mt-1 font-normal text-base">
                                    <span className="font-medium">Title:</span> {detail.title}
                                </div>
                                <div className="mt-1 font-light text-base text-gray-600">
                                    <span className="font-medium">Due Date:</span> {detail.date}
                                </div>
                            </div>
                            <div className="mt-1 font-normal text-base">
                                <span className="font-medium">Description:</span> {detail.description}
                            </div>
                        </div>
                    )}
                    <div className="text-lg font-medium whitespace-nowrap mt-2 flex justify-end gap-2">
                        {editingRow === index ? (
                            <div className="flex items-center gap-1">
                                <button className="bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center" onClick={() => handleConfirmClick(index)}><MdCheck /></button>
                                <button className="bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center" onClick={() => handleCancel(index)} ><RxCrossCircled /></button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <button className="bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center" onClick={() => handleUpdateClick(index)} ><MdEdit /></button>
                                <button className="bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center" onClick={() => handleDelete(index)} ><MdDeleteForever /></button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>

    );
}
