import React from "react"
import Form from "./Form/Form"
import Button from "./Button/Button"
import Input from "./Input/Input"
import {searchForGeocoder} from "../utils" 



class Components extends React.Component{
	constructor(props) {
		super(props)

		this.handleForm = this.handleForm.bind(this)
		this.handleButton = this.handleButton.bind(this)
	}

	handleButton () {
		const inputSearch = document.querySelector("#searchAdress")
		
		if(!inputSearch.value) {
			return
		}
		
		searchForGeocoder(inputSearch.value)
	}

	handleForm () {
		event.preventDefault()
		this.handleButton()
	}


	componentDidMount(){
		searchForGeocoder("Avenida Paulista")
	}

	render() {
		return (
			<>
				<Form className="form__search" onSubmit={this.handleForm}>
					<Input id={"searchAdress"} type={"text"} placeholder={"Pesquisar Endere"} />
					<Button id={"btnSearchAddress"} text={"Buscar"} onClick={this.handleButton} />
				</Form>

				<div id="map"></div>
			</>
		)
	}
}


export default Components	