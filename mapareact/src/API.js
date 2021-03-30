const regionBoundaries = map => {
	let latNordeste = map.getBounds().Ra.i
	let lngNordeste = map.getBounds().La.i
	let latSuldoeste = map.getBounds().Ra.g
	let lngSuldoeste = map.getBounds().La.g
    
	return {latNordeste, lngNordeste, latSuldoeste, lngSuldoeste}
}

const fetchStoresInTheRegion = map => {
	const {latNordeste, lngNordeste, latSuldoeste, lngSuldoeste} = regionBoundaries(map)
	const urlBase = "https://munddi.com/dev/pdvs"
  
	return fetch(`${urlBase}?ne_lat=${latNordeste}&ne_lng=${lngNordeste}&sw_lat=${latSuldoeste}&sw_lng=${lngSuldoeste}`)
		.then(response => response.json())
		.then(lojas => lojas)
}


export default fetchStoresInTheRegion