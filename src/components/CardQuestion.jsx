import React from 'react'
import './StyledCardQuestion.css'

const cardQuestion = (props) => {
    return (
        <div className={'cardBackground'}>
           {props.question}
        </div>
    )
}

export default cardQuestion