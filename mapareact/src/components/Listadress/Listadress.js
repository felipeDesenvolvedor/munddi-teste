/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

// eslint-disable-next-line no-unused-vars
const ListaStyled = styled.ul`
	overflow-x: scroll;
	overflow-y:scroll;

    list-style: none;
    background: #fff;
    max-height: 100%;
    padding: 0 10px;

	& {
		li {
			margin-top:20px;
			cursor:pointer;
		}

		li:last-child {
			margin-bottom:20px;
		}

		li{}
	}
`


class Listadress extends React.Component {
	constructor(props) {
		super(props)

	
		this.state = {
			"windowList":props.windowList
		}

		this.toggleInfoWindow = this.toggleInfoWindow.bind(this)
	}

	toggleInfoWindow() {
		let index = parseInt(event.target.getAttribute("index"))

		if(!index) {
			return
		}

		let infowindowMarker = this.props.windowList[index].infowindowMarker
		let map = this.props.windowList[index].map
		let marker = this.props.windowList[index].marker

		if(!event.target.classList.contains("selected")) {
			
			event.target.classList.add("selected")
			infowindowMarker.open(map, marker)
		}else {

			event.target.classList.remove("selected")
			infowindowMarker.close(map, marker)
		}
	}

	render() {

		if(!this.props.stateList) {
			return (
				<div></div>
			)
		}

		return (
			<ListaStyled onClick={this.toggleInfoWindow}>
				{this.props.stateList.map((loja, index) => (
					<li key={index} index={index}>{loja.name}</li>
				))}
			</ListaStyled>
		)
	}
}

export default Listadress