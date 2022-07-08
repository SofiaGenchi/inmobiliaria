const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');

toggle.addEventListener('click', () =>{
    toggle.classList.toggle('active')
    navigation.classList.toggle('active')
})

// PROPIEDADES
const propiedadUno = document.querySelector('.propiedadUno');
const estadoPropiedadUno = document.querySelector('.estado-prop-uno');
const nombrePropiedadUno = document.querySelector('.nombre-uno');
const precioUno = document.querySelector('.precio-uno');

// propiedad------dos-----
const propiedadDos = document.querySelector('.propiedadDos');
const estadoPropiedadDos = document.querySelector('.estado-prop-dos');
const nombrePropiedadDos = document.querySelector('.nombre-dos');
const precioDos = document.querySelector('.precio-dos')

// propiedad----tres----
const propiedadTres = document.querySelector('.propiedadTres');
const estadoPropiedadTres = document.querySelector('.estado-prop-tres');
const nombrePropiedadTres = document.querySelector('.nombre-tres');
const precioTres = document.querySelector('.precio-tres')

// propiedad----cuatro
const propiedadCuatro = document.querySelector('.propiedadCuatro');
const estadoPropiedadCuatro = document.querySelector('.estado-prop-cuatro');
const nombrePropiedadCuatro = document.querySelector('.nombre-cuatro');
const precioCuatro = document.querySelector('.precio-cuatro');


fetch('/propiedades.json')
    .then((res) => res.json())
    .then((data) => {
        propiedadUno.addEventListener('mouseenter', () => {
            estadoPropiedadUno.textContent = `${data[0].estado}`;
        })
        nombrePropiedadUno.textContent = `${data[0].nombre}`;
        precioUno.textContent += `${data[0].precio}`;



        propiedadDos.addEventListener('mouseenter', () => {
            estadoPropiedadDos.textContent = `${data[1].estado}`;
        })
        nombrePropiedadDos.textContent = `${data[1].nombre}`;
        precioDos.textContent += `${data[1].precio}`;


        propiedadTres.addEventListener('mouseenter', () => {
            estadoPropiedadTres.textContent = `${data[2].estado}`;
        })
        nombrePropiedadTres.textContent = `${data[2].nombre}`;
        precioTres.textContent += `${data[2].precio}`;


        propiedadCuatro.addEventListener('mouseenter', () => {
            estadoPropiedadCuatro.textContent = `${data[3].estado}`;
        })
        nombrePropiedadCuatro.textContent = `${data[3].nombre}`;
        precioCuatro.textContent += `${data[3].precio}`;

        propiedadUno.append(propiedadUno)
    })

// NOTICIAS
document.addEventListener('DOMContentLoaded', function(e) {
    const noticias = document.querySelectorAll('.noticia');

    let alturas = [];
    let alturaMaxima = 0;

    const aplicarAlturas = (function aplicarAlturas(){

        noticias.forEach(noticia => {

            if(alturaMaxima == 0){
                alturas.push(noticia.clientHeight);
            } else{
                noticia.style.height = alturaMaxima + "px";
            }
        });
        return aplicarAlturas;
    })();

    alturaMaxima = Math.max.apply(Math, alturas);

    aplicarAlturas();
});

// CONTACTO
const formulario = document.querySelector('#formulario');
const btnFormulario = document.querySelector('.btn');

let consultas = [];


formulario.addEventListener("submit", agregarConsulta);

formulario.addEventListener("DOCContentLoaded", () => {
    consultas = JSON.parse(localStorage.getItem('consultas')) || [];
    renderHTML();
})

function agregarConsulta(evt){
    evt.preventDefault();

    const consulta = document.querySelector('#consulta').value;
    const cliente = document.querySelector("#name").value;
    const telefono = document.querySelector("#number").value;
    const email = document.querySelector("#email").value;
    const asunto = document.querySelector("#asunto").value;


    const consultaObj = {
        id: Date.now(),
        cliente: cliente,
        email: email,
        telefono: telefono,
        asunto: asunto,
        consulta: consulta
    };

    consultas.push(consultaObj);
    console.dir(consultas);

    if (cliente === "" || email === "" || asunto === "" || consulta === "") {
        alerta();
        return;
    } else{
        enviarConsulta();
    }
    limpiarHTML();

}

function renderHTML(){
    limpiarHTML();
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('consultas', JSON.stringify(consultas));
}

function limpiarHTML(){
    formulario.reset();
}

function enviarConsulta(){
    btnFormulario.addEventListener('click', () => {
        Toastify({
            text: 'Gracias por contactarse',
            duration: 3000,
            gravity: 'top',
            position: 'center',
            style: {
                background: 'brown'
            }
        }).showToast();
    })
}

function alerta(){
    swal({
        title: "Completar espacios en blanco",
        text: "Para enviar correctamente su consulta debe completar los espacios en blanco",
        icon: "error",
    });
}
