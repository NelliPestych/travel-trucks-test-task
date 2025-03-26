import React from 'react';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const handleShowMore = () => {
        navigate(`/catalog/${id}`);
    };

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
            <button onClick={handleShowMore}>Show more</button>
        </li>
    );
};

export default CamperCard;
