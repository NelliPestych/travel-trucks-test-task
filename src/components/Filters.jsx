import { useDispatch, useSelector } from 'react-redux';
import {
    setLocation,
    setVehicleType,
    toggleOption,
} from '../features/filters/filtersSlice';
import styles from './Filters.module.css';
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
    iconVan,
    iconFull,
    iconAlcove,
    locationIcon
} from '../assets/images/icons';
import { filterCampers, clearCampers } from '../features/campers/campersSlice';

const optionLabels = {
    ac: {
        label: 'AC',
        icon: iconAC
    },
    automatic: {
        label: 'Automatic',
        icon: iconTransmission
    },
    kitchen: {
        label: 'Kitchen',
        icon: iconKitchen
    },
    tv: {
        label: 'TV',
        icon: iconTV
    },
    bathroom: {
        label: 'Bathroom',
        icon: iconBathroom
    }
};

const vehicleTypes = ['panelTruck', 'fullyIntegrated', 'alcove'];
const vehicleTypeLabels = {
    panelTruck: {
        label: 'Van',
        icon: iconVan
    },
    fullyIntegrated: {
        label: 'Fully Integrated',
        icon: iconFull
    },
    alcove: {
        label: 'Alcove',
        icon: iconAlcove
    }
};

export default function Filters() {
    const dispatch = useDispatch();
    const { location, vehicleType, options } = useSelector((state) => state.filters);

    console.log(location, vehicleType, options);

    const handleSearch = () => {
        const filterParams = {
            location,
            form: vehicleType,
            ...options
        };
        dispatch(clearCampers());
        dispatch(filterCampers(filterParams));
    };

    return (
        <aside className={styles.filters}>
            <div className={styles.section}>
                <label className={styles.label}>Location</label>
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="City"*/}
                {/*    value={location}*/}
                {/*    onChange={(e) => dispatch(setLocation(e.target.value))}*/}
                {/*    className={styles.input}*/}
                {/*/>*/}
                {/*<div className={styles.inputWrapper}>*/}
                {/*    <img src={locationIcon} className={styles.icon} alt="Location icon" />*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder="City"*/}
                {/*        value={location}*/}
                {/*        onChange={(e) => dispatch(setLocation(e.target.value))}*/}
                {/*        className={styles.input}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        placeholder="City"
                        value={location}
                        onChange={(e) => dispatch(setLocation(e.target.value))}
                        className={styles.input}
                    />
                    <img src={locationIcon} className={styles.icon} alt="Location icon" />
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>Vehicle equipment</label>
                <div className={styles.categories}>
                    {Object.entries(optionLabels).map(([key, props]) => (
                        <div
                            key={key}
                            className={`${styles.tag} ${options[key] ? styles.selected : ''}`}
                            onClick={() => dispatch(toggleOption(key))}
                        >
                            <img src={props.icon} alt={props.label} width="32px"/>
                            {props.label}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.label}>Vehicle type</label>
                <div className={styles.vehicleTypes}>
                    {vehicleTypes.map((type) => (
                        <div
                            key={type}
                            className={`${styles.vehicleType} ${
                                vehicleType === type ? styles.selected : ''
                            }`}
                            onClick={() => dispatch(setVehicleType(vehicleType === type ? '' : type))}
                        >
                            <img src={vehicleTypeLabels[type].icon} alt={vehicleTypeLabels[type].label} width="32px"/>
                            {vehicleTypeLabels[type].label}
                        </div>
                    ))}
                </div>
            </div>

            <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        </aside>
    );
}
