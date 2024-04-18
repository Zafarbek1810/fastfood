import React, { useState } from 'react';
import KitchenHeader from './KitchenHeader';
import MainKitchen from './Main';

const Kitchen = () => {
    const [array, setArray] = useState([])
    const [lastOrderId, setLastOrderId] = useState(null)
    return (
        <div>
            <KitchenHeader array={array} lastOrderId={lastOrderId}/>
            <MainKitchen setArray={setArray} setLastOrderId={setLastOrderId}/>
        </div>
    );
};

export default Kitchen;