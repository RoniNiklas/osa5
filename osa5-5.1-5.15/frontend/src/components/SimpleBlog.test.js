import React from "react"
import { shallow } from "enzyme"
import Blog from "./SimpleBlog"

describe("<SimpleBlog />", () => {
    it("renders title and author and likes", () => {
        const blog = {
            author: "Make",
            title: "otsikko",
            url: "linkki",
            likes: "0",
            user: {
                name: "kayttaja",
            }
        }
        const blogComponent = shallow(<Blog blog={blog} />)
        const titleAndAuthorDiv = blogComponent.find(".titleAndAuthor")
        expect(titleAndAuthorDiv.text()).toContain("otsikko Make")
        const likesDiv = blogComponent.find(".likes")
        expect(likesDiv.text()).toContain("0 likes")
    })
})
describe("<SimpleBlog />", () => {
    it('clicking the button calls event handler twice', () => {
        const blog = {
            author: "Make",
            title: "otsikko",
            url: "linkki",
            likes: "0",
            user: {
                name: "kayttaja",
            }
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <Blog
                blog={blog}
                onClick={mockHandler}
            />
        )

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})
