import React from 'react'
import { Link } from "react-router-dom"

function AuthForm({ title, formsName, buttonText, onSubmit, children }) {
  return (
    <article className="authForm">
      <h2 className="authForm__title">{title}</h2>
      <form
        className="authForm__form"
        name={formsName}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button
          className="authForm__button"
          type="submit"
        >
          {buttonText}
        </button>
        {
          formsName === 'register' ?
            <Link className='authForm__link' to='/sign-in'>Уже зарегистрированы? Войти</Link> : ''
        }
      </form>
    </article>
  )
}

export default AuthForm