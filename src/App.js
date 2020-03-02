import React, {useState, useEffect} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import Currency from "./Currency";
import {useDispatch, useSelector} from "react-redux";
import {getData} from "./store/actions";

function App() {
    const dispatch = useDispatch()
    const dataExchange = useSelector(state => state.data);
    useEffect(() => {dispatch(getData())}, [])

    const [selectedCoin, setSelectedCoin] = useState({})

    useEffect(() => {
        setSelectedCoin(dataExchange.find(item => item.name === 'BTC'))
    }, [dataExchange])

    const [activeRadio, setActiveRadio] = useState('uah_sel')

    const [result, setResult] = useState('')

    const [number, setNumber] = useState('')

    useEffect(() => {
        if (number) {
            const pos = selectedCoin.currencyValues.find(item => {
                return item.currency === activeRadio.split('_')[0]
            })

            setResult(`${number}${selectedCoin.name} will be ${(pos.value * number).toFixed(2)} in ${pos.currency.toUpperCase()}`)
        } else {
            setResult('Input correct value')
        }
    }, [selectedCoin, activeRadio, number])

    const changeSelectedCoin = value => {
        setSelectedCoin(dataExchange.find(item => item.id === value))
    }

    const renderList = () => dataExchange.map(item => <Col lg={4} sm={12} key={item.id}>
        <Currency
            id={item.id}
            name={item.name}
            image={item.image}
            currencyValues={item.currencyValues}
            changeSelectedCoin={changeSelectedCoin}
        />
    </Col>)

    const radioChange = event => {
        setActiveRadio(event.target.id)
    }

    function isEmpty(obj) {
        for (let key in obj) {
            return false;
        }
        return true;
    }

    return (
        <div className="entryPoint">
            {!isEmpty(dataExchange) ?
                <Container>
                    <Row>
                        { renderList() }
                    </Row>
                    <h3 className="selectedCoin">Selected coin: {selectedCoin ? selectedCoin.name : 'BTC'}</h3>
                    <div className="insertValue">
                        <label>
                            Volume:
                            <input type="number" value={number} onChange={e => setNumber(e.target.value)}/>
                        </label>
                        <div className="radioInputs">
                            <div className={activeRadio === 'uah_sel' ? 'active' : null}>
                                <input type="radio" id="uah_sel" name="currency" onChange={radioChange.bind()}/>
                                <label htmlFor="uah_sel">uah</label>
                            </div>
                            <div className={activeRadio === 'usd_sel' ? 'active' : null}>
                                <input type="radio" id="usd_sel" name="currency" onChange={radioChange.bind()}/>
                                <label htmlFor="usd_sel">usd</label>
                            </div>
                            <div className={activeRadio === 'rub_sel' ? 'active' : null}>
                                <input type="radio" id="rub_sel" name="currency" onChange={radioChange.bind()}/>
                                <label htmlFor="rub_sel">rub</label>
                            </div>
                        </div>
                    </div>
                    <div className="result">
                        <h3>{result}</h3>
                    </div>
                </Container>
                : <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
        </div>
    );
}

export default App;
