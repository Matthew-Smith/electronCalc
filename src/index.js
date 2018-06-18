import stringMath from 'string-math';
import { ipcRenderer } from 'electron';


let resultsElem = document.getElementById('results');

let OPERATOR_REGEX = /[\*\+\-\/]/;
let LAST_NUMBER_REGEX = /(?:[\*\+\-\/])([\d.]*(?![\*\+\-\/]))+$/;

let openHistory = () => {
    ipcRenderer.send('open-history');
}

let backspace = () => {
    let equation = resultsElem.innerText;
    if (equation.length > 1) {
        resultsElem.innerText = resultsElem.innerText.slice(0, -1);
    }
    else {
        resultsElem.innerText = '0';
    }
}

let decimal = (mouseEvent) => {
    if (resultsElem.innerText.slice(-1) != '.') {
        resultsElem.innerText += mouseEvent.srcElement.id;
    }
}

let numeric = (mouseEvent) => {
    let number = mouseEvent.srcElement.id;
    if (resultsElem.innerText == '0') {
        resultsElem.innerText = number;
    } else {
        resultsElem.innerText += number;
    }
}

let operator = (op, mouseEvent) => {
    let lastEquationChar = resultsElem.innerText.slice(-1);
    if (op == lastEquationChar) {
        return;
    }

    if (OPERATOR_REGEX.test(lastEquationChar)) {
        resultsElem.innerText = resultsElem.innerText.slice(0, -1) + op;
    } else {
        resultsElem.innerText += op;
    }
}

let equals = () => {
    let equation = resultsElem.innerText;
    
    ipcRenderer.send('add-evaluated-equation', equation);
    resultsElem.innerText = stringMath(equation);
}

let clearEntry = () => {
    let splitEquation = LAST_NUMBER_REGEX.exec(resultsElem.innerText);

    if (!splitEquation) {
        clearAll();
    }
    else if (splitEquation[1]) {
        resultsElem.innerText = resultsElem.innerText.slice(0, -splitEquation[1].length);
    }
}

let clearAll = () => {
    resultsElem.innerText = '0';
}

function initButtons(buttons) {
    for (var i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        switch (button.id) {
            case 'equals':
                button.onclick = equals;
                break;
            case 'C':
                button.onclick = clearAll;
                break;
            case 'CE':
                button.onclick = clearEntry;
                break;
            case 'backspace':
                button.onclick = backspace;
                break;
            case 'history':
                button.onclick = openHistory;
                break;
            case '.':
                button.onclick = decimal;
                break;
            case '*':
            case '-':
            case '/':
            case '+':
                button.onclick = operator.bind(undefined, button.id);
                break;
            default:
                button.onclick = numeric;
        }
    }
}

let buttons = initButtons(document.getElementsByClassName('button'));


ipcRenderer.on('equation-selected', (event, args) => {
    resultsElem.innerText = args;
});