import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home/Home.jsx';
import Catalog from '../pages/Catalog/Catalog.jsx';
import CamperDetails from '../pages/CamperDetails/CamperDetails.jsx';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/catalog" element={<Catalog/>}/>
            <Route path="/catalog/:id" element={<CamperDetails/>}/>
        </Routes>
    );
}
