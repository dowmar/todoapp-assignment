/* eslint-disable react/prop-types */
import styles from '../../styles/Modal.module.css';
import { Button, Modal } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa6';
import Select from 'react-select';
import { useState, useEffect } from 'react';

const ModalEdit = ({ show, onClose, onConfirm, task }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [priority, setPriority] = useState({ value: 'very_high', label: 'Very High', color: '#FF0000' });

    const colorOptions = [
        { value: 'very_high', label: 'Very High', color: '#FF0000' },
        { value: 'high', label: 'High', color: '#FFA500' },
        { value: 'medium', label: 'Medium', color: '#008000' },
        { value: 'low', label: 'Low', color: '#0000FF' },
        { value: 'very_low', label: 'Very Low', color: '#800080' },
    ];

    const customStyles = {
        option: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
        }),
        singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    };

    const formatOptionLabel = ({ label, color }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
                style={{
                    backgroundColor: color,
                    borderRadius: '50%',
                    width: 10,
                    height: 10,
                    marginRight: 10,
                }}
            />
            {label}
        </div>
    );

    useEffect(() => {
        if (task) {
            setTaskTitle(task.title || '');
            setPriority(colorOptions.find(option => option.value === task.priority) || colorOptions[0]);
        }
    }, [task, show]);

    const handleSubmit = () => {
        onConfirm(taskTitle, priority.value);
        setTaskTitle('');
        setPriority(colorOptions[0]);
    };

    return (
        <Modal
            dismissible
            show={show}
            onClose={onClose}
            size="4xl"
            className={`${styles.animateModalSlideDown} shadow-xl`}
        >
            <Modal.Header>
                <p className='text-md font-semibold'>
                    Edit List Item
                </p>
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-2 mb-4">
                    <p className='text-xs font-semibold'>NAMA LIST ITEM</p>
                    <input
                        type="text"
                        className="w-full focus:ring-1 focus:ring-black focus:outline-none focus:border-gray-900 border-gray-300 rounded-md p-2"
                        placeholder='Edit nama list item'
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                </div>
                <div className='space-y-2 mb-4 w-1/4'>
                    <p className='text-xs font-semibold'>PRIORITY</p>
                    <Select
                        value={priority}
                        options={colorOptions}
                        styles={customStyles}
                        formatOptionLabel={formatOptionLabel}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        className="focus:ring-1 focus:ring-black focus:outline-none border-gray-300 rounded-md"
                        onChange={setPriority}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='flex justify-end'>
                    <Button
                        pill
                        size="lg"
                        className="bg-[#16abf8]"
                        onClick={handleSubmit}
                    >
                        <FaPlus
                            color="white"
                            className="mr-2 mt-1 w-5 h-5" />
                        <p className="text-lg font-medium text-white">
                            Simpan
                        </p>
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEdit;
