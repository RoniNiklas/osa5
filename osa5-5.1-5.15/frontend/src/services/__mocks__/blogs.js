import axios from "axios"

const baseUrl = "http://localhost:3001/api/blogs"
let token = null

const blogs = [
  {
    author: "Make",
    title: "otsikko",
    url: "linkkiMaken",
    likes: "0",
    user: {
        name: "kayttaja",
    } 
  },
  {
    author: "Maija",
    title: "Maijan otsikko",
    url: "linkkiMaijan",
    likes: "0",
    user: {
        name: "kayttaja",
    } 
  }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = (receivedToken) => {
  token = "bearer ${receivedToken}"
}

const addNew = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
const deleteByIidee = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, addNew, setToken, update, deleteByIidee, blogs }
