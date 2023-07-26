import React, { useContext } from 'react'
import colorContext from '../datasource/getContext'
export default function Candlestick(props) {
    const cont = useContext(colorContext);
    const highestprice = cont.highestprice;
    const open = props.rate.open;
    const close = props.rate.close;
    const high = props.rate.high;
    const low = props.rate.low;
    const which = open>close?open:close;
    const lenth = open>close?(open-close):(close-open);

    return (
        <>
    <div className="candlestick" title={high}>
         <div className="candle" style={
            {'backgroundColor' : `${close>open?"green":"red"}`,
             'height': `${ 400*lenth/highestprice}px`,
             'marginTop': `${400/highestprice*(cont.topprice-which)}px`}}></div> 
         <div className="candle2" style={
            {'backgroundColor' : `${close>open?"green":"red"}`,
            'height': `${ 400*lenth/highestprice}px`}}></div>
         <div className="stick" style={
            {'height': `${ 400*(high-low)/highestprice}px`,
             'marginTop': `${400/highestprice*(cont.topprice-props.rate.high)}px`}}> </div>
    </div>
        </>
    )
}
