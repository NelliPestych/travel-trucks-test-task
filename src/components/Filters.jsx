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
} from '../assets/images/icons';

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
    panelTruck: 'Van',
    fullyIntegrated: 'Fully Integrated',
    alcove: 'Alcove',
};

export default function Filters() {
    const dispatch = useDispatch();
    const { location, vehicleType, options } = useSelector((state) => state.filters);

    return (
        <aside className={styles.filters}>
            <div className={styles.section}>
                <label className={styles.label}>Location</label>
                <input
                    type="text"
                    placeholder="Kyiv, Ukraine"
                    value={location}
                    onChange={(e) => dispatch(setLocation(e.target.value))}
                    className={styles.input}
                />
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
                            onClick={() => dispatch(setVehicleType(type))}
                        >
                            {vehicleTypeLabels[type]}
                        </div>
                    ))}
                </div>
            </div>

            <button className={styles.searchButton}>Search</button>
        </aside>
    );
}
