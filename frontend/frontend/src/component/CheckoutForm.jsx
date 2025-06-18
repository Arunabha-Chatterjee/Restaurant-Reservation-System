import React, { useEffect, useState } from 'react';
import axios from 'axios';


function CheckoutForm() {
    const [bookingDate, setBookingDate] = useState('');
    const [peopleCount, setPeopleCount] = useState(1);
    const [slots, setSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        if (bookingDate) {
            fetchSlots(bookingDate);
        }
    }, [bookingDate]);

    const fetchSlots = async (date) => {
        try {
            const res = await axios.get('http://localhost:8080/get-all-table');
            const filtered = res.data.filter(slot => slot.date === date);
            setSlots(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCheckout = async () => {
        try {
            const requestBody = {
                bookingDate,
                bookingTime: selectedTime,
                peopleCount
            };

            const response = await axios.post('http://localhost:8080/checkout', requestBody, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            alert('Order placed successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to place order.');
        }
    };

    const renderTimeSlots = () => {
        const slotTimes = [];
        for (let hour = 12; hour <= 22; hour += 2) {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            const slot = slots.find(s => s.time === time);
            const booked = slot ? slot.capacity >= 100 : false;

            slotTimes.push(
                <option
                    key={time}
                    value={time}
                    disabled={booked}
                    style={{ color: booked ? 'red' : 'black' }}
                >
                    {time} {booked ? '(Full)' : ''}
                </option>
            );
        }
        return slotTimes;
    };

    return (
        <div>
            <h2>Book Table & Checkout</h2>

            <label>Booking Date:</label>
            <input
                type="date"
                value={bookingDate}
                onChange={(e) => {
                    setBookingDate(e.target.value);
                    setSelectedTime('');
                }}
            />

            <label>Time Slot:</label>
            <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
            >
                <option value="">Select Time</option>
                {renderTimeSlots()}
            </select>

            <label>People Count:</label>
            <input
                type="number"
                value={peopleCount}
                min={1}
                max={10}
                onChange={(e) => setPeopleCount(e.target.value)}
            />

            <button onClick={handleCheckout} disabled={!selectedTime || !bookingDate}>
                Place Order
            </button>
        </div>
    );
}

export default CheckoutForm;
