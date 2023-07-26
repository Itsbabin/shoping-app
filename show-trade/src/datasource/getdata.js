import React, { useEffect, useState } from 'react'
import colorContext from '../datasource/getContext'
export default function Getdata(props) {
    const [color, setcolor] = useState("red");
    const [data, setdata] = useState([]);
    const [highestprice, sethighestprice] = useState(0);
    const [topprice, settopprice] = useState(0);
    
    const baseurl = "https://public.coindcx.com"

       
const hightime = async ()=> {
  let response = await fetch(baseurl +"/market_data/candles?pair=B-BTC_USDT&interval=1d&limit=1", {
   method: 'GET',
   // headers: {
     
   // },
 })
 const json = await response.json();
 sethighestprice(json[0].high-json[0].low);
 settopprice(json[0].high);
//  console.log(json[0].high-json[0].low);
}

    
   
const getdata = async ()=> {
   let response = await fetch(baseurl +"/market_data/candles?pair=B-BTC_USDT&interval=5m", {
		method: 'GET',
		// headers: {
			
		// },
	})
  const json = await response.json();
  setdata(json);
  // console.log('json');
}
useEffect(() => {
  hightime();
  setInterval(getdata, 1500);
    },[])

    return (
        <colorContext.Provider value={{color,data,setcolor,highestprice,topprice}} >
            {props.children}
        </colorContext.Provider>
    )
}