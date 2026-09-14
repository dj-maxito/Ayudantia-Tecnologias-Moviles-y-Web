import { useState } from 'react'
import Split from './Split'

export default function TipCalculator(){
    const [ bill, setBill ] = useState("");
    const [ percentage, setPercentage ] = useState(20);
    const [ custom, setCustom ] = useState("");
    const [ separate, setSeparate ] = useState("");

    const tip = (Number(bill) * percentage) / 100;
    const total = Number(bill) + tip;

    return(
        <div id='card'>
            <h1>Tip Calculator</h1>
            <input 
                type='number'
                min={0}
                placeholder='0'
                value={bill}
                onChange={(e) => setBill(e.target.value)}
            />
            <div id='tip-grid'>
                <h5>Tip :</h5>
                
                <button onClick={() => setPercentage(15)}>
                    15%
                </button>

                <button onClick={() => setPercentage(20)}>
                    20%
                </button>

                <button onClick={() => setPercentage(25)}>
                    25%
                </button>

                <button onClick={() => setCustom(true)}>Custom</button>
                {custom && (
                    <input type='number' placeholder='Custom %' onChange={(e) => setPercentage(Number(e.target.value))}/>
                )}

                {percentage < 20 && percentage > 0 && (
                    <p className="meme">Most people tip 20% 😉</p>
                )}

            </div>
            <p>Tip: ${tip.toFixed(2)} with {percentage}%</p>
            <p>Total: ${total.toFixed(2)}</p>


            {/* Mejora opcional para separar la cuenta entre varias personas :] */}
            <h3>Separate the bill?</h3>
            <button onClick={() => setSeparate(true)}>Yes</button>
                {separate && (
                    <Split total = {total}/>
                )}
            <button onClick={() => setSeparate(false)}>No</button>
        </div>
    );
}