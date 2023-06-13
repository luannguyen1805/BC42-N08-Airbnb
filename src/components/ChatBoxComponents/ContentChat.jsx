import React from 'react'

export default function ContentChat({ message, css, textLeftOrRight }) {
  return (
    <div className={textLeftOrRight}>
      <div className={css}>{message}</div>
    </div>
  )
}
