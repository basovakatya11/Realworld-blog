import React from 'react'
import { Spin as AntdSpin } from 'antd'

import classes from './Spin.module.scss'

export default function Spin() {
  return (
    <div className={classes.spin}>
      <AntdSpin size="large" tip="Loading..." />
    </div>
  )
}
