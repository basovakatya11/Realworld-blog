import React from 'react'
import classes from './EditProfileForm.module.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editProfile } from '../../store/articlesSlice'

export default function EditProfileForm() {
    const { register, handleSubmit, formState: {errors}, reset } = useForm()
    const error = useSelector((state) => state.error.editProfileError)
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        const updatedUserInfo = {}
        for (let key in data) {
            if (data.hasOwnProperty(key) && data[key].length > 0) {
                updatedUserInfo[key] = data[key]
            }
        }
        console.log(JSON.parse(JSON.stringify(updatedUserInfo)))
        dispatch(editProfile(updatedUserInfo))
        reset()
    }
    const errorMessage = error ? <div className={classes['error-message']}>Edit profile error, please try later, details: {error}</div> : null
    return (
        <div className={classes['edit-profile-form']}>
            <div className={classes['title']}>Edit Profile</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" placeholder="Username" {...register('username', {
                        required: "This field is required"
                    })} />
                    <div className={classes['error-message']}>{errors?.username && <p>{errors?.username?.message || "Error!"}</p>}</div>
                </div>
                <div>
                    <label htmlFor="email-address">Email address</label>
                    <input id="email-address" type="text" placeholder="Email address" {...register('email', {
                        required: "This field is required",
                        pattern: {
                            value: /^[a-zA-Z0-9/.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Email address is not correct"
                        }
                    })}></input>
                    <div className={classes['error-message']}>{errors?.email && <p>{errors?.email?.message || "Error!"}</p>}</div>
                </div>
                <div>
                    <label htmlFor="new-password">New password</label>
                    <input id="new-password" type="text" placeholder="New password" {...register('password', {
                        minLength: {
                            value: 6,
                            message: "Your new password needs to be at least 6 characters"
                        },
                        maxLength: {
                            value: 40,
                            message: "Your new password needs to be no more than 40 characters"
                        }
                    })}></input>
                    <div className={classes['error-message']}>{errors?.password && <p>{errors?.password?.message || "Error!"}</p>}</div>
                </div>
                <div>
                    <label htmlFor="avatar-image">Avatar image (url)</label>
                    <input id="avatar-image" type="text" placeholder="Avatar image" {...register('image', {
                        pattern: {
                            value: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                            message: "Image url is not correct"
                        }
                    })}></input>
                    <div className={classes['error-message']}>{errors?.image && <p>{errors?.image?.message || "Error!"}</p>}</div>
                </div>
                {errorMessage}
                <input type="submit" className={classes['save-button']} value="Save"/>
            </form>
        </div>
    )
}