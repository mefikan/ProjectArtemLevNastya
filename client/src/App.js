import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState({});
    const [randomSteps, setRandomSteps] = useState([]);

    const handleFirstCardClick = (choice) => {
        setSelections({ mainChoice: choice });
        const foodSteps = [1, 2, 3, 4, 5, 6];
        const drinkSteps = [8, 9, 10, 11, 12, 13];
        const steps = choice === 'Еда' ? foodSteps : drinkSteps;
        const shuffledSteps = steps.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRandomSteps(shuffledSteps);
        setStep(shuffledSteps[0]);
    };

    const handleCardClick = (choice) => {
        setSelections(prevSelections => ({ ...prevSelections, ['step${step}']: choice }));
        const currentStepIndex = randomSteps.indexOf(step);
        if (currentStepIndex === 3) {
            setStep(7); // Show summary of selections
        } else {
            setStep(randomSteps[currentStepIndex + 1]);
        }
    };

    const handleOkClick = () => {
        console.log(JSON.stringify(selections)); // Display JSON in the console
    };

    return (
        <div className="app">
            {step === 0 && (
                <div className="card">
                    <div className="left" onClick={() => handleFirstCardClick('Еда')}>
                        Еда
                    </div>
                    <div className="right" onClick={() => handleFirstCardClick('Напитки')}>
                        Напитки
                    </div>
                </div>
            )}
            {step === 1 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Сладкое')}>
                        Сладкое
                    </div>
                    <div className="right" onClick={() => handleCardClick('Солёное')}>
                        Солёное
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Горячее')}>
                        Горячее
                    </div>
                    <div className="right" onClick={() => handleCardClick('Холодное')}>
                        Холодное
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Мягкое')}>
                        Мягкое
                    </div>
                    <div className="right" onClick={() => handleCardClick('Хрустящее')}>
                        Хрустящее
                    </div>
                </div>
            )}
            {step === 4 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Острое')}>
                        Острое
                    </div>
                    <div className="right" onClick={() => handleCardClick('Нейтральное')}>
                        Нейтральное
                    </div>
                </div>
            )}
            {step === 5 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Густое')}>
                        Густое
                    </div>
                    <div className="right" onClick={() => handleCardClick('Жидкое')}>
                        Жидкое
                    </div>
                </div>
            )}
            {step === 6 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Сытное')}>
                        Сытное
                    </div>
                    <div className="right" onClick={() => handleCardClick('Лёгкое')}>
                        Лёгкое
                    </div>
                </div>
            )}
            {step === 7 && (
                <div className="card">
                    <div className="summary">
                        <h2>Ваши выборы:</h2>
                        <ul>
                            {Object.entries(selections).map(([key, value], index) => (
                                key !== 'mainChoice' && // Exclude the main choice
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                        <button onClick={handleOkClick}>OK</button>
                    </div>
                </div>
            )}
            {step === 8 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Холодное')}>
                        Холодное
                    </div>
                    <div className="right" onClick={() => handleCardClick('Горячее')}>
                        Горячее
                    </div>
                </div>
            )}
            {step === 9 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Сладкое')}>
                        Сладкое
                    </div>
                    <div className="right" onClick={() => handleCardClick('Горькое')}>
                        Горькое
                    </div>
                </div>
            )}
            {step === 10 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Ароматное')}>
                        Ароматное
                    </div>
                    <div className="right" onClick={() => handleCardClick('Безвкусное')}>
                        Безвкусное
                    </div>
                </div>
            )}
            {step === 11 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Сытное')}>
                        Сытное
                    </div>
                    <div className="right" onClick={() => handleCardClick('Лёгкое')}>
                        Лёгкое
                    </div>
                </div>
            )}
            {step === 12 && (
                <div className="card">
                    <div className="left" onClick={() => handleCardClick('Густое')}>
                        Густое
                    </div>
                    <div className="right" onClick={() => handleCardClick('Жидкое')}>
                        Жидкое
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;