import React from "react"
import styled from "styled-components"

const StyledInput = styled.input`
	padding:10px;
	width:100%;
` 

// eslint-disable-next-line react/prop-types
const Input = ({type, placeholder, id}) => {
	return (
		<StyledInput id={id} type={type} placeholder={placeholder} />
	)
}

export default Input