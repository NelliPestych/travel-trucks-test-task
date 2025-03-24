// src/components/CamperCard.jsx
import React from 'react';

const CamperCard = ({ camper }) => {
    const {
        id,
        name,
        price,
        rating,
        location,
        gallery,
        transmission,
        engine,
        kitchen,
        AC,
        bathroom
    } = camper;

    const features = [
        transmission && 'Automatic',
        engine && 'Petrol',
        kitchen && 'Kitchen',
        AC && 'AC',
        bathroom && 'Bathroom'
    ].filter(Boolean);

    return (
        <li>
            <img src={gallery[0]?.thumb} alt={name} width={290} height={310} />
            <h2>{name}</h2>
            <p>€{price}.00</p>
            <p>⭐ {rating} Reviews | 📍 {location}</p>
            <ul>
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <button>Show more</button>
        </li>
    );
};

export default CamperCard;
