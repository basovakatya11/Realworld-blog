import React, {useState, useRef, useEffect} from 'react'
import classes from './ArticleFormTemplate.module.scss'
import { useForm } from 'react-hook-form'

export default function ArticleFormTemplate({onSubmit, title, articleInfo = null}) {
  const { register, unregister, handleSubmit, formState: {errors}, setValue} = useForm()
  const [tags, setTags] = useState([])
  const tagNumber = useRef(2)
  const onDeleteTag = (event) => {
    setTags((state) => state.filter((tag) => tag !== event.target.previousSibling.name))
    unregister(event.target.previousSibling.name)
  }

  useEffect(() => {
    if (articleInfo) {
      articleInfo.title && setValue('title', articleInfo.title)
      articleInfo.description && setValue('description', articleInfo.description)
      articleInfo.body && setValue('text', articleInfo.body)
      if (articleInfo.tagList) {
        for (let tag of articleInfo.tagList) {
          const tagRegisterName = `tag${tagNumber.current++}`
          setTags((state) => [...state, tagRegisterName])
          setValue(tagRegisterName, tag)
        }
      }

    }
  }, [setValue, articleInfo])

  return (
    <div className={classes['article-form-card']}>
      <div className={classes.title}>{title}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' placeholder='Title' {...register('title', {
            required: "This field is required"
          })} />
          <div className={classes['error-message']}>{errors?.title && <p>{errors?.title?.message || "Error!"}</p>}</div>
        </div>
        <div>
          <label htmlFor='short-description'>Short description</label>
          <input type='text' id='short-description' placeholder='Short description' {...register('description', {
            required: "This field is required"
          })} />
          <div className={classes['error-message']}>{errors?.description && <p>{errors?.description?.message || "Error!"}</p>}</div>
        </div>
        <div>
          <label htmlFor='text'>Text</label>
          <textarea id='text' placeholder='Text' {...register('text', {
            required: "This field is required"
          })}></textarea>
          <div className={classes['error-message']}>{errors?.text && <p>{errors?.text?.message || "Error!"}</p>}</div>
        </div>
        <div className={classes['tags-field']}>
          <label>Tags</label>
          <div className={classes['tags-list-and-button']}>
            <div className={classes['tags-list']}>
              {tags.map((tag) => (
                <div key={tag}>
                  <input type='text' placeholder='Tag' {...register(tag)} />
                  <button type='button' className={classes['delete-tag-button']} onClick={onDeleteTag}>Delete</button>
                </div>
                )
              )}
            </div>
            <button type='button' className={classes['add-tag-button']} onClick={() => setTags(state => [...state, `tag${tagNumber.current++}`])}>Add tag</button>
          </div>
        </div>
        <input type='submit' value='Send' className={classes['send-button']}/>
      </form>
    </div>
  )
}