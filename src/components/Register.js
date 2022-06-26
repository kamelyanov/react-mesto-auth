import AuthForm from "./AuthForm"
import React, {useState} from "react"

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="logIn">
      <AuthForm
        title="Регистрация"
        formsName="register"
        buttonText="Зарегистрироваться"
        onSubmit={console.log("submit")}
      >
        <input
          className="authForm__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email || ''}
          minLength="6"
          maxLength="40"
          onChange={console.log("value")}
          required
        >
        </input>
        <input
          className="authForm__input"
          name="password"
          type="password"
          placeholder="Password"
          value={[password] || ''}
          minLength="6"
          maxLength="40"
          onChange={console.log("value")}
          required
        >
        </input>
      </AuthForm>
    </div>
  )
}

export default Register