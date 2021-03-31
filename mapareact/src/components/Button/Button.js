import styled from "styled-components"
import "../../css/loader.css"

const Button = styled.button.attrs(({id}) => ({
	id:id
}))`
	width:65px;
	padding:0;
    /* border-radius: 0px 10px 10px 0px; */
    text-align: left;
    color: white;
    background: #5ec5ec;
    border: 1px #5ec5ec solid;
    cursor: pointer;
	text-align:center;
`

export default Button