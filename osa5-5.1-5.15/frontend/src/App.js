import React from "react"
import Blog from "./components/Blog"
import "./App.css"
import blogService from "./services/blogs"
import loginService from "./services/login"
import PropTypes from "prop-types"

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    Togglable.propTypes = {
      buttonLabel: PropTypes.string.isRequired,
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>Sulje viesti</button>
        </div>
      </div>
    )
  }
}



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      user: null,
      error: null,
      msg2user: null,
      author: "",
      title: "",
      url: "",
      blogs: [],
      newBlogFormVisible: false,
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }))
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: "", password: "", user })
      this.setState({newBlogFormVisible: false})
      this.setState({ msg2user: "Kirjautuminen onnistui" })
      setTimeout(() => {
        this.setState({ msg2user: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
        likes: 0,
      }
      await blogService.addNew(blog)
      const blogs = await blogService.getAll()
      this.setState({
        msg2user: "kirjoittajan " + this.state.author + " blogin \"" + this.state.title + "\" lisäys onnistui ",
        title: "",
        author: "",
        url: "",
        blogs: blogs,
      })
      setTimeout(() => {
        this.setState({ msg2user: null })
      }, 5000)
    } catch (error) {
      console.log(error)
      this.setState({
        error: 'blogin lisäys epäonnistui',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {

    const logOut = () => {
      const logOut2 = () => {
        try {
          window.localStorage.removeItem("loggedBlogAppUser")
          blogService.setToken("")
          this.setState({
            user: null,
            loginVisible: false,
            msg2user: "Uloskirjautuminen onnistui"
          })
          setTimeout(() => {
            this.setState({ msg2user: null })
          }, 5000)
        } catch (exception) {
          console.log(exception)
          this.setState({
            error: "Jotain meni pieleen"

          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000)
        }
      }
      return logOut2
    }

    const UserMessages = (props) => {
      if (this.state.msg2user !== null) {
        return (
          <div className="success">
            {this.state.msg2user}
          </div>
        )
      }
      if (this.state.error !== null) {
        return (
          <div className="error">
            {this.state.error}
          </div>
        )
      } else {
        return null
      }
    }

    const blogit = () => {
      return (
        <div>
          <h2>blogit</h2>
          <div>
            {
              this.state.blogs
                .sort(function (a, b) { return b.likes - a.likes })
                .map(blog => <Blog key={blog._id} blog={blog} user={this.state.user} />)
            }
          </div>
        </div>
      )
    }
    const loginForm = () => {

      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }
      return (
        <div>
          {UserMessages()}
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <h2>Kirjaudu sovellukseen</h2>

            <form onSubmit={this.login}>
              <div>
                Käyttäjätunnus
            <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleLoginFieldChange}
                />
              </div>
              <div>
                Salasana
            <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleLoginFieldChange}
                />
              </div>
              <button type="submit">Kirjaudu</button>
            </form>
          </div>
        </div>
      )
    }
    const newblogForm = () => {
      const hideWhenVisible = { display: this.state.newBlogFormVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.newBlogFormVisible ? '' : 'none' }
      return (
        <div>
          {UserMessages()}
          <p>
            Käyttäjänä {this.state.user.name}
          </p>

          <button onClick={logOut()}>Kirjaudu ulos</button>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ newBlogFormVisible: true })}>Luo uusi blogi</button>
          </div>
          <div style={showWhenVisible}>
            <h2>
              luo uusi blogi
        </h2>
            <form onSubmit={this.addBlog}>
              <div>
                Kirjoittaja
            <input
                  type="text"
                  name="author"
                  value={this.state.author}
                  onChange={this.handleLoginFieldChange}
                />
              </div>
              <div>
                Otsikko
            <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleLoginFieldChange}
                />
              </div>
              <div>
                Linkki
            <input
                  type="text"
                  name="url"
                  value={this.state.url}
                  onChange={this.handleLoginFieldChange}
                />
              </div>
              <button type="submit">Lisää blogi</button>
            </form>
            <button onClick={e => this.setState({ newBlogFormVisible: false, author: "", title:"", url:""})}>peruuta</button>
          </div>
          {blogit()}
        </div>
      )
    }

    return (
      <div>
        {this.state.user === null && loginForm()}
        {this.state.user !== null && newblogForm()}
        <div> </div>
        <Togglable buttonLabel="Avaa salainen viesti">
          En saanut ToggleAblea toimimaan älykkäästi formien kanssa.
          <Togglable buttonLabel="Avaa tuplasalainen viesti">
            Formien täyttäminen onnistui vain kirjain kerrallaan, jonka jälkeen esim. käyttäjätunnus-formia piti painaa uudestaan jokaisen kirjaimen jälkeen. Niinpä en käyttänyt ToggleAblea formeihin
          </Togglable>
        </Togglable>
      </div >
    )
  }
}

export default App
