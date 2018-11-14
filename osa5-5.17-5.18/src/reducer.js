
const counterReducer = (state = { hyva: 0, neutraali: 0, huono: 0, kaikki: [], posiitivisia: 0, keskiarvo: 0 }, action) => {
    console.log(action)
    switch (action.type) {
        case 'hyva':
            return Object.assign({}, state, { hyva: state.hyva + 1, kaikki: state.kaikki.concat(action.numero) })
        case 'neutraali':
            return Object.assign({}, state, { neutraali: state.neutraali + 1, kaikki: state.kaikki.concat(action.numero) })
        case 'huono':
            return Object.assign({}, state, { huono: state.huono + 1, kaikki: state.kaikki.concat(action.numero) })
        case 'nollaa':
            return Object.assign({}, state, { hyva: 0, huono: 0, neutraali: 0, kaikki: [] })
        case 'positiivisia':
            return Object.assign({}, state, { positiivisia: action.argument })
        case "keskiarvo":
            return Object.assign({}, state, { keskiarvo: action.argument })
        default:
            return state
    }
}

export default counterReducer
