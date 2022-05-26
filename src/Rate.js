import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import './App.css';
import { useLocation } from "react-router-dom";


const Rate = (props) => {
    const location = useLocation();
    const day = location.state.day;
    const history = useHistory();
    const [count,setCount] = useState(null);
    const num_list =Array.from({length: 5},(item, idx) => idx);
    const grayCircleRef = React.useRef(null);
    const grayCircle = num_list.map((item,index) => {
        return (<Circle className="circle" onClick={() =>{
            setCount(index);
            }           
        }
             key={index} />) 
    })
    React.useEffect(() => {
        console.log(count);
        const circles = grayCircleRef.current.children;
        if(count != null){
            for (let i=0; i<circles.length; i++){
                if (i <= count){
                    circles[i].className = "yellow-circle"
                }else {
                    circles[i].className ="gray-circle"
                }
    
            }
        }
        
        return () => {        
        }
    }, [count]);

    return (
      <Wrap>
        <h3>
          <DayColor>{day}요일</DayColor> 
          평점남기기</h3>
        
        <CircleWrap ref={grayCircleRef}>
          {grayCircle}
        </CircleWrap>
        <div>
          <button className="w-btn w-btn-blue" type="button"
          onClick={() => {
            history.push("/");
        }}>
           평점 남기기
          </button>
        </div>
      </Wrap>
    );
};

const Wrap =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const DayColor = styled.div`
  color: #fff;
  background: #ffc0c0;
  padding: 0 18px;
`

const Circle =styled.div`
  margin:auto; 
  width: 30px; 
  height:30px; 
  background: gray; 
  border-radius:250px;
  margin: 0 5px;
`
const CircleWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`


export default Rate;