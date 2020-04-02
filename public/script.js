const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const roomContainer = document.getElementById('room-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const red = '#F20505';
const blue = '#03A696';
const green = '#84BF04';
const pink = '#F2C9BB';

if(messageForm != null) {
    const name = prompt('Mời nhập tên');
    appendMessage('You Joined', green);
    socket.emit('new-user', roomName, name);

    messageForm.addEventListener('submit', e=>{
        e.preventDefault();
        const message = messageInput.value;
        appendMessage(`You: ${message}`, pink);
        socket.emit('send-chat-message', roomName,message);
        messageInput.value = '';
    });
}

socket.on('room-created', room => {
    const roomElement = document.createElement('div');
    roomElement.innerText = room;
    const roomLink = document.createElement('a');
    roomLink.href = `/${room}`;
    roomLink.innerText = 'join';
    roomContainer,append(roomElement);
    roomContainer,append(roomLink);
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`, green);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`, red);
});


socket.on('chat-message', data=>{
    appendMessage(`${data.name}: ${data.message}`, blue);
});



function appendMessage(message, color) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.style.backgroundColor = color;
    messageElement.innerText = message;
    messageContainer.append(messageElement);
};