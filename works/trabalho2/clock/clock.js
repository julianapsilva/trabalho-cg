export function criaBoxRelogio(clockTotal) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "clockTotal");
    newDiv.innerHTML += `<h1>Tempo total: ${clockTotal.getElapsedTime()}</ h1> `;
    newDiv.style.position = 'absolute';
    newDiv.style.top = 0
    newDiv.style.marginLeft = '40'
    newDiv.style.color = '#fff'
    newDiv.style.fontSize = '14px'
    newDiv.style.padding = '40px 10px'
    document.body.appendChild(newDiv);
}

export function criaBoxRelogioCorrente(clockVolta) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "clockCorrente");
    newDiv.innerHTML += `<h1>Volta atual: ${clockVolta.getElapsedTime()}</ h1> `;
    newDiv.style.position = 'absolute';
    newDiv.style.top = 0
    newDiv.style.color = '#fff'
    newDiv.style.fontSize = '14px'
    newDiv.style.padding = '0px 10px'
    document.body.appendChild(newDiv);
}
export function criaBoxVelocidade(velocidade) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "velocidade");
    newDiv.innerHTML += `<h1>Velocidade atual: ${velocidade.toFixed(2)} m/s</ h1> `;
    newDiv.style.position = 'absolute';
    newDiv.style.top = 0
    newDiv.style.left = '100'
    newDiv.style.color = '#fff'
    newDiv.style.fontSize = '13px'
    newDiv.style.marginLeft = '240px'
    document.body.appendChild(newDiv);
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