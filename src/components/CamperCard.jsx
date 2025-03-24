import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Link } from 'react-router-dom';
import styles from './CamperCard.module.css';

import camperDefault from '../assets/images/camper-default.jpg';

import {
    iconAC,
    iconKitchen,
    iconBathroom,
    iconTransmission,
    iconPetrol,
} from '../assets/images/icons';

export default function CamperCard({ camper }) {
    if (
        !camper ||
        typeof camper !== 'object' ||
        !camper.id ||
        !camper.name
    ) {
        console.warn('Invalid camper object:', camper);
        return null;
    }

    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.items);
    const isFavorite = favorites.includes(camper.id);

    const {
        id,
        name,
        price,
        location,
        rating,
        gallery,
        description,
        transmission,
        engine,
        kitchen,
        AC,
        bathroom,
    } = camper;

    const imageSrc =
        gallery?.[0] && gallery[0].startsWith('http')
            ? gallery[0]
            : camperDefault;

    return (
        <div className={styles.card}>
            <img
                src={imageSrc}
                alt={name}
                className={styles.image}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = camperDefault;
                }}
            />

            <div className={styles.content}>
                <div className={styles.titleRow}>
                    <h2 className={styles.title}>{name}</h2>
                    <span className={styles.price}>
            €{Number(price).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
          </span>
                </div>

                <div className={styles.infoRow}>
                    <span>⭐ {rating}</span>
                    <span>📍 {location}</span>
                </div>

                <p className={styles.description}>
                    {description.length > 120
                        ? description.slice(0, 120) + '...'
                        : description}
                </p>

                <div className={styles.tags}>
                    {transmission && (
                        <span className={styles.tag}>
              <img src={iconTransmission} alt="Transmission" width="18" height="18" />
                            {transmission}
            </span>
                    )}
                    {engine && (
                        <span className={styles.tag}>
              <img src={iconPetrol} alt="Engine" width="18" height="18" />
                            {engine}
            </span>
                    )}
                    {kitchen && (
                        <span className={styles.tag}>
              <img src={iconKitchen} alt="Kitchen" width="18" height="18" />
              Kitchen
            </span>
                    )}
                    {AC && (
                        <span className={styles.tag}>
              <img src={iconAC} alt="AC" width="18" height="18" />
              AC
            </span>
                    )}
                    {bathroom && (
                        <span className={styles.tag}>
              <img src={iconBathroom} alt="Bathroom" width="18" height="18" />
              Bathroom
            </span>
                    )}
                </div>

                <Link to={`/catalog/${id}`} target="_blank" rel="noopener noreferrer">
                    <button className={styles.button}>Show more</button>
                </Link>
            </div>

            <button
                className={styles.favorite}
                onClick={() => dispatch(toggleFavorite(camper.id))}
                aria-label="Toggle favorite"
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>
        </div>
    );
}
