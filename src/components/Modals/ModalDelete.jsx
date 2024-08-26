import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { LuAlertTriangle } from "react-icons/lu";
import styles from '../../styles/Modal.module.css';

const ModalDelete = ({ show, onClose, onConfirm, title }) => {
    const [showDeletedModal, setShowDeletedModal] = useState(false);

    const handleConfirm = () => {
        onConfirm();
        setShowDeletedModal(true);
    };

    const handleCloseDeletedModal = () => {
        setShowDeletedModal(false);
        onClose();
    };

    return (
        <>
            <Modal
                dismissible
                show={show}
                onClose={onClose}
                size="2xl"
                className={`${styles.animateModalSlideDown} bg-transparent shadow-2xl p-8`}
            >
                <div className='flex mx-auto'>
                    <LuAlertTriangle
                        color="red"
                        size={70}
                    />
                </div>

                <Modal.Body>
                    <div className="space-y-6 text-center">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Apakah anda yakin menghapus activity
                            <span>
                                <strong> &quot;{title} ?&quot;</strong>
                            </span>
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='flex m-auto space-x-10'>
                        <div>
                            <Button
                                pill
                                size="lg"
                                className="bg-gray-400"
                                onClick={onClose}
                            >
                                <p className="text-lg font-medium text-black">
                                    Batal
                                </p>
                            </Button>
                        </div>
                        <div>
                            <Button
                                pill
                                size="lg"
                                className="bg-red-500"
                                onClick={handleConfirm}
                            >
                                <p className="text-lg font-medium text-white">
                                    Hapus
                                </p>
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>


            <Modal
                dismissible
                show={showDeletedModal}
                onClose={handleCloseDeletedModal}
                size="md"
                className="bg-white p-6 shadow-lg"
            >
                <Modal.Body>
                    <div className="text-center">
                        <p className="text-lg font-medium text-black">
                            Activity telah terhapus
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalDelete;
