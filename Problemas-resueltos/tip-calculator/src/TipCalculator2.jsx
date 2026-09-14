import { useState } from 'react'
import Split from './Split'

const PERCENT = [ 15, 20, 25, "Custom" ];

export default function TipCalculator(){
    const [ value, setValue ] = useState("");
    const [ selected, setSelected ] = useState(20);
    const [ custom, setCustom ] = useState("");
    const [ separate, setSeparate ] = useState("");

    const percentage = selected === "Custom" ? Number(custom) || 0 : Number(selected);

    const bill = Number(value)
    const tip = (Number(bill) * percentage) / 100;
    const total = Number(bill) + tip;

    return(
        <div id='card'>
            <h1>Tip Calculator</h1>
            <input
                type='number'
                min={0}
                placeholder='0'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div id='tip-grid'>
                <h5>Tip :</h5>
                
                <div className="tip-grid">
                    {PERCENT.map((p) => {
                        const active = selected === p;
                        return (
                            <button
                                key={p}
                                type="button"
                                className={`tip-btn ${active ? "active" : ""}`}
                                onClick={() => setSelected(p)}
                            >
                                {p === "Custom" ? "Custom" : `${p}%`}
                            </button>
                        );
                    })}
                </div>

                {selected === "Custom" && (
                    <div className="custom-row">
                        <input
                            type="number"
                            min="0"
                            placeholder="%"
                            value={custom}
                            onChange={(e) => setCustom(e.target.value)}
                        />
                        <span>%</span>
                    </div>
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