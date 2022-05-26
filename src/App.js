import React from "react";
import styled from "styled-components";
import {Route} from "react-router-dom";
import { useHistory } from "react-router-dom";


import './App.css';
import Rate from "./Rate";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function App() {
  const history = useHistory();
  const week = ['월','화','수','목','금','토','일'];
  const num_list = Array.from({length: 5},(item, idx) => idx);
  const circles = num_list.map((item,index) => {
    return <Circle key={index} />
  })
  const totalCircleRef = React.useRef(null);
  const weekCircleRef = React.useRef(null);

  const dayItems = week.map((day, index) => {
    return(
            <Day key={index}>
              {day}
              <CircleWrap ref={weekCircleRef}>
                {circles}
                <div className="triangle" onClick={() => {
            history.push({pathname: "/rate", state: {day: day}});
        }}>
        </div>
              </CircleWrap> 
            </Day>
    )
  })
  

  const [randomNum,setRandomNum] = React.useState([]);
  const [average,setAverage] = React.useState(null);

  React.useEffect(() => {
    let randomList = [];
    console.log(getRandomInt(0,5));
    let random = 3;
    console.log(weekCircleRef);
    console.log(totalCircleRef);
    const week = totalCircleRef.current.children;
    for (let i=0; i<week.length; i++){
      const day = week[i].children[0].children;
      console.log(day);
      random = getRandomInt(0,5);
      randomList.push(random);
      for (let i=0; i<day.length; i++){
        if (i <= random){
          day[i].className = "yellow-circle"
      }else if(i<5) {
          day[i].className ="gray-circle"
      }
      }

    }
    const sum = randomList.reduce((acc, cur) =>acc + cur);
    const randomAverage = Number((sum/7).toFixed(1));
    console.log(randomAverage);
    setAverage(randomAverage);   
  },[]);
    React.useEffect(() => {
      let randomList = [];
      console.log(getRandomInt(0,5));
      let random = 3;
      console.log(weekCircleRef);
      console.log(totalCircleRef);
      const week = totalCircleRef.current.children;
      for (let i=0; i<week.length; i++){
        const day = week[i].children[0].children;
        console.log(day);
        random = getRandomInt(0,5);
        randomList.push(random);
        for (let i=0; i<day.length; i++){
          if (i <= random){
            day[i].className = "yellow-circle"
        }else if(i<5) {
            day[i].className ="gray-circle"
        }
        }
  
      }
      const sum = randomList.reduce((acc, cur) =>acc + cur);
      const randomAverage = Number((sum/7).toFixed(1));
    }, [average])

  return (
    <div className="App">
      
      <Container>
        <Route path="/" exact>
          <Title>내 일주일은?</Title>
          <Line />
          <DayWrap ref = {totalCircleRef}>
            {dayItems}
          </DayWrap>
          <Input>
            <h3 className="rateStyle">평균평점
            <div>{average}</div>
            </h3>
            <button className="w-btn w-btn-blue" type="button"
            onClick={() => {
              setAverage(0)
            }}>
            reset
            </button>
          </Input>
        </Route>

        <Route path="/rate">
            <Rate />
        </Route>
      </Container>
    </div>
  );
}



const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: #ffa1a1;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

const DayWrap = styled.div`
  display: flex;
  flex-direction: column;
`
const Day = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`
const CircleWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`

const Circle =styled.div`
  margin:auto; 
  width: 30px; 
  height:30px; 
  background: yellow; 
  border-radius:250px;
  margin: 0 5px;
`


const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;





export default App;
