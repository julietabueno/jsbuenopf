/* ================================THEME================================= */

//cambiar theme
const botonDarkMode = document.getElementById("botonDarkMode")
const botonLightMode = document.getElementById("botonLightMode")
//chequeo el localStorage para ver si hay guardado el theme
let lightMode

//simplifico el codigo del if
localStorage.getItem("theme") ? (lightMode = localStorage.getItem("theme")) : (localStorage.setItem("theme", "dark"))

if (lightMode == "light") {
    document.body.classList.add("lightMode")
}

//BOTONES

botonLightMode.addEventListener("click", () => {
    document.body.classList.add("lightMode")
    localStorage.setItem("theme", "light")
})

botonDarkMode.addEventListener("click", () => {
    document.body.classList.remove("lightMode")
    localStorage.setItem("theme", "dark")
})
//===========================================APIs===================================
//==========DOLARES
//Traigo info de cotizaciones con API de CryptoYa!
const divDolar = document.getElementById("divDolar")
const valorDolar = consultarDolar();
//creo la funcion para consultar los valores el valor 
function consultarDolar() {
    fetch("https://criptoya.com/api/dolar")
        .then(response => response.json())
        .then((blue) => {
            valorDolar = blue
        })
}

consultarDolar()

setInterval(() => {
    consultarDolar()
}, 30000)
//==========BITCOIN
//Traigo info de cotizaciones con API de CryptoYa!
const divBitcoin = document.getElementById("divBitcoin")
const valorBtc = consultarBitcoin();

//creo la funcion para consultar los valores el valor del dolar
function consultarBitcoin() {
    fetch("https://criptoya.com/api/lemoncash/btc")
        .then(response => response.json())
        .then((ask) => {
         valorBtc = ask
        })
}

consultarBitcoin()

setInterval(() => {
    consultarBitcoin()
}, 30000)

//==========ETHEREUM
//Traigo info de cotizaciones con API de CryptoYa!
const divEthereum = document.getElementById("divEthereum")

//creo la funcion para consultar los valores el valor del dolar
function consultarEthereum() {
    fetch("https://criptoya.com/api/lemoncash/eth")
        .then(response => response.json())
        .then((ask) => {
            valorEth = ask
        })
}

consultarEthereum()

setInterval(() => {
    consultarEthereum()
}, 30000)

//==========USDC
//Traigo info de cotizaciones con API de CryptoYa!
const divUsdc = document.getElementById("divUsdc")

//creo la funcion para consultar los valores el valor del dolar
function consultarUSDC() {
    fetch("https://criptoya.com/api/lemoncash/usdc")
        .then(response => response.json())
        .then((ask) => {
            valorUsdc = ask
        })
}

consultarUSDC()

setInterval(() => {
    consultarUSDC()
}, 30000)



/* =================================Ingreso datos usuarios================== */

//Declaro la funcion dividir
const dividir = (num1, num2) => num1 / num2

//creo la clase Usuario
class Usuario {
    constructor(nombre, apellido, email, monto) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.monto = monto
    }
    dolaresEquiv() {
        return dividir(this.pesosCambio, valorDolar)
    }
}


//creo el array de objetos para los usuarios, vacio. Chequeando si ya existe en localStorage
const usuarios = JSON.parse(localStorage.getItem("usuarios")) ?? []

//Para tomar los datos del formulario, creo las variables que necesito
const idFormulario = document.getElementById("formulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const monto = document.getElementById("monto").value;


    //creo el objeto usuario
    const usuario = new Usuario(nombre, apellido, email, monto)

    //Agrego los datos del usuario al array
    usuarios.push(usuario)
    //Guardo los datos del usuario en LocalStorage
    localStorage.setItem("usuario", JSON.stringify(usuarios));
    //Ahora limpio el formulario
    idFormulario.reset();

    //Muestro el resultado creando una funcion
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


//Creo la funcion para mostrar el resultado
const resultado = document.getElementById("infoUsuarios");

const realizarCambio = (usuario) => {
    let aux = "";
    aux += `
    <h2 class="card-title">Hola ${usuario.nombre}</h2>

    <div class="card cardUsuarios" style="width: 18rem;">
        <div class="card-body">
            <h6 class="card-subtitle mb-2 ">Tus $${usuario.monto} equivalen a U$S ${dividir(usuario.monto, valorDolar)}</h6>
        </div>
    </div>
    
<div class="col-lg-6 col-md-12 d-flex justify-content-evenly">
                            <div class="row">
                                <div class="col-md-auto">
                                    <div class="card cardUsuarios" style="width: 8rem;">
                                        <img src="img/btcLogo.svg" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h2>Bitcoin</h2>
                                            <p class="cardBtc">BTC ${dividir(usuario.monto, valorBtc)}</p>
                                        </div>
                                        <div>
                                        <button id="btnCompra" class="btn btn-light btn-sm">Comprar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-auto">
                                    <div class="card cardUsuarios" style="width: 8rem;">
                                        <img src="img/ethLogo.svg" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h2>Ethereum</h2>
                                            <p class="cardBtc">ETH ${dividir(usuario.monto, valorEth)}</p>
                                        </div>
                                        <div>
                                        <button id="btnCompra" class="btn btn-light btn-sm">Comprar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-auto">
                                    <div class="card cardUsuarios" style="width: 8rem;">
                                        <img src="img/usdcLogo.svg" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h2>USDC</h2>
                                            <p class="cardBtc">USDC ${dividir(usuario.monto, valorUsdc)}</p>
                                        </div>
                                        <div>
                                        <button id="btnCompra" class="btn btn-light btn-sm">Comprar</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div> 
                        `

    resultado.innerHTML = aux;
}

/* 
//Muestro el localStorage
const botonIngresos = document.getElementById("botonIngresos");
const datosIngresos = document.getElementById("datosIngresos");

botonIngresos.addEventListener("click", () => {
    const usuarios = JSON.parse(localStorage.getItem("Usuario"));
    let aux = "";
    usuarios.forEach(usuario => {
        aux += `
       <table class="table">
            <thead>
                <tr>
                <th scope="col">Nombre y Apellido</th>
                <th scope="col">Dolares a cambiar</th>
                <th scope="col">e-mail</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>${usuario.nombre} ${usuario.apellido}</td>
                <td>U$D ${usuario.dolaresEquiv()}</td>
                <td>${usuario.email}</td>
                </tr>
            </tbody>
        </table>`
    });
    datosIngresos.innerHTML = aux;
}); */