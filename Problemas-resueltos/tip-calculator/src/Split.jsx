import { useState } from 'react'

export default function Split({ total }) {
    const [ people, setPeople ] = useState("");
    const amountPerPerson = people > 0 ? total / people : 0;

    return (
        <div id="split">
            <label>
                Number of people:
            </label>

            <input
                type="number"
                min={1}
                placeholder='1'
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
            />

            <p>
                Each person pays: ${amountPerPerson.toFixed(2)}
            </p>
        </div>
    );
}