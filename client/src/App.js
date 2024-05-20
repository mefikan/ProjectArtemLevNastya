import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState([]);

    const handleFirstCardClick = (choice) => {
        setSelections([choice]);
        if (choice === 'Food') {
            setStep(1); // Go to Sweet/Salty choice for Food
        } else {
            setStep(4); // Go to Alcoholic/Non-Alcoholic choice for Drinks
        }
    };

    const handleSecondCardClick = (choice) => {
        setSelections(prevSelections => [...prevSelections, choice]);
        if (selections[0] === 'Food') {
            setStep(2); // Go to Hot/Cold choice for Food
        } else {
            setStep(5); // Go to Cold/Hot choice for Drinks
        }
    };

    const handleThirdCardClick = (choice) => {
        setSelections(prevSelections => [...prevSelections, choice]);
        if (selections[0] === 'Food') {
            setStep(3); // Go to Soft/Crispy choice for Food
        } else {
            setStep(6); // Go to Sweet/Bitter choice for Drinks
        }
    };

    const handleFinalCardClick = (choice) => {
        setSelections(prevSelections => [...prevSelections, choice]);
        setStep(7); // Show summary of selections
    };

    const handleOkClick = () => {
        setStep(8); // Show final message
    };

    return (
        <div className="app">
            {step === 0 && (
                <div className="card">
                    <div className="left" onClick={() => handleFirstCardClick('Food')}>
                        Food
                    </div>
                    <div className="right" onClick={() => handleFirstCardClick('Drinks')}>
                        Drinks
                    </div>
                </div>
            )}
            {step === 1 && (
                <div className="card">
                    <div className="left" onClick={() => handleSecondCardClick('Sweet')}>
                        Sweet
                    </div>
                    <div className="right" onClick={() => handleSecondCardClick('Salty')}>
                        Salty
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="card">
                    <div className="left" onClick={() => handleThirdCardClick('Hot')}>
                        Hot
                    </div>
                    <div className="right" onClick={() => handleThirdCardClick('Cold')}>
                        Cold
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="card">
                    <div className="left" onClick={() => handleFinalCardClick('Soft')}>
                        Soft
                    </div>
                    <div className="right" onClick={() => handleFinalCardClick('Crispy')}>
                        Crispy
                    </div>
                </div>
            )}
            {step === 4 && (
                <div className="card">
                    <div className="left" onClick={() => handleSecondCardClick('Alcoholic')}>
                        Alcoholic
                    </div>
                    <div className="right" onClick={() => handleSecondCardClick('Non-Alcoholic')}>
                        Non-Alcoholic
                    </div>
                </div>
            )}
            {step === 5 && (
                <div className="card">
                    <div className="left" onClick={() => handleThirdCardClick('Cold')}>
                        Cold
                    </div>
                    <div className="right" onClick={() => handleThirdCardClick('Hot')}>
                        Hot
                    </div>
                </div>
            )}
            {step === 6 && (
                <div className="card">
                    <div className="left" onClick={() => handleFinalCardClick('Sweet')}>
                        Sweet
                    </div>
                    <div className="right" onClick={() => handleFinalCardClick('Bitter')}>
                        Bitter
                    </div>
                </div>
            )}
            {step === 7 && (
                <div className="card">
                    <div className="summary">
                        <h2>Your Choices:</h2>
                        <ul>
                            {selections.map((selection, index) => (
                                <li key={index}>{selection}</li>
                            ))}
                        </ul>
                        <button onClick={handleOkClick}>OK</button>
                    </div>
                </div>
            )}
            {step === 8 && (
                <div className="card">
                    <div className="summary">
                        <h2>Your choice is:</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;