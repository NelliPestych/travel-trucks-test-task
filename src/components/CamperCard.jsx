import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CamperCard.module.css'

const CamperCard = ({ camper }) => {
    console.log(camper);
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
        bathroom,
        description
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
        <li className={styles.card}>
            <div>
                <img className={styles.image} src={gallery[0]?.thumb} alt={name} width={290} height={310} />
            </div>
            <div className={styles.content}>
                <div className={styles.titleRow}>                <h2 className={styles.title}>{name}</h2>
                    <p className={styles.price}>€{price}.00</p></div>
                <div className={styles.infoRow}>
                    <div>⭐ {rating} Reviews</div>
                    <div>📍 {location}</div>
                </div>
                <div className={styles.description}>{description}</div>
                <ul className={styles.tags}>
                    {features.map((feature, index) => (
                        <li className={styles.tag} key={index}>{feature}</li>
                    ))}
                </ul>
                <button className={styles.button} onClick={handleShowMore}>Show more</button>
            </div>
        </li>
    );
};

export default CamperCard;
