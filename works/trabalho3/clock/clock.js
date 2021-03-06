export function criaBoxRelogio(clockTotal) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "clockTotal");
    newDiv.innerHTML += `<h1>Tempo total: ${clockTotal.getElapsedTime()}</ h1> `;
    newDiv.style.position = 'absolute';
    newDiv.style.top = 0
    newDiv.style.marginLeft = '40'
    newDiv.style.color = '#000'
    newDiv.style.fontSize = '13px'
    newDiv.style.padding = '40px 10px'
    document.body.appendChild(newDiv);
}

export function criaBoxRelogioCorrente(clockVolta) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "clockCorrente");
    newDiv.innerHTML += `<h1>Volta atual: ${clockVolta.getElapsedTime()}</ h1> `;
    newDiv.style.position = 'absolute';
    newDiv.style.top = 0
    newDiv.style.color = '#000'
    newDiv.style.fontSize = '13px'
    newDiv.style.padding = '0px 10px'
    document.body.appendChild(newDiv);
}
export function criaBoxVelocidade(velocidade) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "velocidade");
    newDiv.innerHTML += `<h1>Velocidade atual: ${velocidade.toFixed(2)} m/s</ h1> `;
    newDiv.style.position = 'absolute';
    newDiv.style.top = 0
    newDiv.style.color = '#000'
    newDiv.style.fontSize = '13px'
    newDiv.style.marginLeft = '240px'
    document.body.appendChild(newDiv);
}

export function criaBoxMelhorVolta(melhorVolta) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "melhorVolta");
    newDiv.innerHTML += `<h1>Melhor Volta: --:--</ h1>`;
    newDiv.style.position = 'absolute';
    newDiv.style.top = 0
    newDiv.style.color = '#000'
    newDiv.style.fontSize = '13px'
    newDiv.style.padding = '40px 0px'
    newDiv.style.marginLeft = '240px'
    document.body.appendChild(newDiv);
}

export function updateMelhorVolta(melhorVolta) {
    const velId = document.getElementById('melhorVolta')
    if (melhorVolta)
        velId.innerHTML = `<h1>Melhor Volta: ${melhorVolta.toFixed(2)}</ h1>`
    else
        velId.innerHTML = `<h1>Melhor Volta: --:--</ h1>`
}

export function updateVelocidade(velocidade) {
    const velId = document.getElementById('velocidade')
    velId.innerHTML = `<h1>Velocidade atual: ${velocidade.toFixed(2)} m/s</ h1>`
}

export function updateClock(clockTotal, clockVolta) {
    const clockT = document.getElementById('clockTotal')
    const clockC = document.getElementById('clockCorrente')
    const t = clockTotal.getElapsedTime()
    const tCorrente = clockVolta.getElapsedTime()
    clockT.innerHTML = `<h1>Tempo total: ${t.toFixed(2)}</ h1> `
    clockC.innerHTML = `<h1>Volta atual: ${tCorrente.toFixed(2)}</ h1> `
}

export function showOrHideInformation(display) {
    const d1 = document.getElementById('clockTotal')
    const d2 = document.getElementById('clockCorrente')
    const d3 = document.getElementById('velocidade')
    const d4 = document.getElementById('melhorVolta')
    d1.style.display = display
    d2.style.display = display
    d3.style.display = display
    d4.style.display = display
}


export function criaQuadrante() {
    const newDiv = document.createElement("div");
    const newDiv2 = document.createElement("div");
    newDiv.style.color = '#000'
    newDiv.style.height = '100vh'
    newDiv.style.border = '1px solid #fff'
    newDiv.style.position = 'absolute';
    newDiv.style.top = '50%';
    newDiv.style.left = '50%';
    newDiv.style.transform = 'translate(-50%, -50%)';

    newDiv2.style.color = '#000'
    newDiv2.style.width = '100vw'
    newDiv2.style.border = '1px solid #fff'
    newDiv2.style.position = 'absolute';
    newDiv2.style.top = '50%';
    newDiv2.style.left = '50%';
    newDiv2.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(newDiv);
    document.body.appendChild(newDiv2);

} 