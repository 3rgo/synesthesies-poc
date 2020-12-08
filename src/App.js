import React, { useState } from 'react';
import Form from './Form';
import Score from './Score';
import Start from './Start';

function App() {
    const REPETITIONS = 3;
    const [graphemes, setGraphemes] = useState({});
    const [steps, setSteps] = useState([]);
    const [scores, setScores] = useState(null);
    const [totalScore, setTotalScore] = useState(null);

    const shuffleArray = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const handleStart = graphemes => {
        setGraphemes(graphemes);

        const newSteps = Object.entries(graphemes).reduce((all, [type, values]) => {
            let newValues = [];
            values.forEach(v => {
                // eslint-disable-next-line array-callback-return
                Array.from({ length: REPETITIONS }, () => { newValues.push([type, v]); });
            });
            return [...all, ...newValues];
        }, []);
        // eslint-disable-next-line array-callback-return
        Array.from({ length: REPETITIONS }, () => { shuffleArray(newSteps); });
        setSteps(newSteps);
    };

    const handleFinish = selections => {
        // Compute scores
        let scores = {};
        let totalScore = 0;
        let count = 0;
        Object.entries(graphemes).forEach(([type, values]) => {
            scores[type] = {};
            values.forEach(g => {
                let sel = [];

                for(let i = 0; i < steps.length; i++){
                    if(steps[i][0] === type && steps[i][1] === g){
                        sel.push(selections[i]);
                    }
                }

                let score = 0;
                for(var c of ['r', 'g', 'b']){
                    score += Math.abs(sel[0][c] - sel[1][c])/255 + Math.abs(sel[1][c] - sel[2][c])/255 + Math.abs(sel[2][c] - sel[0][c])/255;
                }

                scores[type][g] = {
                    selections: sel,
                    score:      score
                };
                totalScore += score;
                count++;
            });
        });
        setScores(scores);
        setTotalScore(totalScore/count);
        console.log(graphemes, steps, scores);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="max-w-md rounded overflow-hidden shadow-lg p-8 flex flex-col justify-start items-stretch">
                <h1 className="text-4xl text-center font-bold tracking-wide mb-4 border-b border-gray-600">Synesthésies</h1>
                { scores === null && steps.length === 0 && (<Start onStart={handleStart} />) }
                { scores === null && steps.length > 0 && (<Form steps={steps} onFinish={handleFinish}/>) }
                { scores !== null && totalScore !== null && (<Score scores={scores} totalScore={totalScore} />)}
            </div>
        </div>
    );
}

export default App;
