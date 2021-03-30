import React from "react"
import styled from "styled-components"
import "../../css/loader.css"

const StyledButton = styled.button`
	width:65px;
	padding:0;
`

// eslint-disable-next-line react/prop-types
const Button = ({id}) => {
	return (
		<StyledButton id={id}><span>Buscar</span></StyledButton>
	)
}

export default Button