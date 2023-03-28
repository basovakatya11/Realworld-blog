import React from 'react'
import { Alert } from 'antd'

import classes from './ErrorMessage.module.scss'

export default function ErrorMessage({ details }) {
  return (
    <div className={classes['error-message']}>
      <Alert
        message="Error"
        description={`Something went wrong, but we'll fix it soon... Details: ${details}`}
        type="error"
        showIcon
      />
    </div>
  )
}
