import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCamperById} from '../features/campers/campersSlice';
import styles from './CamperDetails.module.css';
import Loader from '../components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

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

export default function CamperDetails() {
    const {id} = useParams();
    const dispatch = useDispatch();

    const camper = useSelector((state) => state.campers.selectedCamper);
    const status = useSelector((state) => state.campers.selectedCamperStatus);
    const error = useSelector((state) => state.campers.selectedCamperError);

    const [activeTab, setActiveTab] = useState('features');
    const [formData, setFormData] = useState({ name: '', email: '', bookingDate: '', comment: '' });
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (id) dispatch(fetchCamperById(id));
    }, [dispatch, id]);

    if (status === 'loading') return <Loader/>;
    if (status === 'failed') return <p>Error: {error}</p>;
    if (!camper) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

        if (!formData.name.trim() || !formData.email.trim() || !formData.bookingDate) {
            toast.error('Please fill in all required fields.');
            return;
        }

        if (!isEmailValid) {
            toast.error('Please enter a valid email address.');
            return;
        }

        try {
            await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
            toast.success('Camper successfully booked!');
            setFormData({ name: '', email: '', bookingDate: '', comment: '' });
            setErrorMsg('');
        } catch (err) {
            toast.error('Booking failed. Please try again.');
        }
    };

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
                <div className={styles.infoRow}>
                    <div className={styles.ratingBlock}>
                        <img src={starIcon} alt="Star" width="16" height="16" />
                        <span>{rating}</span>
                        <a className={styles.reviewsLink}>
                            ({reviews?.length || 0} Reviews)
                        </a>
                    </div>

                    <div className={styles.locationBlock}>
                        <img src={locationIcon} alt="Location" width="16" height="16" />
                        <span>{location}</span>
                    </div>
                </div>
                <span className={styles.price}>€{price}</span>
            </div>

            <div className={styles.gallery}>
                {gallery?.map((img, i) => (
                    <img key={i} src={img.original} alt={`Gallery ${i}`}/>
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

            <div className={styles.detailsWrapper}>
                {activeTab === 'features' && (

                    <div className={`${styles.featuresBox} ${styles.featuresContainer}`}>
                        <div className={styles.featuresList}>
                            {transmission && (
                                <div className={styles.feature}>
                                    <img src={iconTransmission} alt="Transmission" width="20"/> {transmission}
                                </div>
                            )}
                            {engine && (
                                <div className={styles.feature}>
                                    <img src={iconPetrol} alt="Engine" width="20"/> {engine}
                                </div>
                            )}
                            {kitchen && (
                                <div className={styles.feature}>
                                    <img src={iconKitchen} alt="Kitchen" width="20"/> Kitchen
                                </div>
                            )}
                            {AC && (
                                <div className={styles.feature}>
                                    <img src={iconAC} alt="AC" width="20"/> AC
                                </div>
                            )}
                            {bathroom && (
                                <div className={styles.feature}>
                                    <img src={iconBathroom} alt="Bathroom" width="20"/> Bathroom
                                </div>
                            )}
                            {TV && (
                                <div className={styles.feature}>
                                    <img src={iconTV} alt="TV" width="20"/> TV
                                </div>
                            )}
                            {radio && (
                                <div className={styles.feature}>
                                    <img src={iconRadio} alt="Radio" width="20"/> Radio
                                </div>
                            )}
                            {refrigerator && (
                                <div className={styles.feature}>
                                    <img src={iconFridge} alt="Refrigerator" width="20"/> Refrigerator
                                </div>
                            )}
                            {microwave && (
                                <div className={styles.feature}>
                                    <img src={iconMicrowave} alt="Microwave" width="20"/> Microwave
                                </div>
                            )}
                            {gas && (
                                <div className={styles.feature}>
                                    <img src={iconGas} alt="Gas" width="20"/> Gas
                                </div>
                            )}
                            {water && (
                                <div className={styles.feature}>
                                    <img src={iconWater} alt="Water" width="20"/> Water
                                </div>
                            )}
                        </div>

                        <div className={styles.vehicleInfo}>
                            <div className={styles.vehicleDetails}>Vehicle details</div>

                            {form && (
                                <div className={styles.vehicleInfoRow}>
                                    <span>Form</span> <span className={styles.vehicleInfoForm}>{form}</span>
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
                )}

                {activeTab === 'reviews' && (
                    <div className={`${styles.featuresBox} ${styles.reviewsBox}`}>
                        <div className={styles.reviewsList}>
                            {reviews?.map((rev, i) => (
                                <div key={i} className={styles.reviewItem}>

                                    <div className={styles.reviewContent}>
                                        <div className={styles.avatar}>
                                            {rev.reviewer_name?.charAt(0)}
                                        </div>


                                        <div className={styles.reviewerRating}>
                                            <div className={styles.reviewerName}>{rev.reviewer_name}</div>

                                            <div className={styles.stars}>
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <img
                                                        key={index}
                                                        src={index < rev.reviewer_rating ? starIcon : starEmpty}
                                                        alt="star"
                                                        width="16"
                                                        height="16"
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                    <p className={styles.comment}>{rev.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className={styles.formBox}>

                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar
                    />

                    <h3>Book your campervan now</h3>
                    <p>Stay connected! We are always ready to help you.</p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name*"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({...formData, name: e.target.value})
                            }
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({...formData, email: e.target.value})
                            }
                            required
                        />
                        <DatePicker
                            selected={formData.bookingDate ? new Date(formData.bookingDate) : null}
                            onChange={(date) => {
                                setFormData({
                                    ...formData,
                                    bookingDate: date ? date.toISOString().split('T')[0] : '',
                                });
                            }}
                            placeholderText="Booking date*"
                            dateFormat="dd.MM.yyyy"
                            className={styles.input}
                            required
                            minDate={new Date()}
                        />
                        <textarea
                            placeholder="Comment"
                            className={styles.comment}
                            value={formData.comment}
                            onChange={(e) =>
                                setFormData({...formData, comment: e.target.value})
                            }
                        />
                        <button type="submit">Send</button>
                        {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
                    </form>
                </div>
            </div>
        </section>
    );
}
