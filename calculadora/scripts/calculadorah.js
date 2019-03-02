let tiempoMaximo = 30;		// Tiempo máximo que durará la prueba
let numeroMinimo = 100;		// Valor mínimo del número a calcular
let numeroMaximo = 200;		// Valor máximo del número a calcular
let contador;				// Contador del tiempo
let numeros = new Array();		// Array para guardar los números del panel
let operadores = new Array();	// Array para guardar los operadores del panel

window.onload = function () {

	// Completar...
	// Asignar al botón 'Comenzar' el evento comienzaElJuego al hacer click (1 línea)
	document.getElementById("btn_comenzar").onclick = comienzaElJuego;
	cambiaCursor("default", false);	// Así no se pueden seleccionar ni los números, ni los operadores
}

/* Inicializa el temporizador para que se actualiza cada segundo,  los valores del panel 
	y cambia el cursor para que se puedan seleccionar los números y los operadores */
function comienzaElJuego() {
	if (contador)
	{
		clearInterval(contador);
	}
	contador = setInterval(actualizaTiempo, 1000);
	
	// Completar (4 líneas)...
	// Inicializa el valor del panel_info: 1) Asignar tiempo máximo. 
	//2) Desabilita el botón COMENZAR para que no se pueda tocar
	document.getElementById("btn_comenzar").disabled = true;
	// 3) Cambiar el nombre del botón a "Jugando..."
	document.getElementById("btn_comenzar").innerHTML = "Jugando..."; 
	//4) Calcular el valor a Adivinar con la función math
	document.getElementById("robtener").value =  Math.floor(Math.random()*100+1);
	// Mostrar la información
	cambiaCursor("pointer", true);	// Ya se pueden seleccionar los números y los operadores
}

/* Actualiza el valor de tiempo del panel descontando 1 segundo en cada pasada, comprueba si se 
	ha agotado el tiempo: En este caso, se inicializa el temporizador	se muestra el mensaje 
	de tiempo agotado y se inicializa el panel para comenzar una nueva partida */
function actualizaTiempo() {
	let tiempo = document.getElementById("tiempo");
	let valor = tiempo.value - 1;
	tiempo.value = valor;

	if (valor <= 0) {
		tiempo.value = tiempoMaximo;
		clearInterval(contador);
		alert("Tiempo agotado");
		inicializaPanel();
	}
}

/* Borra e inicializa todos los elementos del panel (tanto en la cabecera como 
	los números y operadores contenidos */
function inicializaPanel() {
	
	// Completar... (15 líneas)
	// 1) Desactivar el acceso a las etiquetas (llamar a la función cambiaCursor con default y false)
	cambiaCursor("default", false);	
	// 2) Borrar todos los elementos que hay en el panel, accede al panel_operaciones y 
	// con un bucle elimina cada elemento con removeChild. 
	// 3) Vaciar los arrays números y operadores
	// 4) Reestablecer los valores de las etiquetas de panel_info, a los valores iniciales (tiempo, ractual, robtener)
	// 5) Habilita el botón ‘Comenzar’ y cambiarle el nombre a "Comenzar"
	// 6) Accediendo a los elementos de la clase "numeros", volver a reestablecer las etiquetas de usos, 
	// es decir, poner con valor ‘Usos 2’ y cambiar la clase a ‘usos’


}

/* Manejador del evento cuando se selecciona un número o un operador */
function numeroSeleccionado(event) {

	let numero = event.target; 
	// Completar... (Es el propio elemento seleccionado)
	let enlaceUsos = numero.nextElementSibling;// Completar... (Del elemento seleccionado queremos el label USOS)

	if (operacionPermitida(numero))
		if (actualizaUsos(enlaceUsos, -1)) {	// Si se puede decrementar el valor de usos		
			anadeElementoPanel(numero);
			actualizaResultado();
			compruebaResultado();
		}
}

function compruebaResultado() {
	
	// Completar... (2 líneas)
	let resActual = document.getElementById("ractual");
	let resObtener = document.getElementById("robtener");
	// Obtener los valores robener y ractual y compararlos para ver si lo hemos conseguido
	if ( resActual.value == resObtener.value) 
	{
		let tiempo = tiempoMaximo - document.getElementById("tiempo").value;
		alert("Ha conseguido calcular el resultado en " + tiempo + " segundos");
		clearInterval(contador);
		inicializaPanel();
	}
}

function actualizaResultado() {
	let resActual = document.getElementById("ractual");
	// Completar... (22 líneas)
	let res = 0;
	// Para calcular el resultado y actualizarlo, hace falta tener un número más que operadores
	if (numeros.length == 0) 
	{
		resActual.value = 0;
	}
	else if (numeros.length == (operadores.length + 1))
	{
		for (let i = 0; i < numeros.length; i++) 
		{
			if (operadores.includes("*")) 
			{
				res += numeros[i]*numeros[i + 1];
			}
			else if (operadores.includes("+")) 
			{
				res += numeros[i]+numeros[i + 1];
			}
			else if (operadores.includes("-")) 
			{
				res += numeros[i]-numeros[i + 1];
			}
			else if (operadores.includes("/")) 
			{
				res += numeros[i]/numeros[i + 1];
			}
		}

		resActual.value = res;
	}
	// Si se da esa condición procedemos a recorrer los arrays de operadores y números, e ir calculando la operación
	// Si solo hay un número en el array entonces ese es el resultado
	// Si no hay ningún valor en el array número (porque borres todo) debemos actualizar a 0 el resultado
	// Finalmente con el calculo realizado actualizamos el campo ractual

}

