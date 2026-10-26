RULES = [
    {
        "id": "R1",
        "condiciones": ["tarjeta", "credito", "debito", "nfc", "qr", "pago", "dinero", "efectivo"],
        "conclusion": "El sistema es compatible con múltiples medios de pago: Tarjetas débito/crédito, pagos NFC (sin contacto) y código QR."
    },
    {
        "id": "R2",
        "condiciones": ["datafono", "conexion", "internet", "signal", "senal", "falla", "error"],
        "conclusion": "Si el datáfono pierde conexión durante el pago, la operación se congela y se genera un aviso de 'estado pendiente' hasta restablecer la señal."
    },
    {
        "id": "R3",
        "condiciones": ["fruver", "fruta", "verdura", "peso", "balanza", "bascula", "kilo", "gramos"],
        "conclusion": "Para productos de fruver, debes seleccionar el ítem en la pantalla del catálogo y utilizar la báscula calibrada del puesto para pesarlo."
    },
    {
        "id": "R4",
        "condiciones": ["codigo", "barras", "escaner", "lector", "etiqueta", "desconocido"],
        "conclusion": "Si el código de barras no lee o está dañado, puedes buscar el producto manualmente en el buscador de la pantalla táctil o solicitar apoyo con el asistente de caja."
    },
    {
        "id": "R5",
        "condiciones": ["factura", "recibo", "papel", "tirilla", "imprimir"],
        "conclusion": "Si necesitas tu factura o comprobante de pago, recuerda verificar que la impresora tenga papel y retirarlo de la bandeja inferior al finalizar."
    },
    {
        "id": "R6",
        "condiciones": ["bolsa", "empacar", "plastico", "ecologica"],
        "conclusion": "Puedes agregar tus bolsas reutilizables o plásticas en cualquier momento del proceso seleccionando la opción correspondiente en la pantalla táctil."
    },
    {
        "id": "R7",
        "condiciones": ["ayuda", "asistencia", "empleado", "asesor", "supervisor", "atencion"],
        "conclusion": "Si requieres asistencia del personal (por ejemplo, para anular un producto, verificar una edad o desbloquear la caja), presiona el botón rojo de 'Llamar Asistencia' en la pantalla."
    },
    {
        "id": "R8",
        "condiciones": ["cancelar", "anular", "borrar", "eliminar", "reiniciar"],
        "conclusion": "Para eliminar un producto equivocado de tu lista de compras, selecciónalo en el resumen de la pantalla y presiona el botón de eliminar, o solicita ayuda al asistente si ya pasaste al método de pago."
    },
    {
        "id": "R9",
        "condiciones": ["edad", "alcohol", "licor", "restringido", "cerveza"],
        "conclusion": "La venta de bebidas alcohólicas o productos con restricción de edad requiere la autorización visual de un colaborador en caja. Por favor espera un momento mientras validamos."
    }
]

def evaluar_consulta(mensaje: str) -> str:
    mensaje_lc = mensaje.lower()
    respuestas = []

    for regla in RULES:
        if any(palabra in mensaje_lc for palabra in regla["condiciones"]):
            respuestas.append(regla['conclusion'])

    if respuestas:
        return "\n\n".join(respuestas)
    
    return "Por favor, intenta describir si se trata de un medio de pago, una falla en el datáfono, pesaje de fruver, código de barras o asistencia general."