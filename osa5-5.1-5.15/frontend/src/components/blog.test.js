import React from "react"
import {shallow} from "enzyme"
import Blog from "./blog"


describe("<Blog />", () => {
    it("renders title and author and nothing else when it isnt clicked", () => {
        const blog = {
            author: "Make",
            title: "otsikko",
            url: "linkki",
            likes: "0",
            user: {
                name: "kayttaja",
            } 
        }
        const blogComponent = shallow(<Blog blog={blog} user={blog.user}/>)
        const blogDiv = blogComponent.find(".blog")
        expect(blogDiv.text()).toContain("\"otsikko\" by Make")
        expect(blogDiv.text()).not.toContain("likes")
    })
})
describe("<Blog />", () => {
    it("clicking opens up extra info", () => {
        const blog = {
            author: "Make",
            title: "otsikko",
            url: "linkki.fi",
            likes: "0",
            user: {
                name: "kayttaja",
            } 
        }
        const blogComponent = shallow(<Blog blog={blog} user={blog.user}/>)
        const clickableDiv = blogComponent.find(".blog")
        expect(clickableDiv.text().toLowerCase()).not.toContain("likes")
        clickableDiv.simulate("click")
        const afterClick = blogComponent.find(".blog")
        expect(afterClick.text().toLowerCase()).toContain("likes")
        expect(afterClick.text().toLowerCase()).toContain("linkki.fi")
        expect(afterClick.text().toLowerCase()).toContain("delete")
        expect(afterClick.text().toLowerCase()).toContain("added by kayttaja")
    })
})
