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

    mensaje += `\n💰 *TOTAL ESTIMADO: ${total.toFixed(2)}€*`;
    
    const urlFinal = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    // Esto abrirá el WhatsApp en una pestaña nueva
    window.open(urlFinal, '_blank');
}