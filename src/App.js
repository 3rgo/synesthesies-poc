import React, { useState } from 'react';
import Form from './Form';
import Start from './Start';

function App() {
    const REPETITIONS = 3;
    const [graphemes, setGraphemes] = useState({});
    const [steps, setSteps] = useState([]);

    console.log(graphemes);

    const handleStart = graphemes => {
        setGraphemes(graphemes);

        const newSteps = Object.entries(graphemes).reduce((all, [type, values]) => {
            let newValues = [];
            values.forEach(v => {
                Array.from({ length: REPETITIONS }, () => { newValues.push([type.slice(0, -1), v]); });
            });
            return [...all, ...newValues];
        }, []);
        Array.from({ length: REPETITIONS }, () => { shuffleArray(newSteps); });
        setSteps(newSteps);
    };

    const shuffleArray = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="max-w-md rounded overflow-hidden shadow-lg p-8 flex flex-col justify-start items-stretch">
                <h1 className="text-4xl text-center font-bold tracking-wide mb-4 border-b border-gray-600">Synesthésies</h1>
                { steps.length === 0 && (<Start onStart={handleStart} />) }
                { steps.length > 0 && (<Form steps={steps} />) }
            </div>
        </div>
    );
}

export default App;
