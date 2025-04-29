import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CamperCard.module.css';

import {
    iconAC,
    iconBathroom,
    iconKitchen,
    iconTV,
    iconRadio,
    iconFridge,
    iconMicrowave,
    iconGas,
    iconWater,
    iconTransmission,
    iconPetrol,
    locationIcon,
    starIcon,
    starEmpty
} from '../assets/images/icons';

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
        TV,
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
        TV && 'TV',
        bathroom && 'Bathroom'
    ].filter(Boolean);

    const iconArr = [iconTransmission, iconPetrol, iconKitchen, iconAC, iconTV, iconBathroom];

    return (
        <li className={styles.card}>
            <div>
                <img className={styles.image} src={gallery[0]?.thumb} alt={name} width={290} height={310} />
            </div>
            <div className={styles.content}>
                <div className={styles.titleRow}>                <h2 className={styles.title}>{name}</h2>
                    <p className={styles.price}>€{price}.00</p></div>
                <div className={styles.infoRow}>
                    <div className={styles.infoRowItem}><img src={starIcon} alt="Star" width="16" height="16" /> {rating} Reviews</div>
                    <div className={styles.infoRowItem}><img src={locationIcon} alt="Location" width="16" height="16" /> {location}</div>
                </div>
                <div className={styles.description}>{description}</div>
                <ul className={styles.tags}>
                    {features.map((feature, index) => (
                        <li className={styles.tag} key={index}><img src={iconArr[index]} alt={styles.tag} width="20"/>{feature}</li>
                    ))}
                </ul>
                <button className={styles.button} onClick={handleShowMore}>Show more</button>
            </div>
        </li>
    );
};

export default CamperCard;
