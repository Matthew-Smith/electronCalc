import stringMath from 'string-math';
import isNumber from 'is-number';

let resultsElem = document.getElementById('results');

function initButtons(buttons) {
    for (var i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        switch (button.id) {
            case 'equals':
                button.onclick = (mouseEvent) => {
                    resultsElem.innerText = stringMath(resultsElem.innerText);
                }
            break;
            case 'C':
                button.onclick = (mouseEvent) => {
                    // TODO regex go back to last operator and remove the current number
                }
            break;
            case 'CE':
                button.onclick = (mouseEvent) => {
                    resultsElem.innerText = '0';
                }
            break;
            case 'backspace':
                button.onclick = (mouseEvent) => {
                    let equation = resultsElem.innerText;
                    if (equation.length > 1) {
                        resultsElem.innerText = resultsElem.innerText.slice(0, -1);
                    }
                    else {
                        resultsElem.innerText = '0';
                    }
                }
            break;
            case 'negate':
                button.onclick = (mouseEvent) => {
                    // TODO regex go back to last operator add a '(' and '-' then add ')' to the end
                    // If that was already done remove the -
                }
            break;
            case '.':
                button.onclick = (mouseEvent) => {
                    if (resultsElem.innerText.slice(-1) != '.') {
                        resultsElem.innerText += mouseEvent.srcElement.id;
                    }
                }
            break;
            default:
                button.onclick = (mouseEvent) => {
                    let buttonText = mouseEvent.srcElement.id;
                    if (resultsElem.innerText == '0' && isNumber(buttonText)) {
                        resultsElem.innerText = buttonText;
                    } else {
                        resultsElem.innerText += mouseEvent.srcElement.id;
                    }
                }
        }
    }
}

let buttons = initButtons(document.getElementsByClassName('button'));