/* Se hace una copia del número u operador para incluirlo en el panel.
	El id será la letra c seguida del número de orden en el panel.
	Se le asigna un enlace para borrar el elemento y al enlace se le asigna un evento */

let i = 0;
function anadeElementoPanel(enlace) {
	let posNum = 0;
	let posOperador = 0;

	let copia = enlace.cloneNode(true);	// Duplicamos el elemento
	//let idCopia = enlace.getAttribute('id');
	// Completar... (11 líneas)
	// Sobre esta copia:
	if (enlace.parentNode.id.includes("n")) 
	{
		numeros[posNum] = enlace.parentNode.id;
		posNum++;
		console.log(numeros);
	}
	else
	{
		operadores[posOperador] = enlace.parentNode.id;
		posOperador++;
		console.log(operadores);
	}
	// 1) Añadimos al id la posición del elemento dentro del panel
	copia.setAttribute("id", copia.id + 'e' + i );
	i++;
	// 2) Ocultamos el stock (etiqueta  usos)
	// 3) Cambiamos el nombre de la clase a numerosCopia
	copia.setAttribute("class", "numerosCopia");
	// 4) Cambiamos el cursor del ratón a default
	cambiaCursor("default", false);
	// 5) Añadir enlace para poder eliminar el elemento
	copia.innerHTML= '<a href="" class="delete"></a>';
	// 6) Asignamos un evento para cuando se borre el elemento. (Manejador elementoBorrar)
	elementoBorrar();
	// 7) Añadir la copia creada al panel
	
	let panel = document.getElementById("panel_operaciones");
	panel.appendChild(copia);
	// 8) Si el elemento es un número (usando el id), añadirlo al array números y si es un operador, 
	
	
	// añadirlo al array operadores.

}

/* Incrementa o decrementa la cantidad del enlace pasado.
	enlace debe apuntar a un elemento que contiene la cadena 'Usos n' 
	Donde n es un número que será actualizado según el valor de 'cantidad' */
	
function actualizaUsos(enlace, cantidad) 
{

	// Completar... (22 líneas)

	let usos = enlace.innerHTML.split(" ");
	let u = Number(usos[1]);
	// Usando split troceamos el contenido del enlace y podemos obtener el número de usos
	
	
	if (u <= 0) 
	{
		enlace.setAttribute("class", "agotado");
		return false;
	}
	else
	{
		u = Number(usos[1]) + cantidad;
		enlace.innerHTML = "Usos " + u;
		return true;	
	}

	// Si cantidad es negativo, comprobaremos si nos hemos quedado a 0 para cambiar el class al elemento a "usos agotado"
	// Sumamos el parámetro cantidad (que puede ser negativo) a los usos que nos quedan de ese elemento	
	// si no, simplemente actualizamos los usos del elemento. 
	// Ojo en no dejar en negativo los usos, en ese casos devolvemos FALSE
	// Si es positivo sumamos usos, y nos aseguramos que el class sea "usos"
	// Devolvemos TRUE si hemos conseguido actualizar los usos
}

/* función que comprueba si se debe añadir un número o un operador.
	Nunca puede comenzar por operador, ni acabar en un operador */
function operacionPermitida(enlace) {
	return true;
	// Completar... (15 líneas)
	// Explicación y Pista dadas en el enunciado

}

/* Cambia el cursor de los números y operadores para que se puedan seleccionar */
function cambiaCursor(nCursor, activo) {
	// Completar... (6 líneas)
	let numeros = document.getElementsByClassName("numeros");
	for (let i = 0; i < numeros.length; i++) 
	{
		if (activo == true) 
		{
			numeros[i].addEventListener('click', numeroSeleccionado);  
		}
		else
		{
			numeros[i].addEventListener('click', null);			
		}
		numeros[i].style.cursor = nCursor;
	}

	// Recorrer 1 a 1 todos los elementos de la clase numero
	// y si activo es TRUE asignar a click el manejador numeroSeleccionado
	// en caso de ser FALSE desasignar el evento click con null. 
	// Finalmente cambiar el icono del ratón para ese elemento con el valor nCursor

}

function elementoBorrar() {
	/*var idElementoPadre = this.parentNode.id;
	var idElementoUltimo = this.parentNode.parentNode.lastChild.id;
	
	if (idElementoPadre == idElementoUltimo) {
		// Completar...	(10 líneas) Pista: Usar pop y removechild para eliminar del array y el nodo.
		// Usa el id del nodo (justo hasta la letra e. Usa substring y indexOf.) 
		// para saber el número o operador eliminado y subir en 1 su uso 
	}
	else {
		alert("Solamente se puede borrar el último número u operador");
	}

	return false;	// Se devuelve false para que no navegue a otra página (o recargue la actual)
					// Así alteramos el comportamiento de la etiqueta <a>*/
}
