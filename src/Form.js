import React, { useState } from 'react';
import Picker from './Picker';

export default function Form({ steps, onFinish }) {

    const [currentStep, setCurrentStep] = useState(0);
    const [color, setColor] = useState('#fff');
    const [scores, setScores] = useState(Array.from({ length: steps.length }, () => (null)));

    let endSentence = '';
    if(currentStep < steps.length){
        switch(steps[currentStep][0]){
        case 'letter':
            endSentence = 'à la lettre ';
            break;
        case 'number':
            endSentence = 'au chiffre ';
            break;
        case 'day':
            endSentence = 'au jour ';
            break;
        default:
            break;
        }
    }

    return (
        <div className="flex flex-col justify-start items-center">
            { currentStep < steps.length && (
                <>
                    <div className="py-2 text-center">
                        Quelle couleur associez-vous { endSentence } <b>{steps[currentStep][1]}</b> ?
                    </div>
                    <br/>
                    <Picker
                        color={ color }
                        onColorChange={ (c) => { setColor(c.rgb); } }
                    />
                    <button
                        disabled={color === null}
                        onClick={() => {
                            // Store score
                            setScores(sc => {
                                sc[currentStep] = color;
                                return sc;
                            });
                            // Reset color
                            setColor('#fff');

                            // Go to next step
                            setCurrentStep(cur => cur + 1);
                        }}
                        className="w-full text-center uppercase font-bold my-3 py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none"
                    >
                            Suivant
                    </button>
                </>
            )}
            { currentStep >= steps.length && (
                <button
                    onClick={() => {
                        onFinish(scores);
                    }}
                    className="w-full text-center uppercase font-bold py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                    Calculer le score
                </button>
            )}
            <div
                className="bg-teal-500 text-xs leading-none py-1 text-center text-gray-700"
                style={{
                    width: Math.round(100*currentStep/steps.length) + '%'
                }}>
                {Math.round(100*currentStep/steps.length) + '%'}
            </div>
        </div>
    );
}
