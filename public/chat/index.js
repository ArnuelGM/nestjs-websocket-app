const wsUrl = 'ws://172.17.0.4:3000/'
let ws;

function createItemMessage(text, color = 'alert-primary') {
    const alert = document.createElement('div');
    alert.setAttribute('class', `alert ${color}`);
    alert.textContent = text;
    return alert;
}

function addMessageItem(text, color = 'alert-primary') {
    const item = createItemMessage(text, color);
    document.querySelector('#messages').appendChild( item );
}

function initializeWeSocket() {
    ws = new WebSocket(wsUrl);
    ws.onmessage = (ev) => {
        console.log('onmessage', ev);
        addMessageItem( ev.data );
    };
}

function prepareMessage(message) {
    return { event: 'message', data: message };
}

function sendWsMessage(data) {
    const preparedData = prepareMessage(data);
    ws.send( JSON.stringify(preparedData) );
}


function sendMessage(input) {
    const text = input.value;

    addMessageItem(text, 'alert-warning');
    sendWsMessage(text);
    input.value = '';
}

function initComponents() {
    const send = document.querySelector('#send');
    const message = document.querySelector('#message');
    send.addEventListener('click', () => {
        sendMessage(message)
    })
}

function init() {
    initializeWeSocket()
    initComponents()
}

window.addEventListener('load', init);