import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          value={title}
          onChange={handleTitleChange} />
      </div>

      <div>
        Author:
        <input
          value={author}
          onChange={handleAuthorChange} />
      </div>

      <div>
        URL:
        <input
          value={url}
          onChange={handleUrlChange} />
      </div>
      <button type="submit">Submit Blog</button>
    </form>
  )
}

export default BlogForm