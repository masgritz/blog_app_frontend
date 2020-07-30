import React from 'react'

const BlogForm = ({ onSubmit, title, author, url }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Title:
        <input
          type="text"
          value={title.value}
          name="Title"
          onChange={({ target }) => title.onChange(target.value)} />
      </div>

      <div>
        Author:
        <input
          type="text"
          value={author.value}
          name="Author"
          onChange={({ target }) => author.onChange(target.value)} />
      </div>

      <div>
        URL:
        <input
          type="text"
          value={url.value}
          name="URL"
          onChange={({ target }) => url.onChange(target.value)} />
      </div>
      <button type="submit">Submit Blog</button>
    </form>
  )
}

export default BlogForm