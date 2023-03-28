import React from 'react'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { registerUser } from '../../store/articlesSlice'

import classes from './SignUpForm.module.scss'

function SignUpForm({ history }) {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const error = useSelector((state) => state.error.registerError)

  const onSubmit = ({ username, password, email }) => {
    dispatch(registerUser({ username, password, email }))
  }

  return (
    <div className={classes['sign-up-form']}>
      <div className={classes.title}>Create new account</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            style={errors?.username ? { border: '1px solid #F5222D' } : null}
            placeholder="Username"
            {...register('username', {
              required: 'This field is required',
              minLength: {
                value: 3,
                message: 'Your username needs to be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Your username needs to be no more than 20 characters',
              },
            })}
          />
          <div className={classes['error-message']}>
            {errors?.username && <p>{errors?.username?.message || 'Error!'}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email-address">Email address:</label>
          <input
            id="email-address"
            type="text"
            style={errors?.email ? { border: '1px solid #F5222D' } : null}
            placeholder="Email address"
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Email address is not correct',
              },
            })}
          />
          <div className={classes['error-message']}>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="text"
            style={errors?.password ? { border: '1px solid #F5222D' } : null}
            placeholder="Password"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to be no more than 40 characters',
              },
            })}
          />
          <div className={classes['error-message']}>
            {errors?.password && <p>{errors?.password?.message || 'Passwords must match'}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="repeat-password">Repeat password:</label>
          <input
            id="repeat-password"
            type="text"
            style={errors?.repeatPassword ? { border: '1px solid #F5222D' } : null}
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'This field is required',
              validate: (value, formValues) => {
                return value === formValues.password
              },
            })}
          />
          <div className={classes['error-message']}>
            {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'Passwords must match'}</p>}
          </div>
        </div>
        {error && (
          <div className={classes['error-message']}>
            {error.username ? `Username ${error.username}` : 'Authorization error, please try again later'}
          </div>
        )}
        <div className={classes['personal-data-consent']}>
          <input
            className={classes['custom-checkbox']}
            id="personal-data-consent"
            type="checkbox"
            {...register('personalDataConsent', {
              required: true,
            })}
          />
          <label
            htmlFor="personal-data-consent"
            className={errors?.personalDataConsent ? classes['need-to-check'] : null}
          >
            I agree to the processing of my personal information
          </label>
        </div>
        <div>
          <input type="submit" className={classes['create-button']} value="Create" />
          <div className={classes['sign-in-link']}>
            Already have an account?
            <span onClick={() => history.push('sign-in')} onKeyDown={() => history.push('sign-in')}>
              Sign In
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default withRouter(SignUpForm)
