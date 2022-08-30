import React, {useEffect} from 'react';
import TableHead from "../TableHead/TableHead";
import TableBody from "../TableBody/TableBody";
import {getFinances} from "../../strore/financesReducer";
import {useDispatch, useSelector} from "react-redux";
import socket from "../../socket";

const Finances = () => {

    const dispatch = useDispatch()
    const {time} = useSelector(state => state.financesPage)
    useEffect(() => {
        socket.emit("start", time)
        dispatch(getFinances())
        return () => {
            socket.disconnect()
            socket.connect()
        }
    }, [time])
    const {finances, prevFinances} = useSelector(state => state.financesPage)
    console.log("new", finances)
    console.log("prev", prevFinances)


    if (finances.length === 0) {
        return <div>LOADING...</div>
    }

    return (
        <table>
            <TableHead/>
            <TableBody/>
        </table>
    );
};

export default Finances;