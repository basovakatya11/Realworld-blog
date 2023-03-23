import React from 'react'
import classes from './Header.module.scss'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../assets/images/user-avatar.png'
import { logOut } from '../../store/articlesSlice'

function Header({match, location, history}) {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const buttonsGroup = user.token ? 
        <div className={classes['buttons-group']}>
            <button type="button" className={classes['btn-create-article']} onClick={() => history.push('/new-article')}>Create article</button>
            <div className={classes['user-profile']} onClick={() => history.push('/profile')}>
                <div className={classes.username}>{user.username}</div>
                <div className={classes['user-avatar']}><img src={user.image ? user.image : avatar} alt="User's avatar"/></div>
            </div>
            <button type="button" className={classes['btn-log-out']} onClick={() => dispatch(logOut())}>Log Out</button>
        </div>
        :
        <div>
            <button type="button" className={classes['btn-sign-in']} onClick={() => history.push('/sign-in')}>Sign In</button>
            <button type="button" className={classes['btn-sign-up']} onClick={() => history.push('/sign-up')}>Sign Up</button>
        </div>
    return (
        <div className={classes.header}>
            <div className={classes.title} onClick={() => history.push('/')}>Realworld Blog</div>
            {buttonsGroup}
        </div>
    )
}

export default withRouter(Header)