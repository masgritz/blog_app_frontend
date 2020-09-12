import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setNotification('Incorrect username or password!')
      setStatus('error')

      setTimeout(() => {
        setNotification(null)
        setStatus(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setNotification(`A new blog titled "${returnedBlog.title}" by ${returnedBlog.author} has been added.`)
      setStatus('success')

      setTimeout(() => {
        setNotification(null)
        setStatus(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setNotification('Invalid data')
      setStatus('error')

      setTimeout(() => {
        setNotification(null)
        setStatus(null)
      }, 5000)
    }

  }

  const loginForm = () => (
    <LoginForm
      onSubmit={handleLogin}
      username={{ value: username, onChange: setUsername }}
      password={{ value: password, onChange: setPassword }} />
  )

  const blogForm = () => (
    <BlogForm
      onSubmit={addBlog}
      title={{ value: title, onChange: setTitle }}
      author={{ value: author, onChange: setAuthor }}
      url={{ value: url, onChange: setUrl }} />
  )

  const notificationMessage = () => (
    <Notification message={notification} status={status} />
  )

  return (
    <div>
      <h2>blogs</h2>
      {notification === null
        ? <div></div>
        : notificationMessage()}
      {user === null
        ? loginForm()
        : <div>
          {user.name} logged in
          <button onClick={handleLogout}>Logout</button>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App