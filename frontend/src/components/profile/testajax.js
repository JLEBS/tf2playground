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

    const {loading,data} = useFetch('https://tempus.xyz/api/players/steamid/76561198041529904/rank');

    return (
        <AjaxDiv>
            {loading ? <div>Loading...</div> :
         
                <ul>
                    <li>{data.class_rank_info[3].rank}</li>
                    <li>{data.class_rank_info[3].points}</li>
                    <li>{data.class_rank_info[4].rank}</li>
                    <li>{data.class_rank_info[4].points}</li>
                    <li>{data.rank_info.rank}</li>
                    <li>{data.rank_info.points}</li>
                </ul>
            }
        </AjaxDiv>
    )
}

export default Example;