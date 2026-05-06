import React from 'react'

const Error = ({text}) => {
  return (
    <div>
      <div class="alert alert-danger" role="alert">
            {text}
        </div>
    </div>
  )
}

export default Error
