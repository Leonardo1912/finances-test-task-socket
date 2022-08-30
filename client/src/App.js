import './App.css';
import {useState} from "react";
import Finances from "./components/finaces/Finances";
import {updateTime} from "./strore/financesReducer";
import {useDispatch, useSelector} from "react-redux";
import {addTicker} from "./api/api";

function App() {

    const dispatch = useDispatch()

    const [time, setTime] = useState(3000)
    const [ticker, setTicker] = useState("")
    const [error, setError] = useState(false)

    const {finances} = useSelector(state => state.financesPage)

    const addNewTicker = () => {
        const upperCaseTicker = ticker.toUpperCase()
        let err = false
        if (ticker === "") {debugger
            setError(true)
        } else {
            for (let i = 0; i < finances?.length; i++) {
                if (finances[i].ticker == upperCaseTicker) {
                    setError(true)
                    err = true
                    break
                }
            }
            if (!err) {
                setError(false)
                addTicker(ticker).then(r => r)
            }
        }

    }

    return (
        <div className="App">
            <input type="number" onChange={event => setTime(event.target.value)} value={time}/>
            <button onClick={() => dispatch(updateTime(time))}>TIME</button>
            <
                input type="text" onChange={event => setTicker(event.target.value)} value={ticker}/>
            <button onClick={() => addNewTicker()}>ADD Ticker</button>
            {error && <div>Fill in the add ticker field or such a ticker already exists</div>}
            <Finances/>
        </div>
    );
}

export default App;
