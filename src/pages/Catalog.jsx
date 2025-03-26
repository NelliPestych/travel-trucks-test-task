import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../features/campers/campersSlice';
import CamperCard from '../components/CamperCard';
import Filters from "../components/Filters.jsx";
import LoadMoreButton from '../components/LoadMoreButton';

const Catalog = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.campers);

    useEffect(() => {
        dispatch(fetchCampers());
    }, [dispatch]);

    return (
        <main>
            <section className={'catalog'}>
                <div className={'catalog-items'}>
                    <Filters />
                    {Array.isArray(items) && items.length > 0 ? (
                        <ul>
                            {items.map((camper) => (
                                <CamperCard key={camper.id} camper={camper} />
                            ))}
                        </ul>
                    ) : (
                        <p>No campers found.</p>
                    )}
                </div>
                <LoadMoreButton />
            </section>
        </main>
    );
};

export default Catalog;
