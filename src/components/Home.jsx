import useActivityHooks from "../hooks/useActivity";
import { Button } from "flowbite-react";
import { FaPlus } from "react-icons/fa6";
import { Card } from "flowbite-react";
import { TbTrash } from "react-icons/tb";
import Loading from "./Loading";
import { useState } from "react";
import ModalDelete from "./Modals/ModalDelete";


function Home() {
    const { isLoading, activities, createActivityHook, detailActivityHook, deleteActivityHook } = useActivityHooks();
    const [showModal, setShowModal] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState(null);
    const [titleToDelete, setTitleToDelete] = useState('');

    const handleDeleteClick = (id, title) => {
        setSelectedActivityId(id);
        setTitleToDelete(title);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedActivityId) {
            deleteActivityHook(selectedActivityId);
        }
        setShowModal(false);
    };

    return (
        <>
            <section className="max-w-screen-lg w-5/6 mx-auto pt-0 mt-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="font-bold text-4xl">
                        Activity
                    </h1>
                    <div className="text-center">
                        <Button
                            pill
                            size="lg"
                            className="bg-[#16abf8] px-2"
                            onClick={createActivityHook}
                        >
                            <FaPlus
                                color="white"
                                className="mr-2 mt-1 w-5 h-5" />
                            <p className="text-lg font-medium text-white">
                                Tambah
                            </p>
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loading />
                    </div>
                ) : (
                    activities.length !== 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {activities.map((activity) => (
                                <Card
                                    className="shadow-lg border-none aspect-square rounded-lg cursor-pointer flex flex-col justify-between"
                                    key={activity.id}
                                    onClick={() => {
                                        detailActivityHook(activity);
                                    }}>
                                    <div className="flex-grow">
                                        <h5 className="text-lg font-bold tracking-tight text-black">
                                            {activity.title}
                                        </h5>
                                    </div>
                                    <div className="flex-grow flex flex-col justify-end">
                                        <div className="flex justify-between">
                                            <p className="font-normal text-gray-500 text-sm">
                                                {new Date(activity.createdAt).toLocaleString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(activity.id, activity.title); }}>
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
                                onClick={createActivityHook}
                            >
                                <FaPlus
                                    color="white"
                                    className="w-6 h-6"
                                />
                            </Button>
                            <p className="text-lg font-medium text-gray-500">
                                Buatlah Activity Pertamamu
                            </p>
                        </div>
                    )
                )}
            </section >
            <ModalDelete
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                title={titleToDelete}
            />
        </>
    );
}

export default Home;
