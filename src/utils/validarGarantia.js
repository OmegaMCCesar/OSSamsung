export const validarGarantia = (numeroSerie) => {
    if (numeroSerie.length !== 15) {
      return { valido: false, mensaje: 'Número de serie inválido. Debe tener 15 caracteres.' };
    }
  
    const añoLetra = numeroSerie[7];
    const mesLetra = numeroSerie[8];
  
    // Mapeo de letras a años y meses
    const años = { 'W': 2023, 'X': 2024, 'Y': 2025 };
    const meses = { '1': 'Enero', '2': 'Febrero', '3': 'Marzo', '4': 'Abril', '5': 'Mayo', '6': 'Junio', '7': 'Julio', '8': 'Agosto', '9': 'Septiembre', 'A': 'Octubre', 'B': 'Noviembre', 'C': 'Diciembre' };
  
    const año = años[añoLetra];
    const mes = meses[mesLetra];
  
    if (!año || !mes) {
      return { valido: false, mensaje: 'Código de año o mes inválido en el número de serie.' };
    }
  
    const fechaFabricacion = new Date(`${mes} 1, ${año}`);
    const fechaActual = new Date();
    const diferenciaAños = fechaActual.getFullYear() - fechaFabricacion.getFullYear();
    const diferenciaMeses = fechaActual.getMonth() - fechaFabricacion.getMonth();
  
    // Si la diferencia es mayor a 12 meses, el equipo está fuera de garantía
    if (diferenciaAños > 1 || (diferenciaAños === 1 && diferenciaMeses >= 0)) {
      return { valido: false, mensaje: `Equipo fuera de garantía. Año: ${año}, Mes: ${mes}.` };
    }
  
    return { valido: true, mensaje: `Equipo dentro del período de garantía. Año: ${año}, Mes: ${mes} ` };
  };