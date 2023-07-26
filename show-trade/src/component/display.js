import React, { useContext } from 'react'
import colorContext from '../datasource/getContext'
import Candlestick from './candlestick'

export default function Display() {
    
    const cont = useContext(colorContext);
    const a = cont.data;
    
  return (
    <>
    <div className="display">
        {a.map((rate)=>{
        return (
        <Candlestick rate = {rate}/>
        )})}
    </div>
    </>
  )
}
