import React from "react"
import blogService from "../services/blogs"

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      user: props.user,
      blogImportant: false,
      defunct: false
    }
  }

  render() {
    const handleBlogClick = () => {
      const handleBlogClick2 = () => {
        this.setState({
          blogImportant: !this.state.blogImportant
        })
      }
      return handleBlogClick2
    }
    const handleLike = () => {
      const handleLike2 = () => {
        this.state.blog.likes = this.state.blog.likes + 1
        blogService.update(this.state.blog.iidee, this.state.blog)
      }
      return handleLike2
    }

    const handleDelete = () => {
      const handleDelete2 = () => {
        const result = window.confirm('Poistetaanko ' + this.state.blog.title)
        if (result) {
          blogService.deleteByIidee(this.state.blog.iidee)
          this.setState({
            defunct: true
          })
        }
      }
      return handleDelete2
    }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 2,
      marginBottom: 5
    }

    if (this.state.defunct) {
      return (
        null
      )
    }

    if (this.state.blogImportant) {
      if (this.state.blog.user && this.state.user && this.state.blog.user.name === this.state.user.name) {
        return (
          <div style={blogStyle} onClick={handleBlogClick(this.state.blog)} className="blog">
            <p>"{this.state.blog.title}" by {this.state.blog.author}</p>
            <p>{this.state.blog.url}</p>
            <p>
              {this.state.blog.likes} likes
            <button onClick={handleLike()}>Like</button>
            </p>
            <p>added by {this.state.blog.user.name}</p>
            <button onClick={handleDelete()}>Delete</button>
          </div>
        )
      }
      if (this.state.blog.user) {
        return (
          <div style={blogStyle} onClick={handleBlogClick(this.state.blog)} className="blog" >
            <p>"{this.state.blog.title}" by {this.state.blog.author}</p>
            <p>{this.state.blog.url}</p>
            <p>
              {this.state.blog.likes} likes
            <button onClick={handleLike()}>Like</button>
            </p>
            <p>added by {this.state.blog.user.name}</p>
          </div>
        )
      }
      return (
        <div style={blogStyle} onClick={handleBlogClick(this.state.blog)} className="blog" >
          <p>"{this.state.blog.title}" by {this.state.blog.author}</p>
          <p>{this.state.blog.url}</p>
          <p>{this.state.blog.likes} likes
          <button onClick={handleLike()}>Like</button>
          </p>
          <p>added by someone</p>
          <button onClick={handleDelete()}>Delete</button>
        </div>
      )

    }
    return (
      <div style={blogStyle} onClick={handleBlogClick(this.state.blog)} className="blog" >
        "{this.state.blog.title}"
        {" by "}
        {this.state.blog.author}
      </div>
    )
  }
}


export default Blog
