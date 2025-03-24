import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCampers,
    incrementPage,
} from '../features/campers/campersSlice';
import CamperCard from '../components/CamperCard';
import styles from './Catalog.module.css';

export default function Catalog() {
    const dispatch = useDispatch();
    const campers = useSelector((state) => state.campers.items);
    const isLoading = useSelector((state) => state.campers.isLoading);
    const error = useSelector((state) => state.campers.error);
    const page = useSelector((state) => state.campers.page);

    const [filters, setFilters] = useState({
        location: '',
        ac: false,
        kitchen: false,
        bathroom: false,
        type: '',
    });

    useEffect(() => {
        dispatch(fetchCampers({ page }));
    }, [dispatch, page]);

    const filteredCampers = Array.isArray(campers)
        ? campers.filter((camper) => {
            if (
                !camper ||
                typeof camper !== 'object' ||
                !camper.id ||
                !camper.name
            )
                return false;

            const matchesLocation = filters.location
                ? camper.location?.toLowerCase().includes(filters.location.toLowerCase())
                : true;

            const matchesType = filters.type
                ? camper.form?.toLowerCase() === filters.type.toLowerCase()
                : true;

            const matchesAC = filters.ac ? camper.AC : true;
            const matchesKitchen = filters.kitchen ? camper.kitchen : true;
            const matchesBathroom = filters.bathroom ? camper.bathroom : true;

            return (
                matchesLocation &&
                matchesType &&
                matchesAC &&
                matchesKitchen &&
                matchesBathroom
            );
        })
        : [];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleLoadMore = () => {
        dispatch(incrementPage());
    };

    return (
        <main className={styles.catalog}>
            <aside className={styles.filters}>
                <h3>Camper Catalog</h3>

                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={filters.location}
                        onChange={handleInputChange}
                    />
                </label>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="ac"
                            checked={filters.ac}
                            onChange={handleInputChange}
                        />
                        AC
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="kitchen"
                            checked={filters.kitchen}
                            onChange={handleInputChange}
                        />
                        Kitchen
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="bathroom"
                            checked={filters.bathroom}
                            onChange={handleInputChange}
                        />
                        Bathroom
                    </label>
                </div>

                <select name="type" value={filters.type} onChange={handleInputChange}>
                    <option value="">All Types</option>
                    <option value="van">Van</option>
                    <option value="fully integrated">Fully Integrated</option>
                    <option value="alcove">Alcove</option>
                </select>
            </aside>

            <section className={styles.results}>
                {isLoading && <p>Loading...</p>}
                {error && <p className={styles.error}>Error: {error}</p>}

                {Array.isArray(filteredCampers) && filteredCampers.length > 0 ? (
                    <ul className={styles.cardList}>
                        {filteredCampers.map((camper, index) => {
                            if (
                                !camper ||
                                typeof camper !== 'object' ||
                                !camper.id ||
                                !camper.name
                            ) {
                                console.warn('❌ Camper skipped at index', index, camper);
                                return null;
                            }

                            return (
                                <li key={camper.id}>
                                    <CamperCard camper={camper} />
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    !isLoading && <p>No campers found.</p>
                )}

                {!isLoading && filteredCampers.length > 0 && (
                    <button onClick={handleLoadMore} className={styles.loadMore}>
                        Load more
                    </button>
                )}
            </section>
        </main>
    );
}
