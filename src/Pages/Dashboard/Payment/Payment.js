import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price, slot, appointmentDate } = booking;
    // console.log(booking);
    return (
        <div>
            <h3 className="text-3xl mb-2">Payment for - <span className='text-4xl font-bold text-primary'>{treatment}</span></h3>
            <p className="text-xl">Please pay <strong>${price}</strong> for your appointment {appointmentDate} at {slot}</p>
        </div>
    );
};

export default Payment;