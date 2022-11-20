import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {

    // this is for modal section 
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    // modal close korar 
    const closeModal = () => {
        setDeletingDoctor(null);
    }

    // doctor delete korar jonno 
    const handleDeleteDoctor = (doctor) => {
        console.log(doctor);
    }


    const { data: doctors, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                // authorization part dekhte chai tai eikhane fetch er porer part ta add korsi 
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

                console.error(error);
            }
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className="text-3xl mb-5">Manage Doctors - {doctors?.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            doctors.map((doctor, i) => <tr
                                key={doctor._id}
                            >
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={doctor.image} alt='doctor' />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.speciality}</td>
                                <td>
                                    {/* The button to open modal */}
                                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error text-white">Delete</label>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete`}
                    message={`If you delete ${deletingDoctor.name},it can not be undone.`}
                    successAction={handleDeleteDoctor}
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;