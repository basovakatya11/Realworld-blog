import React from 'react'
import classes from './SignInForm.module.scss'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/articlesSlice'
import { useForm } from 'react-hook-form'

function SignInForm ({match, location, history}) {
    const dispatch = useDispatch()
    const error = useSelector(state => state.error.loginError)
    const { register, handleSubmit, formState: {errors} } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        dispatch(loginUser(data))
    }
    const errorMessage = error ? <div className={classes['error-message']}>{error === "401" || error === "422"? 'Email address or password is incorrect' : `Authorization error, please try later, details: ${error}`}</div> : null
    return (
        <div className={classes['sign-in-form']}>
            <div className={classes.title}>Sign In</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email-address">Email address:</label>
                    <input id="email-address" type='text' style={errors?.email ? {border: '1px solid #F5222D'} : null} placeholder='Email address' {...register('email', {
                        required: "This field is required",
                        pattern: {
                            value: /^[a-zA-Z0-9/.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Email address is not correct"
                        }

                    })} />
                    <div className={classes['error-message']}>{errors?.email && <p>{errors?.email?.message || "Error!"}</p>}</div>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type='text' style={errors?.password ? {border: '1px solid #F5222D'} : null} placeholder='Password' {...register('password', {
                        required: "This field is required"
                    })} />
                    <div className={classes['error-message']}>{errors?.password && <p>{errors?.password?.message || "Error!"}</p>}</div>
                </div>
                {errorMessage}
                <div className={classes['login-button-field']} >
                    <input type="submit" className={classes['login-button']} value="Login" />
                    <div className={classes['sign-up-link']}>Don't have an account?<span onClick={() => history.push('sign-up')}>Sign Up</span></div>
                </div>
            </form>
        </div>
    )
}

export default withRouter(SignInForm)