import { useState, createContext } from 'react';
import Component2 from './Component2';

export const UserContext = createContext();

export default function Component1(){
    const [user, setUser] = useState("Bleh");
    return (
        <div>
            <h1>Componente 1</h1>
            <h2>Hola {user}</h2>
            <UserContext.Provider value={user}>
                <Component2/>
            </UserContext.Provider>
        </div>
    )
}