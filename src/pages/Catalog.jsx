import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../features/campers/campersSlice';
import CamperCard from '../components/CamperCard';

const Catalog = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.campers);

    useEffect(() => {
        dispatch(fetchCampers({}));
    }, [dispatch]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <main>
            <h1>Camper Catalog</h1>

            {Array.isArray(items) && items.length > 0 ? (
                <ul>
                    {items.map((camper) => (
                        <CamperCard key={camper.id} camper={camper} />
                    ))}
                </ul>
            ) : (
                <p>No campers found.</p>
            )}
        </main>
    );
};

export default Catalog;
