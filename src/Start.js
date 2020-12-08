import React, { useState } from 'react';

export default function Start({ onStart }) {
    const [countLetters, setCountLetters] = useState(1);
    const [countNumbers, setCountNumbers] = useState(1);
    const [countDays, setCountDays] = useState(1);

    const allGraphemes = {
        letter: [...Array(26).keys()].map(k => String.fromCharCode('A'.charCodeAt(0) + k)),
        number: [...Array(10).keys()],
        day:    ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    };

    const getRandom = (arr, n) => {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError('getRandom: more elements taken than available');
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const graphemes = {
            letter: getRandom(allGraphemes.letter, countLetters),
            number: getRandom(allGraphemes.number, countNumbers),
            day:    getRandom(allGraphemes.day, countDays)
        };
        onStart(graphemes);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-start items-stretch">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="lettersCount">
                    Nombre de lettres
            </label>
            <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="lettersCount"
                type="number"
                value={countLetters}
                onChange={e => setCountLetters(e.target.value)}
                min="1"
                step="1"
                max="26"
            />
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="numbersCount">
                    Nombre de chiffres
            </label>
            <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="numbersCount"
                type="numeric"
                value={countNumbers}
                onChange={e => setCountNumbers(e.target.value)}
                min="1"
                step="1"
                max="10"
            />
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="daysCount">
                    Nombre de jours
            </label>
            <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                id="daysCount"
                type="numeric"
                value={countDays}
                onChange={e => setCountDays(e.target.value)}
                min="1"
                step="1"
                max="26"
            />

            <button
                type="submit"
                className="w-full text-center uppercase font-bold py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >
                Démarrer
            </button>
        </form>
    );
}
