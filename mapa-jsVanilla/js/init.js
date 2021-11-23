var init = () => {

const Loader = (element, className) => {
  element.classList.toggle(className)
}

const listaAdress = (storeName, map, marker, infowindowMarker) => {
  const listaAdressComponent = document.querySelector(".lista-adress")
  const li = document.createElement('li')

  li.textContent = storeName;

  li.addEventListener('click', event => {

    if(event.target.classList.toggle("selected")) {
      infowindowMarker.open(map, marker)
    }else {
      infowindowMarker.close(map, marker)
    }
  })

  listaAdressComponent.appendChild(li)
}

const handleHamburguer = () => {
  const btnHamburguer = document.querySelector("#btnHamburguer")

  btnHamburguer.addEventListener("click", () => {
    document.querySelector(".wrapper-listaAdress").classList.toggle("aberto")
  })
}

const userLatLng = resultsAddress => {
  return {lat:resultsAddress[0].geometry.location.lat(), lng:resultsAddress[0].geometry.location.lng()}
}

const addMap = UserLatLng => {
  return new window.google.maps.Map(document.getElementById("map"), {
      center: UserLatLng,
      zoom:12,
      mapTypeId:"roadmap",
      mapTypeControl: false
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
       containerInfoWindow.classList.add("info-window")

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

const regionBoundaries = map => {
  let latNordeste; let lngNordeste; let latSuldoeste; let lngSuldoeste; 

  let obj1 = Object.keys(map.getBounds())[0]

  let obj2 = Object.keys(map.getBounds())[1]

  latNordeste = map.getBounds()[obj1].i
  lngNordeste = map.getBounds()[obj1].i
  latSuldoeste = map.getBounds()[obj2].g
  lngSuldoeste = map.getBounds()[obj2].g

return {latNordeste, lngNordeste, latSuldoeste, lngSuldoeste}
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

const fetchStoresInTheRegion = () => {
	// const {latNordeste, lngNordeste, latSuldoeste, lngSuldoeste} = regionBoundaries(map)
	// const urlBase = "https://munddi.com/dev/pdvs"
	// const btnSearch = document.querySelector("#btnSearchAddress")

	// Loader(btnSearch, "loader")

	// return fetch(`${urlBase}?ne_lat=${latNordeste}&ne_lng=${lngNordeste}&sw_lat=${latSuldoeste}&sw_lng=${lngSuldoeste}`)
	return fetch("https://munddi.com/dev/pdvs?ne_lat=10&ne_lng=-30&sw_lat=-30&sw_lng=-70")
		.then(response => response.json())
		.then(lojas => {
			
			// Loader(btnSearch, "loader")
			return lojas
		})
}

const buildComponentMap = (results, status) => {
  const listaAdressComponent = document.querySelector(".lista-adress")
  const UserLatLng = userLatLng(results)
  const map        = addMap(UserLatLng)
  const markerUser = addMarker(UserLatLng, map)
  


  setTimeout(() => {

    listaAdressComponent.innerHTML = "";

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

            listaAdress(loja.name, map, marker, infowindowMarker)            
        })
    })

  }, 1000)
}

const searchForGeocoder = address => {
  const geocoder = new window.google.maps.Geocoder()
  geocoder.geocode({address}, (results, status) => buildComponentMap(results, status))
}

const handleSearch = () => {
  const btnSearch = document.querySelector("#btnSearchAddress")
  const inputSearch = document.querySelector("#searchAdress")
  const forSearch = document.querySelector(".form__search")

  forSearch.addEventListener("submit", event => event.preventDefault())

  btnSearch.addEventListener("click", () => {
    if(!inputSearch.value) {
      return
    }
    
    searchForGeocoder(inputSearch.value)
  })
}

  searchForGeocoder("Avenida Paulista")
  handleSearch()
  handleHamburguer()
}

document.addEventListener("DOMContentLoaded", () => {
  init()
})
