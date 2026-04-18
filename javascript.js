function enviarPedidoWhatsApp() {
    const telefono = "34692191694"; 
    const seleccionados = document.querySelectorAll('.check-prod:checked');

    if (seleccionados.length === 0) {
        alert("¡Selecciona al menos un producto para tu reserva!");
        return;
    }

    let mensaje = "¡Hola! Me gustaría reservar estos productos:\n\n";
    let total = 0;

    seleccionados.forEach((item) => {
        const nombre = item.value;
        const precio = parseFloat(item.getAttribute('data-precio')) || 0;
        mensaje += `• ${nombre} (${precio.toFixed(2)}€)\n`;
        total += precio;
    });

    mensaje += `\n*TOTAL ESTIMADO: ${total.toFixed(2)}€*`;
    
    const urlFinal = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    // Esto abrirá el WhatsApp en una pestaña nueva
    window.open(urlFinal, '_blank');
}

function actualizarContador() {
    // 1. Buscamos TODOS los checkboxes que tengan la clase .check-prod y estén marcados
    const seleccionados = document.querySelectorAll('.check-prod:checked');
    
    // 2. Referencias a los textos del botón
    const contadorTexto = document.getElementById('cant-items');
    const precioTexto = document.getElementById('precio-total');
    const botonContainer = document.getElementById('btn-whatsapp');

    // 3. Si no encuentra el botón en el HTML, paramos para que no de error
    if (!contadorTexto || !precioTexto || !botonContainer) return;

    let total = 0;
    
    seleccionados.forEach((item) => {
        // Obtenemos el precio del atributo data-precio
        const precioVal = parseFloat(item.getAttribute('data-precio')) || 0;
        total += precioVal;
    });

    // 4. Escribimos los resultados en el HTML
    contadorTexto.innerText = seleccionados.length;
    precioTexto.innerText = total.toFixed(2);

    // 5. Mostramos o escondemos el botón
    if (seleccionados.length > 0) {
        botonContainer.style.display = "flex"; 
    } else {
        botonContainer.style.display = "none";
    }

    if (seleccionados.length > 0) {
        // Si hay productos: quitamos "hide" (por si estaba saliendo) y ponemos "show"
        botonContainer.style.display = "flex";
        botonContainer.classList.remove('hide');
        botonContainer.classList.add('show');
    } else {
        // Si no hay productos y el botón está visible:
        if (botonContainer.classList.contains('show')) {
            botonContainer.classList.remove('show');
            botonContainer.classList.add('hide');
            
            // Esperamos a que termine la animación de "bajar" antes de ocultarlo del todo
            setTimeout(() => {
                if (botonContainer.classList.contains('hide')) {
                    botonContainer.style.display = "none";
                }
            }, 400); // 400ms es la duración de la animación 'bajar'
        }
    }
}