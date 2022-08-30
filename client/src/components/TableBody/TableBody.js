import React from 'react';
import {useSelector} from "react-redux";
import moment from "moment";
import "./TableBody.scss"
import {activateTicker, deleteTicker, disableTicker} from "../../api/api";

const TableBody = () => {

    const {finances, prevFinances} = useSelector(state => state.financesPage)

    const Delete = (ticker) => {
        deleteTicker(ticker).then(r => r)
    }
    const setClassName = (finance) => {
      if(finance.disabled){
          return "disabled"
      }
      else {
         return finance.price - prevFinances.filter(item => item.ticker === finance.ticker)[0]?.price > 0 ? "plus" : "minus"
      }
    }
    return (
        <tbody>
        {finances.map((finance) => <tr key={finance.ticker}
                                              className={setClassName(finance)}>
            <td>{finance.ticker}</td>
            <td>
                {finance.disabled
                ? <button onClick={() => activateTicker(finance.ticker)}>ACTIVATE</button>
                : <button onClick={() => disableTicker(finance.ticker)}>DISABLE</button>}
            </td>
            <td>{finance.exchange}</td>
            <td>{finance.price}</td>
            <td>{finance.change}</td>
            <td>{finance.change_percent}</td>
            <td>{finance.dividend}</td>
            <td>{finance.yield}</td>
            <td>{moment(finance.last_trade_time).format("DD MM YYYY hh:mm:ss")}</td>
            <td>
                <button onClick={() => Delete(finance.ticker)}>DELETE</button>
            </td>
        </tr>)}
        </tbody>
    );
};

export default TableBody;