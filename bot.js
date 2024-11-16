document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Toggle the chat window visibility
document.getElementById('chat-float').addEventListener('click', function() {
  const chatContainer = document.getElementById('chat-container');
  if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
    chatContainer.style.display = 'flex';  // Show chat window
  } else {
    chatContainer.style.display = 'none';  // Hide chat window
  }
});

function sendMessage() {
  const userInput = document.getElementById('user-input').value.trim();
  if (userInput !== "") {
    appendMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    // Simulate bot response (you can replace this with actual API call)
    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      appendMessage(botResponse, 'bot');
    }, 1000);
  }
}

function appendMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message');
  messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  messageElement.textContent = message;
  document.getElementById('chat-box').appendChild(messageElement);
  
  // Auto-scroll to the bottom of the chat box
  document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

function getBotResponse(input) {
  input = input.toLowerCase();

  const nutRelatedResponses = {
    'hello': 'Hi, ask your questions here!',
    'hi': 'Hi, How can i help you?',
    'what are the types of nuts available': 'There are several types of nuts, including almonds, walnuts, cashews, hazelnuts, pecans, pistachios and lot more.',
    'where can i buy good quality nuts': 'You are in the right place, Chikkus have premium quality nuts and we also have special offers, register with us to explore more!',
    'what are the category of products available here': 'There are plenty of options for you to start your purchase with us, categories include nuts, dry-fruits, dates, makhana, honey, cookies & biscuits, seeds and much more.',
    'what is the name of this website':'The name of this website is Chikkus™ India.',
    'who is the owner of this website':'The owner of Chikkus™ India is Mr.Karthik Seeman.',
    'ok thankyou':'I am honoured to serve.',
    'who has developed this website':'the website is developed by sahana',
  };

  if (nutRelatedResponses[input]) {
    return nutRelatedResponses[input];
  } else {
    return "Sorry, I don't understand. I can only answer questions related to Chikku's™ India.";
  }
}
