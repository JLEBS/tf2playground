import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import ReactDOM from "react-dom";


const AjaxDiv = styled.div`
    font-size: 20px;
    padding:30px;
    border:2px solid pink;
    background-color: black;
    color: white;
`


const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return {loading,data};
};

function Example() {

  const {loading,data} = useFetch("https://jsonplaceholder.typicode.com/todos/2");

  return (
    <AjaxDiv>
      {loading ? <div>Loading...</div> :
      <ul>
       <li>{data.id}</li>
       <li>{data.title}</li>
      </ul>
      }
    </AjaxDiv>
  )
}

export default Example;