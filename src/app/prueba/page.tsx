import React from 'react';

import Card from '../../components/card/index';

const tosco: React.FC = () => {
    return (
        <div>

            <h1>Esta es TOSCO</h1>
            <Card title="Mi tarjeta"  description="Esta es una tarjeta"/>
            <Card title="Mi tarjeta 2" />
            <Card title="Mi tarjeta 3" description="Esta es una tarjeta 3"/>
            <Card title="Mi tarjeta 4" description="Esta es una tarjeta 4"/>
        </div>
    )
}

export default tosco;   