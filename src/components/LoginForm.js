import React from 'react'

const LoginForm = ({ onSubmit, username, password }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Username:
        <input
          type="text"
          value={username.value}
          name="Username"
          onChange={({ target }) => username.onChange(target.value)} />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password.value}
          name="Password"
          onChange={({ target }) => password.onChange(target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm