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

/* =================================Ingreso datos usuarios================== */
//Declaro la funcion dividir
const dividir = (num1, num2) => num1 / num2

//declaro las cotizaciones
const valorDolar = 300
const valorBtc = 22976.86
const valorEth = 1633.22
const valorUsdc = 1
const valorTheos = 0.00035009

//creo la clase User
class User {
    constructor(name, lastName, email, monedaCambio, monto) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.monedaCambio = monedaCambio;
        this.monto = monto;
    }
    //esta funcion retorna el monto equivalente en dolares, del ingreso del usuario
    dolaresEquiv() {
        switch (this.monedaCambio) {
            case "pesos":
                return dividir(this.monto, valorDolar);
            default:
                return dividir(this.monto);
        }
    }
}

//simplifico el codigo del if
const users = JSON.parse(localStorage.getItem("users")) ?? []

//Para tomar los datos del formulario, creo las variables que necesito
const idForm = document.getElementById("formUser");

idForm.addEventListener("submit", (e) => {
    e.preventDefault();
    /*     const name = document.getElementById("name").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const monedaCambio = document.getElementById("monedaCambio").value;
        const monto = document.getElementById("monto").value;
     */
    let datForm = new FormData(e.target)

    //creo el objeto user
    //const user = new User(name, lastName, email, monedaCambio, monto);
    let user = new User(datForm.get('name'), datForm.get('lasName'), datForm.get('email'), datForm.get('monedaCambio'), datForm.get('monto'))

    //Agrego los datos del user al array
    users.push(user)
    //Guardo los datos del user en LocalStorage
    localStorage.setItem("users", JSON.stringify(user));
    //Ahora limpio el formulario
    formUser.reset();

    //Muestro el resultado creando una funcion
    realizarCambio(user);

})
/* hago el alert de Brujeria realizada */

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
const result = document.getElementById("divForm");

const realizarCambio = ((user) => {
    let aux = "";
    aux += `
                <h2 class="card-title">Hola ${user.name}</h2>
                <h3> Los ${user.monedaCambio} ${user.monto} que ingresaste equivalen a </h3>
    
                <div class="col-md-12 d-flex justify-content-evenly">
                            <div class="row">
                                <div class="col-md-auto">
                                    <div class="card cardUsuarios" style="width: 8rem;">
                                        <img src="img/btcLogo.svg" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h2>Bitcoin</h2>
                                            <p class="cardBtc">USD BTC ${dividir(user.dolaresEquiv(), valorBtc)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-auto">
                                    <div class="card cardUsuarios" style="width: 8rem;">
                                        <img src="img/ethLogo.svg" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h2>Ethereum</h2>
                                            <p class="cardBtc">ETH ${dividir(user.dolaresEquiv(), valorEth)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-auto">
                                    <div class="card cardUsuarios" style="width: 8rem;">
                                        <img src="img/usdcLogo.svg" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h2>USDC</h2>
                                            <p class="cardBtc">USDC ${dividir(user.dolaresEquiv(), valorUsdc)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-auto">
                                    <div class="card cardUsuarios" style="width: 8rem;">
                                        <img src="img/theosLogo.svg" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h2>THEOS</h2>
                                            <p class="cardBtc">THEOS ${dividir(user.dolaresEquiv(), valorTheos)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        `
    result.innerHTML = aux;
})