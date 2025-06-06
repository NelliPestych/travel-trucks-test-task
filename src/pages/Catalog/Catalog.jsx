import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCampers} from '../../redux/campersSlice.js';
import CamperCard from '../../components/CamperCard/CamperCard.jsx';
import Filters from "../../components/Filters/Filters.jsx";
import Loader from '../../components/Loader/Loader.jsx';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton.jsx';
import styles from './Catalog.module.css';

const Catalog = () => {
    const dispatch = useDispatch();
    const {items, status, error} = useSelector((state) => state.campers);
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        dispatch(fetchCampers());
    }, [dispatch]);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    if (status === 'loading') {
        return <Loader/>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <main>
            <section className={styles.catalog}>
                <div className={styles.catalogItems}>
                    <Filters/>
                    {Array.isArray(items) && items.length > 0 ? (
                        <ul className={styles.results}>
                            {items.slice(0, visibleCount).map((camper) => (
                                <CamperCard key={camper.id} camper={camper}/>
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.catalogItemsNotFound}>No campers found.</p>
                    )}
                </div>
            </section>

            {visibleCount < items.length && (
                <LoadMoreButton onClick={handleLoadMore}/>
            )}
        </main>
    );
};

export default Catalog;
