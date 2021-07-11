/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

// const url = "https://platzi-avo.vercel.app/api/avo";

//Web API
//Conectarnos al server
// Promise -> async / awit
// window
// 	.fetch(url)
// 	// Procesar la respuesta, y convertirla en JSON
// 	.then(response => response.json())
// 	// JSON -> data -> Renderizar info browser
// 	.then(responseJson => {
// 		// Todos los items
// 		const allItems = []

// 		responseJson.data.forEach(item => {
// 			// crear imagen
// 			let img = document.createElement("img")

// 			// crear titulo
// 			let title = document.createElement("h2")

// 			// crear precio
// 			let price = document.createElement("div")

// 			//crear contenedor
// 			const container = document.createElement("div")
// 			container.append(img, title, price)
// 			allItems.push(container)

// 		});

// 		document.body.append(...allItems)
// 	})







//Ejercicio con Async / Await

// mi url donde estan mis datos.
const baseUrl = "https://platzi-avo.vercel.app/";

const formatPrice = (price) => {

	let newPrice =	new window.Intl.NumberFormat('en-EN', {
		style: "currency",
		currency: "USD"
	}).format(price)


	return newPrice
}

// div para introducir mi información
const nodeApp = document.querySelector("#app")
nodeApp.addEventListener("click", (ev) => {
	if(ev.target.nodeName === 'H2') {
		alert("hola")
	}
})

	// Creo mi funcion asincrona la cual me traera mis datos.
async function traerDatos(url) {

	// creo una variable y espero la información que trae mi fetch y la guardo en la variable
	let response = await fetch(url)

	// creo una variable donde guardaré la información parseada a JSON
	let data = await response.json()

	// para ver si voy bien xd
	console.log(data)

	//pinto los datos llamando mi función
	pintarDatos(data.data)
}

// Hago una función aparte para la lógica de pintar los datos
function pintarDatos(data) {
	const allItems = []

	// voy a iterar cada elemento del arreglo que llega como parametro
	for(let i of data){

		// Creando imágen y su contenido
		const img = document.createElement("img")
		img.src = `${baseUrl}${i.image}`
		img.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"

		// Creando titulo y su contenido
		const title = document.createElement("h2")
		title.textContent = i.name
		title.className = 'text-lg'
		
		// Creando precio y su contenido
		const price = document.createElement("p")
		price.textContent = formatPrice(i.price)
		price.className = 'text-gray-600'

		//Wrap price & title
		const priceAndTitle = document.createElement('div')
		priceAndTitle.className = 'text-center md:text-left'
		priceAndTitle.append(title, price)

		// Contenedor separador de cada card
		const card = document.createElement("div")
		card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300 widt50"
		card.append(img, priceAndTitle)
		allItems.push(card)
	}
	nodeApp.append(...allItems)
}

// llamo mis datos :D 
traerDatos(`${baseUrl}api/avo`)