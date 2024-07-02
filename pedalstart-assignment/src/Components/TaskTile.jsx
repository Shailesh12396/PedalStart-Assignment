import { useState } from "react";
import { MdEdit, MdDeleteForever, MdCheck } from "react-icons/md";
import axios from "axios";

export default function TaskTile({ details }) {
    const [editingRow, setEditingRow] = useState(null);
    const [editDetails, setEditDetails] = useState([]);

    const handleUpdateClick = (index) => {
        setEditingRow(index);
        setEditDetails(details.map((detail, i) => i === index ? { ...detail } : detail));
    };

    const handleConfirmClick = async (index) => {
        try {
            const updatedTask = editDetails[index];
            const response = await axios.put(`http://localhost:5000/api/tasks/${updatedTask._id}`, updatedTask);
            if (response.status === 200) {
                console.log('taskupdated');
                setEditingRow(null);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDelete = async (index) => {
        try {
            const taskToDelete = details[index];
            console.log(taskToDelete._id)
            const response = await axios.delete(`http://localhost:5000/api/tasks/${taskToDelete._id}`);
            if (response.status === 200) {
                console.log('taskdeleted');
            }
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
        <div className="w-full">
            {details.map((detail, index) => (
                <div key={index} className="p-2 border justify-between rounded-lg shadow-md mt-3 flex items-center">
                    <div className="flex items-center w-full">
                        <div className="px-2 w-full">
                            {editingRow === index ? (
                                <>
                                    <input
                                        type="text"
                                        className="pl-2 mt-1 font-normal text-sm w-full"
                                        value={editDetails[index].title}
                                        onChange={(e) => handleChange(index, "title", e.target.value)}
                                    />
                                    <textarea
                                        className="pl-2 mt-1 font-normal text-sm w-full"
                                        value={editDetails[index].description}
                                        onChange={(e) => handleChange(index, "description", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="pl-2 mt-1 font-light text-xs text-gray-600 w-full"
                                        value={editDetails[index].date}
                                        onChange={(e) => handleChange(index, "date", e.target.value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="pl-2 mt-1 font-normal text-sm">
                                        <span className="font-medium">Title :</span> {detail.title}
                                    </div>
                                    <div className="pl-2 mt-1 font-normal text-sm">
                                        <span className="font-medium">Description :</span> {detail.description}
                                    </div>
                                    <div className="pl-2 mt-1 font-light text-xs text-gray-600">
                                        {detail.date}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="w-36 text-lg font-medium mobile:max-tablet:text-sm mobile:max-tablet:font-sm whitespace-nowrap">
                        {editingRow === index ? (
                            <button
                                className="bg-green-400 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
                                onClick={() => handleConfirmClick(index)}
                            >
                                <MdCheck />
                            </button>
                        ) : (
                            <div className="flex items-center gap-1">
                                <button
                                    className="bg-blue-400 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
                                    onClick={() => handleUpdateClick(index)}
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    className="bg-red-400 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-md flex items-center"
                                    onClick={() => handleDelete(index)}
                                >
                                    <MdDeleteForever />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
