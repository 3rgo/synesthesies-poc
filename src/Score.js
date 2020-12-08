import React from 'react';

export default function Score({ scores, totalScore }) {
    return (
        <div className="flex flex-col justify-start items-center">
            <h2 className="text-2xl text-center font-bold tracking-wide mb-4">Résultats</h2>

            <table className="table-fixed border border-collapse border-gray-800 text-center">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Type</th>
                        <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Graphème</th>
                        <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Score</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    { Object.entries(scores).map(([type, graphemes], i) => {
                        return Object.entries(graphemes).map(([g, { score }], j) => (
                            <tr
                                key={`row-${j+i*Object.keys(graphemes).length}`}
                                className={ (j+i*Object.keys(graphemes).length) % 2 !== 0 ? 'bg-gray-200 border-b border-t border-gray-800' : ''}
                            >
                                <td className="py-3 px-4">
                                    { type === 'letter' && 'Lettre'}
                                    { type === 'number' && 'Chiffre'}
                                    { type === 'day' && 'Jour'}
                                </td>
                                <td className="py-3 px-4">
                                    { g }
                                </td>
                                <td className="py-3 px-4">
                                    { Math.round(score*100)/100 }
                                </td>
                            </tr>
                        ));
                    })}
                </tbody>
            </table>

            <div className="text-lg text-center font-bold tracking-wide my-4">
                <u>Score Final :</u> { Math.round(totalScore*100)/100 }
                <br/>
                { totalScore <= 1 && 'Vous êtes synesthète !'}
                { totalScore > 1 && 'Vous n\'êtes pas synesthète...'}
            </div>
            <button
                onClick={() => { window.location.reload(); }}
                className="w-full text-center uppercase font-bold py-3 rounded bg-red-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >
                    Recommencer
            </button>
        </div>
    );
}
