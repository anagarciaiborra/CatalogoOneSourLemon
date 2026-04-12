function enviarPedidoWhatsApp() {
    // 1. Configuración de tu número (Sin espacios, sin el +)
    const telefono = "34692191694"; 
    
    // 2. Seleccionar solo los productos marcados
    const seleccionados = document.querySelectorAll('.check-prod:checked');

    // 3. Validación: Si no hay nada marcado, avisamos
    if (seleccionados.length === 0) {
        alert("¡Selecciona al menos un producto para tu reserva! ✨");
        return;
    }

    // 4. Construir el mensaje directamente
    let mensaje = "👋 ¡Hola! Me gustaría reservar estos productos:\n\n";
    let total = 0;

    seleccionados.forEach((item) => {
        const nombre = item.value;
        const precio = parseFloat(item.getAttribute('data-precio')) || 0;
        
        mensaje += `• ${nombre} (${precio.toFixed(2)}€)\n`;
        total += precio;
    });

    mensaje += `\n*TOTAL ESTIMADO: ${total.toFixed(2)}€*`;
    mensaje += `\n\n¿Están disponibles para pasarme ahora por el stand?`;

    // 5. Enviar a WhatsApp
    const urlFinal = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlFinal, '_blank');
}