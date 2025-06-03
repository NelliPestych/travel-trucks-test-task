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
                <label className={styles.labelLocation}>Location</label>
                <div className={`${styles.inputWrapper} ${location ? styles.active : ''}`}>
                    <input
                        type="text"
                        placeholder="City"
                        value={location}
                        onChange={(e) => dispatch(setLocation(e.target.value))}
                        className={styles.input}
                    />
                    <svg className={styles.icon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_12105_652)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.817 0.112823C15.8743 0.159759 15.9204 0.218822 15.952 0.285748C15.9837 0.352674 16 0.425792 16 0.499823V14.4998C15.9999 14.6154 15.9598 14.7273 15.8866 14.8167C15.8133 14.906 15.7113 14.9672 15.598 14.9898L10.598 15.9898C10.5333 16.0028 10.4667 16.0028 10.402 15.9898L5.5 15.0098L0.598 15.9898C0.525489 16.0043 0.450665 16.0025 0.378921 15.9846C0.307176 15.9667 0.240296 15.9331 0.183099 15.8863C0.125903 15.8394 0.0798134 15.7804 0.0481518 15.7136C0.0164902 15.6468 4.46527e-05 15.5738 0 15.4998L0 1.49982C6.9782e-05 1.38428 0.0401561 1.27232 0.113443 1.18299C0.186731 1.09366 0.288695 1.03247 0.402 1.00982L5.402 0.00982311C5.46669 -0.00310763 5.53331 -0.00310763 5.598 0.00982311L10.5 0.989823L15.402 0.00982311C15.4745 -0.00476108 15.5493 -0.00308756 15.6211 0.0147231C15.6928 0.0325338 15.7597 0.0660382 15.817 0.112823ZM10 1.90982L6 1.10982V14.0898L10 14.8898V1.90982ZM11 14.8898L15 14.0898V1.10982L11 1.90982V14.8898ZM5 14.0898V1.10982L1 1.90982V14.8898L5 14.0898Z" fill="currentColor"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_12105_652">
                                <rect width="16" height="16" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>

            <div className={styles.section}>
                <label className={styles.labelFilters}>Filters</label>
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
