import React, {useContext, useRef, useState} from 'react';
import '../styles/Swipe.css';
import {createSwipeWithProps, getDish, login, registration} from "../http/userAPI";
import {Context} from "../index";
import {foodArr, drinkArr} from "../utils/consts";
import {Button, Card, Col, Container, Image, Row, Stack} from "react-bootstrap";
import {getOneRestaurant} from "../http/restaurantAPI";

let currentArray = []
//тут нужно сократить все и сделать через useEffect, чтобы как тригер все работало и не было 1000 строк однотипного кодаы
const Swipe = () => {
        let {user} = useContext(Context)

        const [step, setStep] = useState(0);
        const [foodType, setFoodType] = useState(''); // 0 - еда, 1 - напитки
        const [left, setLeft] = useState('Еда')
        const [right, setRight] = useState('Напитки')
        const [restS, setRestS] = useState([])


        const HandleCardClick = (name, side) => {
            //console.log(step)
            //console.log(name)
            if (step === 0)
            {
                setFoodType(name)
                if (foodType === 'Еда'){
                    currentArray = foodArr
                }
                else{
                    currentArray = drinkArr
                }
                user.setTag(foodType)
            }
            if (step <= 4) {
                setStep(step + 1)
                let ok = 0
                while (ok !== 1) {
                    let pairIndex = (Math.round(Math.random() * 100)) % currentArray.length
                    let usedIndexes = user.UsedIndexes
                    if (usedIndexes.indexOf(pairIndex) === -1) {
                        ok = 1
                        user.addUsedIndexes(pairIndex)
                        setLeft(currentArray[pairIndex][0])
                        setRight(currentArray[pairIndex][1])
                    }
                }
                if (step!==0)
                    user.addToChoice(name)
            }

        }
        async function HandleOkClick() {
            let tmp_arr = user.choice
            let response = await createSwipeWithProps(foodType, tmp_arr[0], tmp_arr[1], tmp_arr[2], tmp_arr[3])
            //console.log(response)
            let finalDish = await getDish()
            //finalDish.forEach(data => console.log(data))
            let restaurantNames = new Array(3)
            let cnt=0
            for (const data of finalDish) {
                let nowRestaurantJSON=((await getOneRestaurant({idRestaurant: data.RestaurantIdRestaurant})))
                //console.log(nowRestaurantJSON)
                restaurantNames[cnt] = nowRestaurantJSON.name.toString()
                cnt++;
            }
            //console.log(Object.values(restaurantNames))
            cnt=0
            for (let data of finalDish){
                data.RestaurantIdRestaurant=restaurantNames[cnt]
                cnt++
            }
            user.setFinalDish(finalDish)
            user.clearChoice()
            setStep(6  )
        }


        return (
            <div className="app">
                {step === 5 && (
                    <div className="app">
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
                                <button onClick={HandleOkClick}>OK</button>
                            </div>
                        </div>
                    </div>
                )}
                {step < 5 && (
                    <div className="card">
                        <div className="left" onClick={() => HandleCardClick(left, 0)}>
                            {left}
                        </div>
                        <div className="right" onClick={() => HandleCardClick(right, 1)}>
                            {right}
                        </div>
                    </div>
                )}
                {
                    // тут получу еду и выведу, также нужны картинки
                    step === 6 && (
                        <div className={"card"}>
                            <h2>Наши предложения</h2>
                                {
                                    user.finalDish.map((data) =>
                                        <Stack direction={"horizontal"} gap={3} key={data.idDish}>
                                            <Col md={120}>{data.dishname}</Col>
                                            <Col md={120}>{data.dishRating}</Col>
                                            <Col md={120}>{data.RestaurantIdRestaurant}</Col>
                                            <Col md={120}>
                                                <Image width ={50} height={50} src ={`${process.env.REACT_APP_API_URL}static/${data.image}`}/>
                                            </Col>
                                        </Stack>

                                    )
                                }
                        </div>

                    )
                }
            </div>

        )
};
export default Swipe;