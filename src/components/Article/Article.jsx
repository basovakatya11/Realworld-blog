import React from 'react'
import classes from './Article.module.scss'
import ArticleContent from '../ArticleContent'

export default function Article({info}) {
   return(
    <div className={classes.article}>
        <ArticleContent info = {info}/>
    </div>
   )
}
