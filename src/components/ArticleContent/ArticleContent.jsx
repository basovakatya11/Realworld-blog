import React from "react";
import classes from './ArticleContent.module.scss'
import heart from '../../assets/images/heart.png'
import { format } from "date-fns";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle } from "../../store/articlesSlice";
import { Popconfirm } from "antd";
import defaultAvatar from '../../assets/images/user-avatar.png'

function ArticleContent({match, location, history, info}) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const onClick = () => {
        if (match.url === '/') {
            history.push(`articles/${info.slug}/`)
        } else if (match.url === '/articles/') {
            history.push(`${info.slug}/`)
        }
    }
    const onDeleteArticle = () => {
        dispatch(deleteArticle(info.slug))
        history.push('/')
    }
    const buttonsGroup = user.token && user.username === info.author.username && (match.url === `/articles/${info.slug}/` || match.url === `/articles/${info.slug}`)? (
        <div className={classes['buttons-group']}>
            <Popconfirm title="Delete the task" description="Are you sure to delete this task?" onConfirm={onDeleteArticle} okText="Yes" cancelText="No" placement='right'>
                <button type="button" className={classes['delete-button']}>Delete</button>
            </Popconfirm>
            <button type="button" className={classes['edit-button']} onClick={() => history.push('edit')}>Edit</button>
        </div>
    ) : null
    return (
    <div className={classes.article}>
        <div className={classes['article-header']}>
            <div className={classes["article-title"]} onClick={onClick}>{info.title}</div>
            <div className={classes["btn-like"]}>
                <div className={classes['heart-image']}><img src={heart}  alt="Click to like"/></div>
                <div className={classes["likes-number"]}>{info.favoritesCount}</div>
            </div>
        </div>
        <div className={classes["tags-group"]}>
            {info.tagList.map((tag) => <div key={tag} className={classes.tag}>{tag}</div>)}
        </div>
        <div className={classes["article-text"]}>{info.description}</div>
        <div className={classes["user-info-and-buttons"]}>
            <div className={classes['user-info']}>
                <div>
                    <div className={classes["user-name"]}>{info.author.username}</div>
                    <div className={classes["publication-date"]}>{format(new Date(info.createdAt), 'MMMM d, yyyy')}</div>
                </div>
                <div className={classes["user-avatar"]}><img src={info.author.image ? info.author.image : defaultAvatar} alt="User's avatar"/></div>
            </div>
            {buttonsGroup}
        </div>        
    </div>
    )
   
}

export default withRouter(ArticleContent)