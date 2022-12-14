
/* ================================THEME================================= */

//cambiar theme
const botonDarkMode = document.getElementById("botonDarkMode")
const botonLightMode = document.getElementById("botonLightMode")
//chequeo el localStorage para ver si hay guardado el theme

let lightMode

localStorage.getItem("theme") ? (lightMode = localStorage.getItem("theme")) : (localStorage.setItem("theme", "dark"))

if (lightMode == "light") {
    document.body.classList.add("lightMode")
}

botonLightMode.addEventListener("click", () => {
    document.body.classList.add("lightMode")
    localStorage.setItem("theme", "light")
})

botonDarkMode.addEventListener("click", () => {
    document.body.classList.remove("lightMode")
    localStorage.setItem("theme", "dark")
})
//===========================================APIs===================================

//Declaro la funcion dividir
const dividir = (num1, num2) => num1 / num2
//creo las funciones para retornar las cotizaciones

//==========DOLARES
let valorDolar = 0
async function consultarDolar() {
    const cotizacion = await fetch("https://criptoya.com/api/dolar")
    const cotizacionParseada = await cotizacion.json()
    valorDolar = cotizacionParseada.blue
    return valorDolar
}

consultarDolar()

setInterval(() => {
    consultarDolar()
}, 30000)


//==========BITCOIN
let valorBitcoin = 0
async function consultarBitcoin() {
    const cotizacion = await fetch("https://criptoya.com/api/lemoncash/btc")
    const cotizacionParseada = await cotizacion.json()
    valorBitcoin = cotizacionParseada.ask
    return valorBitcoin
}

consultarBitcoin()

setInterval(() => {
    consultarBitcoin()
}, 30000)


//==========ETHEREUM
let valorEthereum = 0
async function consultarEthereum() {
    const cotizacion = await fetch("https://criptoya.com/api/lemoncash/eth")
    const cotizacionParseada = await cotizacion.json()
    valorEthereum = cotizacionParseada.ask
    return valorEthereum
}

consultarEthereum()

setInterval(() => {
    consultarEthereum()
}, 30000)

//==========USDC
let valorUSCD = 0
async function consultarUSDC() {
    const cotizacion = await fetch("https://criptoya.com/api/lemoncash/usdc")
    const cotizacionParseada = await cotizacion.json()
    valorUSCD = cotizacionParseada.ask
    return valorUSCD
}

consultarUSDC()

setInterval(() => {
    consultarUSDC()
}, 30000)

/* =================================Ingreso datos usuarios================== */class Usuario {
    constructor(nombre, apellido, email, monto) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.monto = monto
    }
}

const usuarios = JSON.parse(localStorage.getItem("usuarios")) ?? []

const idFormulario = document.getElementById("formulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const monto = document.getElementById("monto").value;

    const usuario = new Usuario(nombre, apellido, email, monto)

    usuarios.push(usuario)

    localStorage.setItem("usuario", JSON.stringify(usuarios));

    idFormulario.reset();

    realizarCambio(usuario);
})

btnForm.addEventListener("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Brujeria realizada',
        showConfirmButton: false,
        timer: 1500,
    })
})

const resultado = document.getElementById("infoUsuarios");

const realizarCambio = (usuario) => {
    let aux = "";
    aux += `
    <div class="container-fluid text-center">
            <div class="col card-body cardUsuarios">
                <h2 class="card-title">Hola ${usuario.nombre}</h2>
                <h3 class="card-subtitle py-1">Tus $${usuario.monto} equivalen a U$S ${(dividir(usuario.monto, valorDolar)).toFixed(3)}</h3>
            </div>
    
            <div class="row">
                <div class="col">
                    <div class="card cardUsuarios" >
                        <img src="img/logoBtn.svg" class="imgCard card-img-top img-fluid" alt="...">
                        <div class="card-body">
                            <h2>Bitcoin</h2>
                            <h3 class="cardBtc">BTC ${(dividir(usuario.monto, valorBitcoin)).toFixed(3)}</h3>
                        </div>
                    <div>
                        <button id="btnCompraBtc" class="btn btnStyle btn-sm">Comprar</button>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card cardUsuarios">
                    <img src="img/logoEth.svg" class="imgCard card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h2>Ethereum</h2>
                        <p class="cardBtc">ETH ${(dividir(usuario.monto, valorEthereum)).toFixed(3)}</p>
                    </div>
                    <div>
                        <button id="btnCompraEth" class="btn btnStyle btn-sm">Comprar</button>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card cardUsuarios">
                    <img src="img/logoUsdc.svg" class="imgCard card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h2>USDC</h2>
                        <p class="cardBtc">USDC ${(dividir(usuario.monto, valorUSCD)).toFixed(3)}</p>
                    </div>
                    <div>
                        <button id="btnCompraUSDC" class="btn btnStyle btn-sm">Comprar</button>
                    </div>
                </div>
            </div>
    </div>`

    resultado.innerHTML = aux;

    /* Agrego alertas de SA2 a los botones de comprar de las cards */
    let btnCompraBtc = document.getElementById("btnCompraBtc")
    let btnCompraEth = document.getElementById("btnCompraEth")
    let btnCompraUSDC = document.getElementById("btnCompraUSDC")
    
    //BITCOIN
    btnCompraBtc.addEventListener("click", () => {
        Swal.fire({
            title: 'Seguimos con la compra?',
            text: "Est??s por comprar Bitcoins",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4B0082',
            cancelButtonColor: '#CC0070',
            confirmButtonText: 'Si, compro!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Felicitaciones!',
                    'Acabas de confirmar tu compra de Bitcoins',
                    'OK'
                )
            }
        })
    })

    //EHTEREUM
    btnCompraEth.addEventListener("click", () => {
        Swal.fire({
            title: 'Seguimos con la compra?',
            text: "Est??s por comprar ETH",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4B0082',
            cancelButtonColor: '#CC0070',
            confirmButtonText: 'Si, compro!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Felicitaciones!',
                    'Acabas de confirmar tu compra de Ethereum',
                    'OK'
                )
            }
        })
    })

    //USDC
    btnCompraUSDC.addEventListener("click", () => {
        Swal.fire({
            title: 'Seguimos con la compra?',
            text: "Est??s por comprar USDC",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4B0082',
            cancelButtonColor: '#CC0070',
            confirmButtonText: 'Si, compro!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Felicitaciones!',
                    'Acabas de confirmar tu compra de USDC',
                    'OK'
                )
            }
        })
    })
}



