import React from 'react'
import './App.css'
import { createStore } from "redux"
import counterReducer from "./reducer"

const store = createStore(counterReducer)

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const keskiarvo = () => {
      if (store.getState().kaikki.length > 0) {
        let valinumero = 0;
        store.getState().kaikki.forEach(arvo => {
          valinumero = valinumero + arvo
        })

        return Number.parseFloat(valinumero / store.getState().kaikki.length).toPrecision(2)
      } else {
        return 0
      }
    }
    const positiivisia = () => {
      if (store.getState().kaikki.length > 0) {
        return Number.parseFloat(store.getState().hyva / store.getState().kaikki.length * 100).toPrecision(3)
      } else {
        return 0
      }
    }

    const button = (what, numero) => {
      const buttonHandler2 = () => {
        store.dispatch({ type: what, numero })
        store.dispatch({ type: "keskiarvo", argument: keskiarvo() })
        store.dispatch({ type: "positiivisia", argument: positiivisia() })
      }
      return buttonHandler2
    }
    const handleOneStatistic = (what, teksti, lisaArgumentti) => {
      return (
        <tr>
          <td> {teksti} </td>
          <td>{store.getState()[what]}{lisaArgumentti}</td>
        </tr>
      )
    }
    const handleStatistics = () => {
      if (store.getState().kaikki.length === 0) {
        return (
          <div>
            <h1>statistiikka</h1>
            <p> ei yhtään palautetta annettu</p>
          </div>
        )
      } else {
        return (
          <div>
            <h1>statistiikka</h1>
            <table>
              <tbody>
                {handleOneStatistic('hyva', 'Hyvä', null)}
                {handleOneStatistic('neutraali', 'Neutraali', null)}
                {handleOneStatistic('huono', 'Huono', null)}
                {handleOneStatistic('keskiarvo', 'Keskiarvo', null)}
                {handleOneStatistic('positiivisia', 'Positiivisia', "%")}
              </tbody>
            </table>
          </div>
        )
      }
    }
    return (
      <div>
        <div>
          <h1>anna palautetta</h1>
          <button onClick={button('hyva', 1)} >hyvä</button>
          <button onClick={button('neutraali', 0)} >neutraali</button>
          <button onClick={button('huono', -1)}>huono</button>
          {handleStatistics()}
          <button onClick={button('nollaa', 0)}>Nollaa tilasto</button>
        </div>
      </div>

    )
  }
}

export { App, store }
