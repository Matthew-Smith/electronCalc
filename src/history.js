import { ipcRenderer, remote } from 'electron';

let onEquationSelected = (equation) => {
    ipcRenderer.send('update-equation', equation);

    remote.getCurrentWindow().close();
};

let fill = (equations) => {
    let container = document.getElementById('container');
    let div;
    for (let i = 0; i < equations.length; i++) {
        let eq = equations[i];
        div = document.createElement('div');
        div.classList.add('row');
        div.innerHTML = eq;
        div.onclick = onEquationSelected.bind(undefined, eq);
        container.appendChild(div);
    }
}

ipcRenderer.on('equation-list', (event, args) => {
    console.log('got equation list');
    console.log(args);
    fill(args);
});