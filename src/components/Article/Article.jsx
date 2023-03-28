import React from 'react'

import ArticleContent from '../ArticleContent'

import classes from './Article.module.scss'

export default function Article({ info }) {
  return (
    <div className={classes.article}>
      <ArticleContent info={info} />
    </div>
  )
}
