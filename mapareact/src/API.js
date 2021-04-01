import {Loader} from "./utils"

const regionBoundaries = map => {
	let latNordeste; let lngNordeste; let latSuldoeste; let lngSuldoeste; 

var obj1 = Object.keys(map.getBounds())[0]

var obj2 = Object.keys(map.getBounds())[1]

 latNordeste = map.getBounds()[obj1].i
 lngNordeste = map.getBounds()[obj1].i
 latSuldoeste = map.getBounds()[obj2].g
 lngSuldoeste = map.getBounds()[obj2].g

return {latNordeste, lngNordeste, latSuldoeste, lngSuldoeste}
}

const fetchStoresInTheRegion = map => {
	const {latNordeste, lngNordeste, latSuldoeste, lngSuldoeste} = regionBoundaries(map)
	const urlBase = "https://munddi.com/dev/pdvs"
	const btnSearch = document.querySelector("#btnSearchAddress")

	Loader(btnSearch, "loader")

	return fetch(`${urlBase}?ne_lat=${latNordeste}&ne_lng=${lngNordeste}&sw_lat=${latSuldoeste}&sw_lng=${lngSuldoeste}`)
		.then(response => response.json())
		.then(lojas => {
			
			Loader(btnSearch, "loader")
			return lojas
		})
}


export default fetchStoresInTheRegion
