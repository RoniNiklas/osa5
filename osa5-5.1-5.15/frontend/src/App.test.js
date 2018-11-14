import React from 'react'
import { mount } from "enzyme"
import Blog from "./components/Blog"
import ReactDOM from 'react-dom'
import App from './App'
import blogService from "./services/blogs"
jest.mock("./services/blogs")

describe("<App />", () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  
  it("doesn't show blogs if you're not logged on", () => {
    app.update()
    console.log(app.html())
    expect(app.text().toLowerCase()).not.toContain("blogit")
  })
})


