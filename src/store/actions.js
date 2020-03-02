export const GET_DATA = 'GET_DATA'
export const PUT_DATA = 'PUT_DATA'

export function getData() {
    return {
        type: GET_DATA
    }
}

export function putData(data) {
    return {
        type: PUT_DATA,
        payload: createCorrectArray(data)
    }
}

export function createCorrectArray(data) {
    return Object.keys(data).map((item, index) => {
        return {
            id: index+1,
            name: item,
            image: `/images/${item.toLowerCase()}.png`,
            currencyValues: [
                {
                    currency: 'usd',
                    value: (data[item]['USD']).toFixed(2)
                },
                {
                    currency: 'uah',
                    value: (data[item]['UAH']).toFixed(2)
                },
                {
                    currency: 'rub',
                    value: (data[item]['RUB']).toFixed(2)
                },
            ]
        }
    })
}
