document.addEventListener('DOMContentLoaded', function() {
    const chatSystem = document.querySelector('.chat-system');
    const chatRooms = document.querySelector('.chat-rooms');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('#chat-input');
    const chatSendButton = document.querySelector('#chat-send-button');
    const chatNotification = document.querySelector('.chat-notification');

    let rooms = [];
    let messages = [];

    function createChatRoom(name) {
        const room = {
            id: Date.now(),
            name,
            messages: []
        };
        rooms.push(room);
        renderChatRooms();
    }

    function sendMessage(roomId, message) {
        const room = rooms.find(room => room.id === roomId);
        if (room) {
            const chatMessage = {
                id: Date.now(),
                message
            };
            room.messages.push(chatMessage);
            renderChatMessages(roomId);
            showChatNotification('New message sent!');
        }
    }

    function renderChatRooms() {
        chatRooms.innerHTML = '';
        rooms.forEach(room => {
            const roomItem = document.createElement('div');
            roomItem.classList.add('chat-room');
            roomItem.innerHTML = `
                <span class="chat-room-name">${room.name}</span>
            `;
            chatRooms.appendChild(roomItem);
        });
    }

    function renderChatMessages(roomId) {
        chatMessages.innerHTML = '';
        const room = rooms.find(room => room.id === roomId);
        if (room) {
            room.messages.forEach(message => {
                const messageItem = document.createElement('div');
                messageItem.classList.add('chat-message');
                messageItem.innerHTML = `
                    <span class="chat-message-content">${message.message}</span>
                `;
                chatMessages.appendChild(messageItem);
            });
        }
    }

    function showChatNotification(message) {
        chatNotification.textContent = message;
        chatNotification.style.display = 'block';
    }

    chatSendButton.addEventListener('click', function() {
        const roomId = chatRooms.querySelector('.chat-room.selected').dataset.id;
        sendMessage(roomId, chatInput.value);
        chatInput.value = '';
    });

    // Initial render
    renderChatRooms();
});
