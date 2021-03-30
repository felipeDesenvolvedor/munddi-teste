import React from "react"

// eslint-disable-next-line react/prop-types
const Button = ({text, id}) => {
	return (
		<button id={id}>{text}</button>
	)
}

export default Button