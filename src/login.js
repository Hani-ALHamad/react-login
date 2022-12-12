import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { submit, password, email } from './redux/user'

export function Login() {
    const states = useSelector((state) => [state.user.emailErrorMessage, state.user.passwordErrorMessage])
    const dispatch = useDispatch()
  
    //whenever the user enters data, they get dispatched and checked if they are valid
    
    //when both email and password becomes valid (emailErrorMessage and passwordErrorMessage equal "")...
    //the submit button will be unlocked and user will be able to submit the form
    return (
      <div className='login-container'>
        <h1>React Website</h1>
        <form 
            onSubmit={(e) => {
                e.preventDefault()
                dispatch(submit())
            }}>
            <div className='input-text'>
                <label>Email:</label>
                <input type="email" onChange={(e) => dispatch(email(e.target.value))}/>
                <div className='input-error-message'>{states[0]}</div>
            </div>
            <div className='input-text'>
                <label>Password:</label>
                <input type="password" onChange={(e) => dispatch(password(e.target.value))}/>
                <div className='input-error-message'>{states[1]}</div>
            </div>

            <input type="submit" value="Login" className='login-button'
            disabled={(states[0] === "" && states[1] === "") ? false : true} 
            />
        </form>
      </div>
    )
  }