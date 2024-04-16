import React, { useState } from 'react';
import HeaderKassa from './HeaderKassa';
import Main from './Main';
import { KassaWrapper } from './style';

const KassaMain = () => {
    const [lastOrderId, setLastOrderId] = useState(null)
    return (
        <>
            <HeaderKassa lastOrderId={lastOrderId}/>
            <Main setLastOrderId={setLastOrderId}/>
        </>
    );
};

export default KassaMain;