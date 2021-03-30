import React from "react"
import Form from "./Form/Form"
import Button from "./Button/Button"
import Input from "./Input/Input"
import fetchStoresInTheRegion from "../API"
import {userLatLng, addMap, addMarker, infowindow, svgMarker} from "../utils" 
import Listadress from "./Listadress/Listadress"



class Components extends React.Component{
	constructor(props) {
		super(props)

		this.state = {
			"lojas":[],
			"windows":[]
		}

		this.buildComponentMap = this.buildComponentMap.bind(this)
		this.handleForm = this.handleForm.bind(this)
		this.handleButton = this.handleButton.bind(this)
	}

	handleButton () {
		const inputSearch = document.querySelector("#searchAdress")
		
		if(!inputSearch.value) {
			return
		}
		
		this.searchForGeocoder(inputSearch.value)
	}

	handleForm () {
		event.preventDefault()
		this.handleButton()
	}

	// eslint-disable-next-line no-unused-vars
	buildComponentMap (results, status) {
		const UserLatLng = userLatLng(results)
		const map        = addMap(UserLatLng)
	
		addMarker(UserLatLng, map)

		this.setState(state => {
			const lojas = state.lojas = []
			const windows = state.windows = []

			return {
				lojas,
				windows
			}
		})

		setTimeout(() => {
  
			fetchStoresInTheRegion(map)
				.then(lojas => {
					lojas.data.forEach(loja => {
						let storeLatLng = {lat:parseFloat(loja.lat), lng:parseFloat(loja.lng)}
						let marker = addMarker(storeLatLng, map, svgMarker())
  
						const infowindowMarker = infowindow({
							name:loja.name, street:loja.street, city:loja.city, lat:loja.lat, lng:loja.lng
						})
  
						marker.addListener("click", () => {
							infowindowMarker.open(map, marker)
						})
						
						this.setState(state => {
							const lojas = state.lojas.concat(loja)
							const windows = state.windows.concat({"infowindowMarker":infowindowMarker, "map":map, "marker":marker})
							
							return {
								lojas,
								windows
							}
						})
					})
				})
  
		}, 1000)
	}

	searchForGeocoder (address) {
		const geocoder = new window.google.maps.Geocoder()
		geocoder.geocode({address}, (results, status) => this.buildComponentMap(results, status))
	}

	componentDidMount(){
		this.searchForGeocoder("Avenida Paulista")
	}

	render() {
		return (
			<>
				<Form className="form__search" onSubmit={this.handleForm}>
					<Input id={"searchAdress"} type={"text"} placeholder={"Pesquisar Endere"} />
					<Button id={"btnSearchAddress"} text={"Buscar"} onClick={this.handleButton} />
				</Form>

				<div id="map"></div>
				
				<Listadress windowList={this.state.windows} stateList={this.state.lojas} />
			</>
		)
	}
}


export default Components	