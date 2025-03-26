import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../features/campers/campersSlice';
import CamperCard from '../components/CamperCard';
import Filters from "../components/Filters.jsx";
import LoadMoreButton from '../components/LoadMoreButton';
import styles from './Catalog.module.css'

const Catalog = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.campers);

    useEffect(() => {
        dispatch(fetchCampers());
    }, [dispatch]);

    return (
        <main>
            <section className={styles.catalog}>
                <div className={styles.catalogItems}>
                    <Filters />
                    {Array.isArray(items) && items.length > 0 ? (
                        <ul className={styles.results}>
                            {items.map((camper) => (
                                <CamperCard key={camper.id} camper={camper} />
                            ))}
                        </ul>
                    ) : (
                        <p>No campers found.</p>
                    )}
                </div>
            </section>
            <LoadMoreButton />
        </main>
    );
};

export default Catalog;
