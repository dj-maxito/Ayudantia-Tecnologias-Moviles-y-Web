import React, { useContext } from 'react';
import { UserContext } from './Component1';

export default function Component4(){
    const user = useContext(UserContext);
    return (
            <div>
                <h1>Componente 4</h1>
                <p>Adiós {user}</p>
            </div>
        )
}