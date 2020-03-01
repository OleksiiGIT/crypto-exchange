import React from 'react'

export default ({id, image, name, currencyValues, changeSelectedCoin}) => {

    const renderExchangeData = () => {
        return currencyValues.map((item, index) => {
            return (
                <div key={index}>
                    <strong>{item.currency} :</strong>
                    <p>{item.value}</p>
                </div>
            )
        })
    }

    return (
        <div className="CurrencyItem" onClick={changeSelectedCoin.bind(this, id)}>
            <div className="image">
                <img src={image} alt={name}/>
                <h5>{name}</h5>
            </div>
            <div className="info">
                { renderExchangeData() }
            </div>
        </div>
    )
}