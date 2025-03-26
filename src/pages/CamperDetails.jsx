import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CamperDetails.module.css';
import Loader from '../components/Loader';

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
} from '../assets/images/icons';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export default function CamperDetails() {
    const { id } = useParams();
    const [camper, setCamper] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('features');

    const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchCamper = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/${id}`);
                setCamper(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCamper();
    }, [id]);

    if (isLoading) return <Loader />;
    if (error) return <p>Error: {error}</p>;
    if (!camper) return null;

    const {
        name,
        description,
        gallery,
        price,
        rating,
        location,
        reviews,
        form,
        length,
        width,
        height,
        tank,
        consumption,
        transmission,
        engine,
        AC,
        bathroom,
        kitchen,
        TV,
        radio,
        refrigerator,
        microwave,
        gas,
        water,
    } = camper;

    return (
        <section className={styles.container}>
            <div className={styles.titleRow}>
                <h1 className={styles.title}>{name}</h1>
                <span className={styles.price}>
          €{Number(price).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
        </span>
            </div>

            <div className={styles.gallery}>
                {gallery?.map((img, i) => (
                    <img key={i} src={img.original} alt={`Gallery ${i}`} />
                ))}
            </div>

            <p className={styles.description}>{description}</p>

            <div className={styles.tabs}>
                <div
                    className={`${styles.tab} ${activeTab === 'features' ? styles.active : ''}`}
                    onClick={() => setActiveTab('features')}
                >
                    Features
                </div>
                <div
                    className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews
                </div>
            </div>

            {activeTab === 'features' && (
                <div className={styles.detailsWrapper}>
                    <div className={styles.featuresBox}>
                        <div className={styles.featuresList}>
                            {transmission && (
                                <div className={styles.feature}>
                                    <img src={iconTransmission} alt="Transmission" width="20" /> {transmission}
                                </div>
                            )}
                            {engine && (
                                <div className={styles.feature}>
                                    <img src={iconPetrol} alt="Engine" width="20" /> {engine}
                                </div>
                            )}
                            {kitchen && (
                                <div className={styles.feature}>
                                    <img src={iconKitchen} alt="Kitchen" width="20" /> Kitchen
                                </div>
                            )}
                            {AC && (
                                <div className={styles.feature}>
                                    <img src={iconAC} alt="AC" width="20" /> AC
                                </div>
                            )}
                            {bathroom && (
                                <div className={styles.feature}>
                                    <img src={iconBathroom} alt="Bathroom" width="20" /> Bathroom
                                </div>
                            )}
                            {TV && (
                                <div className={styles.feature}>
                                    <img src={iconTV} alt="TV" width="20" /> TV
                                </div>
                            )}
                            {radio && (
                                <div className={styles.feature}>
                                    <img src={iconRadio} alt="Radio" width="20" /> Radio
                                </div>
                            )}
                            {refrigerator && (
                                <div className={styles.feature}>
                                    <img src={iconFridge} alt="Refrigerator" width="20" /> Refrigerator
                                </div>
                            )}
                            {microwave && (
                                <div className={styles.feature}>
                                    <img src={iconMicrowave} alt="Microwave" width="20" /> Microwave
                                </div>
                            )}
                            {gas && (
                                <div className={styles.feature}>
                                    <img src={iconGas} alt="Gas" width="20" /> Gas
                                </div>
                            )}
                            {water && (
                                <div className={styles.feature}>
                                    <img src={iconWater} alt="Water" width="20" /> Water
                                </div>
                            )}
                        </div>

                        <div className={styles.vehicleInfo}>
                            {form && (
                                <div className={styles.vehicleInfoRow}>
                                    <span>Form</span> <span>{form}</span>
                                </div>
                            )}
                            {length && (
                                <div className={styles.vehicleInfoRow}>
                                    <span>Length</span> <span>{length}</span>
                                </div>
                            )}
                            {width && (
                                <div className={styles.vehicleInfoRow}>
                                    <span>Width</span> <span>{width}</span>
                                </div>
                            )}
                            {height && (
                                <div className={styles.vehicleInfoRow}>
                                    <span>Height</span> <span>{height}</span>
                                </div>
                            )}
                            {tank && (
                                <div className={styles.vehicleInfoRow}>
                                    <span>Tank</span> <span>{tank}</span>
                                </div>
                            )}
                            {consumption && (
                                <div className={styles.vehicleInfoRow}>
                                    <span>Consumption</span> <span>{consumption}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.formBox}>
                        <h3>Book your campervan now</h3>
                        <p>Stay connected! We are always ready to help you.</p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const hasError =
                                    !formData.name.trim() || !/^[\d\s()+-]+$/.test(formData.phone);
                                if (hasError) {
                                    setErrorMsg('Please fill in all required fields correctly.');
                                    return;
                                }

                                setErrorMsg('');
                                alert('Camper successfully booked!');
                                setFormData({ name: '', phone: '', comment: '' });
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                required
                            />
                            <textarea
                                placeholder="Comment (optional)"
                                value={formData.comment}
                                onChange={(e) =>
                                    setFormData({ ...formData, comment: e.target.value })
                                }
                            />
                            <button type="submit">Send</button>
                            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className={styles.reviewsList}>
                    {reviews?.map((rev, i) => (
                        <div key={i} className={styles.reviewItem}>
                            <span className={styles.reviewerName}>{rev.reviewer_name}</span>
                            <span>{'⭐'.repeat(rev.reviewer_rating)}</span>
                            <p>{rev.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
