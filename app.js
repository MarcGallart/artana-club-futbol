/**
 * ARTANA C.F. - CORE ENGINE
 * Arquitectura modular y limpia para la gestión de datos e IA local.
 */

// 1. BASE DE DATOS DEL CLUB (El historial de la temporada)
const HISTORIAL_PARTIDOS = [
    { jornada: 1, rival: "Betis de la Sierra", golesFavor: 3, golesContra: 1, condicion: "Local", fecha: "2026-02-15", goleadores: ["Carlos (2)", "Javi"] },
    { jornada: 2, rival: "Atlético Vallés", golesFavor: 1, golesContra: 2, condicion: "Visitante", fecha: "2026-02-22", goleadores: ["Dani"] },
    { jornada: 3, rival: "Deportivo Plana", golesFavor: 2, golesContra: 0, condicion: "Local", fecha: "2026-03-01", goleadores: ["Carlos", "Luis"] },
    { jornada: 4, rival: "Unión Minera", golesFavor: 0, golesContra: 0, condicion: "Visitante", fecha: "2026-03-08", goleadores: [] },
    { jornada: 5, rival: "Sporting Club", golesFavor: 4, golesContra: 2, condicion: "Local", fecha: "2026-03-15", goleadores: ["Carlos", "Javi", "Andrés (2)"] }
];

// 2. RENDERIZADO AUTOMÁTICO DE LA INTERFAZ TRADICIONAL
function cargarTablaResultados() {
    const tabla = document.getElementById('tabla-resultados');
    tabla.innerHTML = ''; // Limpiar contenedor

    HISTORIAL_PARTIDOS.forEach(partido => {
        const gano = partido.golesFavor > partido.golesContra;
        const empato = partido.golesFavor === partido.golesContra;
        let estadoColor = "border-red-500 bg-red-950/20";
        
        if (gano) estadoColor = "border-green-500 bg-green-950/20";
        if (empato) estadoColor = "border-yellow-500 bg-yellow-950/20";

        tabla.innerHTML += `
            <div class="p-4 rounded-xl border ${estadoColor} flex justify-between items-center">
                <div>
                    <span class="text-xs text-gray-400 block">Jornada ${partido.jornada} • ${partido.condicion}</span>
                    <span class="font-bold text-lg">Artana C.F. <span class="text-gray-400">vs</span> ${partido.rival}</span>
                    <span class="text-xs block text-gray-400">Goles: ${partido.golesFavor > 0 ? partido.goleadores.join(', ') : 'Ninguno'}</span>
                </div>
                <div class="text-2xl font-black px-3 py-1 bg-gray-900 rounded-lg">
                    ${partido.golesFavor} - ${partido.golesContra}
                </div>
            </div>
        `;
    });
}

// 3. MOTOR INTELIGENTE DE RESPUESTAS (La "IA" Analista)
class AsistenteIA {
    constructor(datosClub) {
        this.datos = datosClub;
    }

    procesarPregunta(pregunta) {
        // Normalizamos el texto (pasar a minúsculas y quitar acentos básicos)
        const query = pregunta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Regla 1: Contar victorias totales
        if (query.includes("ganado") || query.includes("victorias") || query.includes("ganas")) {
            const victorias = this.datos.filter(p => p.golesFavor > p.golesContra).length;
            return `¡Llevamos una gran temporada! El Artana C.F. ha ganado **${victorias} partidos** hasta el momento.`;
        }

        // Regla 2: Último partido jugado
        if (query.includes("ultimo partido") || query.includes("reciente") || query.includes("ultimo resultado")) {
            const ultimo = this.datos[this.datos.length - 1];
            const resultado = ultimo.golesFavor > ultimo.golesContra ? "Ganamos" : (ultimo.golesFavor === ultimo.golesContra ? "Empatamos" : "Perdimos");
            return `El último encuentro correspondiente a la Jornada ${ultimo.jornada} fue contra **${ultimo.rival}**. Resultado: **Artana C.F. ${ultimo.golesFavor} - ${ultimo.golesContra} ${ultimo.rival}** (${resultado}).`;
        }

        // Regla 3: Máximo goleador del equipo
        if (query.includes("goleador") || query.includes("pichichi") || query.includes("goles")) {
            let conteoGoles = {};
            this.datos.forEach(p => {
                p.goleadores.forEach(g => {
                    // Extraer nombre y cantidad si tiene (Ej: "Carlos (2)")
                    let nombre = g.split(" ")[0];
                    let cantidad = g.includes("(") ? parseInt(g.match(/\(([^)]+)\)/)[1]) : 1;
                    conteoGoles[nombre] = (conteoGoles[nombre] || 0) + cantidad;
                });
            });
            
            let maxGoleador = Object.keys(conteoGoles).reduce((a, b) => conteoGoles[a] > conteoGoles[b] ? a : b);
            return `El máximo artillero del Artana C.F. actualmente es **${maxGoleador}** con un total de **${conteoGoles[maxGoleador]} goles** en liga.`;
        }

        // Regla 4: Resumen general / Todos los resultados
        if (query.includes("todos") || query.includes("resultados") || query.includes("resumen") || query.includes("historial")) {
            let resumen = "Aquí tienes el registro completo de resultados de esta campaña:\n";
            this.datos.forEach(p => {
                resumen += `• J${p.jornada}: Artana C.F. ${p.golesFavor} - ${p.golesContra} ${p.rival}\n`;
            });
            return resumen;
        }

        // Respuesta por defecto si la IA no entiende el contexto futbolístico
        return "Lo siento, soy el analista táctico del Artana C.F. y solo puedo responder preguntas relacionadas con resultados, goles, partidos ganados o el historial del equipo. ¿Podrías reformular tu pregunta?";
    }
}

// 4. CONTROLADORES DE EVENTOS Y CHAT INTERACTIVO
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar datos en la vista
    cargarTablaResultados();

    const analistaIA = new AsistenteIA(HISTORIAL_PARTIDOS);
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-query");
    const btnPreguntar = document.getElementById("btn-preguntar");

    function ejecutarConsulta() {
        const textoUsuario = userInput.value.trim();
        if (textoUsuario === "") return;

        // Mostrar mensaje del usuario en el chat
        chatBox.innerHTML += `<div class="text-right"><span class="bg-blue-600 text-white px-3 py-1 rounded-lg inline-block max-w-xs">Tu: ${textoUsuario}</span></div>`;
        
        // Limpiar input
        userInput.value = "";

        // Hacer scroll automático al fondo del chat
        chatBox.scrollTop = chatBox.scrollHeight;

        // Efecto de carga simulado para darle realismo de IA
        chatBox.innerHTML += `<div id="loading" class="text-yellow-400 text-xs italic">[Pensando...]</div>`;
        
        setTimeout(() => {
            // Eliminar indicador de carga
            document.getElementById("loading").remove();

            // Procesar respuesta
            const respuestaIA = analistaIA.procesarPregunta(textoUsuario);

            // Mostrar respuesta de la IA
            chatBox.innerHTML += `
                <div class="text-left">
                    <span class="bg-gray-800 text-yellow-300 px-3 py-1 rounded-lg inline-block max-w-md border border-yellow-600/30">
                        <strong>IA Artana:</strong> ${respuestaIA.replace(/\n/g, '<br>')}
                    </span>
                </div>
            `;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 600); // 600ms de retraso simulado
    }

    // Escuchadores de eventos (Clic y tecla Enter)
    btnPreguntar.addEventListener("click", ejecutarConsulta);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") ejecutarConsulta();
    });
});