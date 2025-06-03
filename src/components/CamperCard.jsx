import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../features/favorites/favoritesSlice';
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
    starEmpty,
    iconHeart,
    iconHeartActive
} from '../assets/images/icons';

const CamperCard = ({camper}) => {
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
        description,
        reviews
    } = camper;

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const favorites = useSelector(state => state?.favorites?.items || []);
    const isFavorite = favorites.includes(id);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(id));
    };

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

    const iconsObj = {
        Automatic: iconTransmission,
        Petrol: iconPetrol,
        Kitchen: iconKitchen,
        AC: iconAC,
        TV: iconTV,
        Bathroom: iconBathroom
    };

    return (
        <li className={styles.card}>
            <div>
                <img className={styles.image} src={gallery[0]?.thumb} alt={name} width={290} height={310}/>
            </div>
            <div className={styles.content}>
                <div className={styles.titleRow}>

                    <div><h2 className={styles.title}>{name}</h2></div>

                    <div className={styles.rightTitleBlock}>
                        <p className={styles.price}>€{price}</p>
                        <button onClick={handleToggleFavorite} className={styles.favoriteBtn}
                                aria-label="Add to favorites">
                            <img
                                src={`${isFavorite ? iconHeartActive : iconHeart}`}
                                alt="Favorite"
                            />
                        </button>
                    </div>

                </div>
                <div className={styles.infoRow}>
                    <div className={styles.infoRowItem}><img src={starIcon} alt="Star" width="16"
                                                             height="16"/> {rating}({reviews.length || "0"} Reviews)
                    </div>
                    <div className={styles.infoRowItem}><img src={locationIcon} alt="Location" width="16"
                                                             height="16"/> {location}</div>
                </div>
                <div
                    className={styles.description}>{description.length > 50 ? description.slice(0, 50) + '...' : description}</div>
                <ul className={styles.tags}>
                    {features.map((feature, index) => (
                        <li className={styles.tag} key={index}><img src={iconsObj[feature]} alt={styles.tag}
                                                                    width="20"/>{feature}</li>
                    ))}
                </ul>
                <button className={styles.button} onClick={handleShowMore}>Show more</button>
            </div>
        </li>
    );
};

export default CamperCard;
