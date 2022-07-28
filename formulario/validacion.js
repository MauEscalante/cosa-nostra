const formulario = document.getElementById('formulario');
//acceder a cada inputs
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ]{1,40}$/, // Letras , pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ]{1,40}$/, // Letras , pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10}$/ // 7 a 14 numeros.
}

//pongo todos los campos en falsos (incorrecto)
let campos = {
	nombre: false,
	apellido: false,
	password: false,
	correo: false,
	telefono: false
}



const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
    case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
    case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}



 //creamos funcion que recibe 3 parametros,la expresion regular, el input ingresado y en q campo (nombre, apellido, etc)
const validarCampo = (expresion, input, campo) => {
	//si la expresion regular es correcta
	if(expresion.test(input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
		//al entrar por correcto, actualizo a true
		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo_password2`).classList.add('formulario_grupo-incorrecto');
		document.getElementById(`grupo_password2`).classList.remove('formulario_grupo-correcto');
		document.querySelector(`#grupo_password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo_password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_password2 .formulario_input-error`).classList.add('formulario_input-error-activo');
		campos['password'] = false;
	}
	 else {
		document.getElementById(`grupo_password2`).classList.remove('formulario_grupo-incorrecto');
		document.getElementById(`grupo_password2`).classList.add('formulario_grupo-correcto');
		document.querySelector(`#grupo_password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo_password2 i`).classList.add('fa-check-circle');
		
		document.querySelector(`#grupo_password2 .formulario_input-error`).classList.remove('formulario_input-error-activo');
		campos['password'] = true;
	}
}





//cuando cambie de casillero valida
inputs.forEach((input) => {
  input.addEventListener('change', validarFormulario);
	
});


formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	const terminos = document.getElementById('terminos');
	//redirige a pagina principal
	if(campos.nombre && campos.apellido && campos.password  && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();
		// muestra mensaje de exito 
		document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
		
		setTimeout("redireccionar()", 2000);
	
		//bora mensaje de error desp de un lapso de 2 segundos
	} else {
		document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
		setTimeout(() => {
			document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
		}, 3000);
		
	}
});


const redireccionar=()=>{
	window.location.href = "https://cosa-nostra.netlify.app/";
  }
   
  





