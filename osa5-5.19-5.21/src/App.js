import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch({
      type: 'lisaa',
      stringi: event.target.anecdote.value
    })
    event.target.anecdote.value = ''
  }
  render() {
    const store = this.props.store

    const aanesta = (stringi) => {
      const aanesta2 = () => {
        store.dispatch({ type: "vote", stringi })
      }
      return aanesta2
    }

    const tulostaAnekdootit = () => {
      return (
        Object.entries(store.getState().anecdotes)
        .sort() //ensin aakkosjärjestykseen huvin vuoksi
        .sort((a,b) => { 
          return b[1] - a[1] 
        })
        .map(([key, value]) => {
          return (
            <div key={key}>
              <li>
                "{key}" has {value} votes
                <button onClick={aanesta(key)}>vote</button>
              </li>
            </div>
          )
        })
      )
    }

    const luoUusiAnekdootti = () => {
      return (
        <form onSubmit={this.addAnecdote}>
          <input name="anecdote" />
          <button type="submit">Create</button>
        </form>
      )
    }

    return (
      <div>
        <h1>Anecdotes</h1>
        {tulostaAnekdootit()}
        <h1>Create a new anecdote</h1>
        {luoUusiAnekdootti()}
      </div >
    )
  }
}

export { App }
