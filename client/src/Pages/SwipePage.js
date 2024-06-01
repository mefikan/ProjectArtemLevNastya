import React, {useContext, useState} from 'react';
import '../styles/Swipe.css';
import {createSwipeWithProps, getDish, login, registration} from "../http/userAPI";
import {Context} from "../index";

//тут нужно сократить все и сделать через useEffect, чтобы как тригер все работало и не было 1000 строк однотипного кодаы
const Swipe = () => {
        const [step, setStep] = useState(0);
        const [selections, setSelections] = useState({});
        const [randomSteps, setRandomSteps] = useState([]);
        let steps
        let foodSteps
        let tag
        let ch1, ch2, ch3, ch4
        let json_var
        let dishName
        const handleFirstCardClick = (choice) => {
            setSelections({ mainChoice: choice });
            foodSteps = [1, 2, 3, 4, 5, 6];
            const drinkSteps = [8, 9, 10, 11, 12, 13];
            steps = choice === 'Еда' ? foodSteps : drinkSteps;
            user.setTag(choice)
            const shuffledSteps = steps.sort(() => 0.5 - Math.random()).slice(0, 4);
            console.log(shuffledSteps)
            setRandomSteps(shuffledSteps);
            setStep(shuffledSteps[0]);
        };

        let {user} = useContext(Context)
        if (!user.isAuth) {
            async function signIn() {
                const response = await login('email_3@email.ru', '12345')
                user.setTag(response)
                console.log(user.tag)
                return response
            }
            let varible = signIn()
            user.setIsAuth(1);
        }
        const HandleCardClick = async (choice) => {
            try {
                user.addToChoice(choice)
                //console.log(user.choice)
                //setSelections(prevSelections => ({ ...prevSelections, ['step${step}']: choice }));
                const currentStepIndex = randomSteps.indexOf(step);
                if (currentStepIndex === 3) {
                    let tmp_arr = user.choice
                    tag = user.tag
                    ch1 = tmp_arr[0]
                    ch2 = tmp_arr[1]
                    ch3 = tmp_arr[2]
                    ch4 = tmp_arr[3]
                    json_var = {tag: tag, ch1: ch1, ch2: ch2, ch3: ch3, ch4: ch4}
                    console.log(json_var)
                    console.log(user.tag)
                    let response = await createSwipeWithProps(tag, ch1, ch2, ch3, ch4)
                    console.log(response)
                    console.log(dishName)
                    setStep(7); // Show summary of selections
                } else {
                    setStep(randomSteps[currentStepIndex + 1]);
                }
            } catch (e)
            {
                alert(e.message)
            }

        };
        let finalDish;
        const handleOkClick = async () => {
            finalDish = await getDish()
            console.log(finalDish)
            setStep(99  )
            user.setFinalDish(finalDish.dishname)
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
                        <div className="left" onClick={() => HandleCardClick('Сладкое')}>
                            Сладкое
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Солёное')}>
                            Солёное
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Горячее')}>
                            Горячее
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Холодное')}>
                            Холодное
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Мягкое')}>
                            Мягкое
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Хрустящее')}>
                            Хрустящее
                        </div>
                    </div>
                )}
                {step === 4 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Острое')}>
                            Острое
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Нейтральное')}>
                            Нейтральное
                        </div>
                    </div>
                )}
                {step === 5 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Густое')}>
                            Густое
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Жидкое')}>
                            Жидкое
                        </div>
                    </div>
                )}
                {step === 6 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Сытное')}>
                            Сытное
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Лёгкое')}>
                            Лёгкое
                        </div>
                    </div>
                )}
                {step === 7 && (
                    <div className="card">
                        <div className="summary">
                            <h2>Ваши выборы:</h2>
                            <ul>
                                {
                                    user.choice.map((value, index) =>
                                        <li key={index}>{value}</li>
                                    )
                                }

                            </ul>
                            <button onClick={handleOkClick}>OK</button>
                        </div>
                    </div>
                )}
                {step === 8 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Холодное')}>
                            Холодное
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Горячее')}>
                            Горячее
                        </div>
                    </div>
                )}
                {step === 9 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Сладкое')}>
                            Сладкое
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Горькое')}>
                            Горькое
                        </div>
                    </div>
                )}
                {step === 10 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Ароматное')}>
                            Ароматное
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Безвкусное')}>
                            Безвкусное
                        </div>
                    </div>
                )}
                {step === 11 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Сытное')}>
                            Сытное
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Лёгкое')}>
                            Лёгкое
                        </div>
                    </div>
                )}
                {step === 12 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Густое')}>
                            Густое
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Жидкое')}>
                            Жидкое
                        </div>
                    </div>
                )}
                {step === 13 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick('Питательное')}>
                            Питательное
                        </div>
                        <div className="right" onClick={() => HandleCardClick('Вредоносное')}>
                            Вредоносное
                        </div>
                    </div>
                )}
                {step === 99 && (
                    <div className="card">
                        <h2>
                            <p>Наш выбор пал на:<br/></p>
                            <p>{user.finalDish}</p>
                        </h2>
                    </div>
                )}
            </div>
        );
};
export default Swipe;