import useActivityHooks from "../hooks/useActivity";
import useTaskHooks from "../hooks/useTasks";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { TbPencil, TbTrash } from "react-icons/tb";
import { Button, Card, Checkbox } from "flowbite-react";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ModalTask from "./Modals/ModalTask";
import ModalDelete from "./Modals/ModalDelete";
import ModalEdit from "./Modals/ModalEdit";


function ActivityDetail() {
    const [activity, setActivity] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [submitModal, setSubmitModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [title, setTitle] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [taskTitleToDelete, setTaskTitleToDelete] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('Terbaru');



    const { updateTitleHook } = useActivityHooks();
    const { isTaskLoading, createTaskHook, deleteTaskHook, updateTaskHook } = useTaskHooks();


    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleAddClick = () => {
        setSubmitModal(true);
    };

    const handleConfirmAdd = async (taskTitle, priority) => {
        const updatedTasks = await createTaskHook(activity.id, taskTitle, priority, true);
        setActivity((prev) => ({ ...prev, tasks: updatedTasks || [] }));
        setRefreshKey(prevKey => prevKey + 1);
        setSubmitModal(false);
    };

    const handleDeleteClick = (id, taskTitle) => {
        setSelectedTaskId(id);
        setTaskTitleToDelete(taskTitle);
        setDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedTaskId) {
            await deleteTaskHook(selectedTaskId, activity.id);
            setRefreshKey(prevKey => prevKey + 1);
        }
        setDeleteModal(false);
    };


    const handleEditClick = (id) => {
        setTaskToEdit(id);
        setEditModal(true);
    };

    const handleConfirmEdit = async (title, priority) => {
        if (taskToEdit) {
            await updateTaskHook(activity.id, taskToEdit.id, title, priority, taskToEdit.isActive, taskToEdit.createdAt);
            setRefreshKey(prevKey => prevKey + 1);
        }
        setEditModal(false);
    };

    const handleCheckboxChange = async (task) => {
        await updateTaskHook(activity.id, task.id, task.title, task.priority, !task.isActive, task.createdAt);

        setRefreshKey((prevKey) => prevKey + 1);
    };

    const getColorForPriority = (priority) => {
        const colorMap = {
            very_high: '#FF0000',
            high: '#FFA500',
            medium: '#008000',
            low: '#0000FF',
            very_low: '#800080'
        };
        return colorMap[priority] || '#000000';
    };

    useEffect(() => {
        const storedActivity = localStorage.getItem('selectedActivity');
        if (storedActivity) {
            const parsedActivity = JSON.parse(storedActivity);
            setActivity({
                ...parsedActivity,
                tasks: parsedActivity.tasks || []
            });
            setTitle(parsedActivity.title);
        }
        setIsLoading(false);
    }, [refreshKey]);

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = async () => {
        setIsEditing(false);
        if (title !== activity.title) {
            await updateTitleHook(activity.id, title);
            setActivity((prev) => ({ ...prev, title }));
        }
    };



    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSortOptionClick = (sortOption) => {
        setSortOrder(sortOption);
    };

    const sortedTasks = [...(activity.tasks || [])].sort((a, b) => {
        switch (sortOrder) {
            case 'Terlama':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'A-Z':
                return a.title.localeCompare(b.title);
            case 'Z-A':
                return b.title.localeCompare(a.title);
            case 'Belum Selesai':
                if (!a.isActive && b.isActive) return -1;
                if (a.isActive && !b.isActive) return 1;
                return new Date(a.createdAt) - new Date(b.createdAt); // Oldest first
            case 'Terbaru':
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    if (!activity) {
        return <div>No activity found.</div>;
    }



    return (
        <>
            <section className="max-w-screen-lg w-5/6 mx-auto pt-0 mt-10">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex">
                        {isEditing ? (
                            <div className="flex">
                                <FaChevronLeft
                                    color="black"
                                    size={22}
                                    fontWeight="bold"
                                    className="mt-5 cursor-pointer"
                                    onClick={handleBackClick}
                                />

                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoFocus
                                    className="focus:outline-none focus:ring-0 focus:border-transparent underline underline-offset-8 text-4xl font-bold text-black bg-[#f4f4f4] leading-tight"
                                />
                                <TbPencil
                                    color="gray"
                                    size={20}
                                    inline="true"
                                />
                            </div>
                        ) : (
                            <div className="flex cursor-pointer" onClick={handleTitleClick}>
                                <FaChevronLeft
                                    color="black"
                                    size={32}
                                    fontWeight="bold"
                                    className="mt-1"
                                    onClick={handleBackClick}
                                />
                                <h1 className="text-4xl tracking-tight font-bold text-black">
                                    {activity.title}
                                </h1>
                                <TbPencil
                                    color="gray"
                                    size={32}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <button id="dropdownUserAvatarButton"
                            onClick={toggleDropdown}
                            type="button">

                            <div className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-200 dark:ring-gray-300 flex items-center justify-center">
                                <HiOutlineArrowsUpDown size={24} />
                            </div>
                        </button>
                        <div
                            id="dropdownAvatar"
                            className={`z-10 ${dropdownOpen ? 'block' : 'hidden'} absolute mt-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-gray-700 dark:divide-gray-600`}
                        >
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                <li>
                                    <a href="#" onClick={() => handleSortOptionClick('Terbaru')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Terbaru</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => handleSortOptionClick('Terlama')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Terlama</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => handleSortOptionClick('A-Z')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">A-Z</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => handleSortOptionClick('Z-A')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Z-A</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => handleSortOptionClick('Belum Selesai')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Belum Selesai</a>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center">
                            <Button
                                pill
                                size="lg"
                                className="bg-[#16abf8] px-2"
                                onClick={handleAddClick}
                            >
                                <FaPlus
                                    color="white"
                                    className="mr-2 mt-1 w-5 h-5"
                                />
                                <p className="text-lg font-medium text-white">Tambah</p>
                            </Button>
                        </div>
                    </div>
                </div>


                {isTaskLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loading />
                    </div>
                ) : (
                    sortedTasks?.length > 0 ? (
                        <div className="flex flex-col justify-between gap-6">
                            {sortedTasks.map((task) => (
                                <Card className="shadow-md"
                                    key={task.id}>
                                    <div className="flex justify-between">
                                        <div className="flex items-center space-x-5">
                                            <Checkbox id={`task-${task.id}`}
                                                checked={!task.isActive}
                                                onChange={() => handleCheckboxChange(task)} />
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: getColorForPriority(task.priority) }} />
                                            <p className={`${!task.isActive ? 'line-through' : ''}`}>
                                                {task.title}
                                            </p>
                                            <button
                                                onClick={() => handleEditClick(task)}
                                            >
                                                <TbPencil
                                                    color="gray"
                                                    size={20}
                                                    inline="true"
                                                />
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => handleDeleteClick(task.id, task.title)}>
                                                <TbTrash
                                                    color="gray"
                                                    size={22}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center text-center">
                            <Button
                                className="bg-[#16abf8] w-16 h-16 rounded-full flex items-center justify-center"
                                onClick={handleAddClick}
                            >
                                <FaPlus
                                    color="white"
                                    className="w-6 h-6"
                                />
                            </Button>
                            <p className="text-lg font-medium text-gray-500">
                                Buatlah Task Pertamamu
                            </p>
                        </div>
                    )
                )}

            </section>

            <ModalTask
                show={submitModal}
                onClose={() => setSubmitModal(false)}
                onConfirm={handleConfirmAdd}
            />
            <ModalDelete
                show={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title={taskTitleToDelete}
            />
            <ModalEdit
                show={editModal}
                onClose={() => setEditModal(false)}
                onConfirm={handleConfirmEdit}
                title={taskToEdit}
            />
        </>
    );
}

export default ActivityDetail;
