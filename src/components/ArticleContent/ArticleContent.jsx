/* eslint-disable indent */
import React, { useRef } from 'react'
import { format } from 'date-fns'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Popconfirm } from 'antd'

import { deleteArticle, favoriteArticle, unfavoriteArticle } from '../../store/articlesSlice'
import redheart from '../../assets/images/redheart.png'
import heart from '../../assets/images/heart.png'
import defaultAvatar from '../../assets/images/user-avatar.png'

import classes from './ArticleContent.module.scss'

function ArticleContent({ match, history, info }) {
  const keyNumber = useRef(11)
  const user = useSelector((state) => state.user)
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
  const onLikeClick = () => {
    if (user.token) {
      if (info.favorited) {
        dispatch(unfavoriteArticle(info.slug))
      } else {
        dispatch(favoriteArticle(info.slug))
      }
    }
  }
  const truncateString = (s, w) => (s.length > w ? `${s.slice(0, w)}...` : s)
  const buttonsGroup =
    user.token &&
    user.username === info.author.username &&
    (match.url === `/articles/${info.slug}/` || match.url === `/articles/${info.slug}`) ? (
      <div className={classes['buttons-group']}>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={onDeleteArticle}
          okText="Yes"
          cancelText="No"
          placement="right"
        >
          <button type="button" className={classes['delete-button']}>
            Delete
          </button>
        </Popconfirm>
        <button type="button" className={classes['edit-button']} onClick={() => history.push('edit')}>
          Edit
        </button>
      </div>
    ) : null
  return (
    <div className={classes.article}>
      <div className={classes['article-header']}>
        <div className={classes['article-title']} onClick={onClick} onKeyDown={onClick}>
          {truncateString(info.title, 55)}
        </div>
        <div className={classes['btn-like']} onClick={onLikeClick} onKeyDown={onLikeClick}>
          <div className={classes['heart-image']}>
            <img src={info.favorited ? redheart : heart} alt="Click to like" />
          </div>
          <div className={classes['likes-number']}>{info.favoritesCount}</div>
        </div>
      </div>
      <div className={classes['tags-group']}>
        {info.tagList.map((tag) => (
          <div key={`tag${keyNumber.current++}`} className={classes.tag}>
            {truncateString(tag, 20)}
          </div>
        ))}
      </div>
      <div className={classes['article-text']}>{truncateString(info.description, 630)}</div>
      <div className={classes['user-info-and-buttons']}>
        <div className={classes['user-info']}>
          <div>
            <div className={classes['user-name']}>{info.author.username}</div>
            <div className={classes['publication-date']}>{format(new Date(info.createdAt), 'MMMM d, yyyy')}</div>
          </div>
          <div className={classes['user-avatar']}>
            <img src={info.author.image ? info.author.image : defaultAvatar} alt="User's avatar" />
          </div>
        </div>
        {buttonsGroup}
      </div>
    </div>
  )
}

export default withRouter(ArticleContent)
