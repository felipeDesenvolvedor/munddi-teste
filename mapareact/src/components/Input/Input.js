import React from "react"

// eslint-disable-next-line react/prop-types
const Input = ({type, placeholder, id}) => {
	return (
		<input id={id} type={type} placeholder={placeholder}></input>
	)
}

export default Input