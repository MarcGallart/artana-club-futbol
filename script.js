document.addEventListener("DOMContentLoaded", () => {
    
    // DATOS DE TUS CAPTURAS DE PANTALLA
    const partidos = [
        { jor: "Jornada 1 (14 sept)", loc: "Estivella C.F. 'A'", vis: "Artana C.F.", resL: 3, resV: 0, est: "Finalizado" },
        { jor: "Jornada 2 (21 sept)", loc: "Artana C.F.", vis: "C.D. Jérica 'B'", resL: 0, resV: 2, est: "Finalizado" },
        { jor: "Jornada 3 (28 sept)", loc: "C.F. Faura", vis: "Artana C.F.", resL: 2, resV: 3, est: "Finalizado" },
        { jor: "Jornada 4 (05 oct)", loc: "Artana C.F.", vis: "C.F. At. Gilet 'B'", resL: 3, resV: 1, est: "Finalizado" },
        { jor: "Jornada 5 (19 oct)", loc: "Artana C.F.", vis: "C.F. Nules 'B'", resL: 3, resV: 2, est: "Finalizado" },
        { jor: "Jornada 6 (26 oct)", loc: "Artana C.F.", vis: "Club At. Caudiel", resL: 0, resV: 2, est: "Finalizado" },
        { jor: "Jornada 7 (01 nov)", loc: "Xcrypt F.C. 'A'", vis: "Artana C.F.", resL: 0, resV: 0, est: "Finalizado" },
        { jor: "Jornada 8 (09 nov)", loc: "Artana C.F.", vis: "Esportiu Vila-real 'B'", resL: 1, resV: 1, est: "Finalizado" },
        { jor: "Jornada 9 (16 nov)", loc: "Biensa C.F. 'A'", vis: "Artana C.F.", resL: 1, resV: 2, est: "Finalizado" },
        { jor: "Jornada 10 (23 nov)", loc: "Artana C.F.", vis: "La Vilavella C.F. 'A'", resL: 1, resV: 0, est: "Finalizado" },
        { jor: "Jornada 11 (30 nov)", loc: "C.F. Castellnovo", vis: "Artana C.F.", resL: 2, resV: 1, est: "Finalizado" },
        { jor: "Jornada 12 (23 dic)", loc: "Artana C.F.", vis: "C.F. Mare Nostrum 'A'", resL: 3, resV: 1, est: "Finalizado" },
        { jor: "Jornada 13 (20 dic)", loc: "Club Almenara At. 'B'", vis: "Artana C.F.", resL: 2, resV: 0, est: "Finalizado" },
        { jor: "Jornada 14 (11 ene)", loc: "Artana C.F.", vis: "E.F. Benicató", resL: 2, resV: 0, est: "Finalizado" },
        { jor: "Jornada 17 (01 feb)", loc: "C.D. Jérica 'B'", vis: "Artana C.F.", resL: 1, resV: 1, est: "Finalizado" },
        { jor: "Jornada 18 (08 feb)", loc: "Artana C.F.", vis: "C.F. Faura", resL: 1, resV: 3, est: "Finalizado" },
        { jor: "Jornada 19 (22 mar)", loc: "C.F. At. Gilet 'B'", vis: "Artana C.F.", resL: 1, resV: 5, est: "Finalizado" },
        { jor: "Jornada 20 (20 feb)", loc: "C.F. Nules 'B'", vis: "Artana C.F.", resL: 2, resV: 1, est: "Finalizado" },
        { jor: "Jornada 21 (28 feb)", loc: "Club At. Caudiel", vis: "Artana C.F.", resL: 1, resV: 1, est: "Finalizado" },
        { jor: "Jornada 22 (08 mar)", loc: "Artana C.F.", vis: "Xcrypt F.C. 'A'", resL: "", resV: "", est: "16:00 h. Pendiente" },
        { jor: "Jornada 23 (15 mar)", loc: "Esportiu Vila-real 'B'", vis: "Artana C.F.", resL: 1, resV: 1, est: "Finalizado" },
        { jor: "Jornada 24 (29 mar)", loc: "Artana C.F.", vis: "Biensa C.F. 'A'", resL: 11, resV: 0, est: "Finalizado" },
        { jor: "Jornada 25 (10 abr)", loc: "La Vilavella C.F. 'A'", vis: "Artana C.F.", resL: 1, resV: 5, est: "Finalizado" },
        { jor: "Jornada 26 (19 abr)", loc: "Artana C.F.", vis: "C.F. Castellnovo", resL: 5, resV: 0, est: "Finalizado" },
        { jor: "Jornada 27 (26 abr)", loc: "C.F. Mare Nostrum 'A'", vis: "Artana C.F.", resL: 0, resV: 0, est: "Finalizado" },
        { jor: "Jornada 28 (10 may)", loc: "Artana C.F.", vis: "Club Almenara At. 'B'", resL: 4, resV: 1, est: "Finalizado" },
        { jor: "Jornada 29 (17 may)", loc: "E.F. Benicató", vis: "Artana C.F.", resL: 2, resV: 4, est: "Finalizado" },
        { jor: "Jornada 30 (24 may)", loc: "Artana C.F.", vis: "At. Saguntino 'B'", resL: "", resV: "", est: "17:00 h. Pendiente" }
    ];

    const posiciones = [
        { pos: 1, eq: "Almenara Atlètic 'B'", pts: 58, pj: 28 },
        { pos: 2, eq: "Artana C.F.", pts: 48, pj: 28 },
        { pos: 3, eq: "Club At. Caudiel", pts: 46, pj: 28 },
        { pos: 4, eq: "C.F. Faura", pts: 41, pj: 28 }
    ];

    // INYECTAR EN LA TABLA DE PARTIDOS
    const tablaPartidos = document.getElementById("tabla-partidos");
    if (tablaPartidos) {
        partidos.forEach(p => {
            const fila = document.createElement("tr");
            
            // Si el partido está pendiente mostramos la hora
            const resultadoHTML = p.est.includes("Pendiente") 
                ? p.est.split(" ")[0] + " " + p.est.split(" ")[1]
                : `${p.resL} - ${p.resV}`;

            fila.innerHTML = `
                <td><strong>${p.jor}</strong></td>
                <td>
                    <span class="${p.loc === 'Artana C.F.' ? 'txt-highlight' : ''}">${p.loc}</span> vs 
                    <span class="${p.vis === 'Artana C.F.' ? 'txt-highlight' : ''}">${p.vis}</span>
                </td>
                <td><strong>${resultadoHTML}</strong></td>
                <td><span class="badge ${p.est.includes('Pendiente') ? 'pendiente' : 'finalizado'}">${p.est.includes('Pendiente') ? 'Pendiente' : 'Finalizado'}</span></td>
            `;
            tablaPartidos.appendChild(fila);
        });
    }

    // INYECTAR EN LA TABLA DE CLASIFICACIÓN
    const tablaClas = document.getElementById("tabla-clasificacion");
    if (tablaClas) {
        posiciones.forEach(c => {
            const fila = document.createElement("tr");
            if (c.eq === "Artana C.F.") fila.classList.add("row-highlight");

            fila.innerHTML = `
                <td><strong>${c.pos}</strong></td>
                <td><span class="${c.eq === 'Artana C.F.' ? 'txt-highlight' : ''}">${c.eq}</span></td>
                <td><strong>${c.pts}</strong></td>
                <td>${c.pj}</td>
            `;
            tablaClas.appendChild(fila);
        });
    }
});