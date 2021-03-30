import fetchStoresInTheRegion from "./API"

const userLatLng = resultsAddress => {
	return {lat:resultsAddress[0].geometry.location.lat(), lng:resultsAddress[0].geometry.location.lng()}
}
  
const addMap = UserLatLng => {
	return new window.google.maps.Map(document.getElementById("map"), {
		center: UserLatLng,
		zoom:12,
	})
}
  
const addMarker = (UserLatLng, map, icon = null) => {
	return new window.google.maps.Marker({
		position:UserLatLng,
		map:map,
		icon
	})
}
  
const templateInfoWindow = ({name, street, city, lat, lng}) => {
   
	const containerInfoWindow = document.createElement("div")
  
	const nameElement = document.createElement("h2")
	const streetElement = document.createElement("span")
	const cityElement = document.createElement("span")
	const latElement = document.createElement("span")
	const lngElement = document.createElement("span")
  
	nameElement.textContent = name
	streetElement.textContent = street
	cityElement.textContent = city
	latElement.textContent = lat
	lngElement.textContent = lng
     
	containerInfoWindow.appendChild(nameElement)
	containerInfoWindow.appendChild(streetElement)
	containerInfoWindow.appendChild(cityElement)
	containerInfoWindow.appendChild(latElement)
	containerInfoWindow.appendChild(lngElement)
  
	return containerInfoWindow
}
  
const infowindow = ({name, street, city, lat, lng}) => {
	return new window.google.maps.InfoWindow({
		content: templateInfoWindow({name, street, city, lat, lng}),
	})
} 

  
const svgMarker = () => ({
	path:"M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
	fillColor: "#01aeef",
	fillOpacity: 0.6,
	strokeWeight: 0,
	rotation: 0,
	scale: 2,
	anchor: new window.google.maps.Point(15, 30),
})

  
// eslint-disable-next-line no-unused-vars
const buildComponentMap = (results, status) => {
	const UserLatLng = userLatLng(results)
	const map        = addMap(UserLatLng)
	addMarker(UserLatLng, map)
    
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
				})
			})
  
	}, 1000)
}
  
const searchForGeocoder = address => {
	const geocoder = new window.google.maps.Geocoder()
	geocoder.geocode({address}, (results, status) => buildComponentMap(results, status))
}


export {searchForGeocoder}