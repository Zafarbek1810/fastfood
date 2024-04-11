import React, { useState } from 'react';
import KitchenHeader from './KitchenHeader';
import MainKitchen from './Main';

const Kitchen = () => {
    const [array, setArray] = useState([])
    return (
        <div>
            <KitchenHeader array={array}/>
            <MainKitchen setArray={setArray}/>
        </div>
    );
};

export default Kitchen;