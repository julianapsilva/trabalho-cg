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

export function updateClock(clockTotal, clockVolta) {
    const clockT = document.getElementById('clockTotal')
    const clockC = document.getElementById('clockCorrente')
    const t = clockTotal.getElapsedTime()
    const tCorrente = clockVolta.getElapsedTime()
    clockT.innerHTML = `<h1>Tempo total: ${t.toFixed(2)}</ h1> `
    clockC.innerHTML = `<h1>Volta atual: ${tCorrente.toFixed(2)}</ h1> `
}


export function criaQuadrante() {
    const newDiv = document.createElement("div");
    const newDiv2 = document.createElement("div");
    newDiv.style.color = '#fff'
    newDiv.style.height = '100vh'
    newDiv.style.border = '1px solid #fff'
    newDiv.style.position = 'absolute';
    newDiv.style.top = '50%';
    newDiv.style.left = '50%';
    newDiv.style.transform = 'translate(-50%, -50%)';

    newDiv2.style.color = '#fff'
    newDiv2.style.width = '100vw'
    newDiv2.style.border = '1px solid #fff'
    newDiv2.style.position = 'absolute';
    newDiv2.style.top = '50%';
    newDiv2.style.left = '50%';
    newDiv2.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(newDiv);
    document.body.appendChild(newDiv2);

} 