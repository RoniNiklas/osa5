import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = { hyva: 0, neutraali: 0, huono: 0, kaikki: [], posiitivisia: 0, keskiarvo: 0 }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'hyva',
      numero: 1,
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({ hyva: 1, neutraali: 0, huono: 0, kaikki: [1], posiitivisia: 0, keskiarvo: 0 })
  })
  
})