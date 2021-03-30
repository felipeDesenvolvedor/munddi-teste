/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

// eslint-disable-next-line no-unused-vars
const ListaStyled = styled.ul`
   list-style: none;
    background: #fff;
    position: absolute;
    top: 200px;
    overflow-y: scroll;
    max-height: 50vh;
    padding: 32px;
    left: 20px;
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

		let infowindowMarker = this.props.windowList[index].infowindowMarker
		let map = this.props.windowList[index].map
		let marker = this.props.windowList[index].marker

		console.log(infowindowMarker)
		console.log(map)
		console.log(marker)
		console.log(index)
		


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