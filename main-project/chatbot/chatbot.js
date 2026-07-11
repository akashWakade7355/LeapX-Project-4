

const openChatBtn = document.getElementById("openChat");
const closeChatBtn = document.getElementById("closeChat");

const chatWindow = document.getElementById("chatWindow");
const chatPopup = document.querySelector(".chat-popup");

const chatBody = document.getElementById("chatBody");

const userInput = document.getElementById("userInput");

const sendBtn = document.getElementById("sendBtn");

// open chat

openChatBtn.addEventListener("click", () => {

    chatWindow.style.display = "flex";

    chatPopup.style.display = "none";

});

// close chat

closeChatBtn.addEventListener("click", () => {

    chatWindow.style.display = "none";

    chatPopup.style.display = "block";

});

function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.className = `${sender}-message`;

    messageDiv.innerHTML = `
        <div class="message">
            <div>${message}</div>
             <div class="message-time">
                 ${getCurrentTime()}
             </div>
        </div>
    `;

    chatBody.appendChild(messageDiv);

    chatBody.scrollTop = chatBody.scrollHeight;
}

addMessage("👋 Hello! Welcome to Seed.", "bot");

// current time

function getCurrentTime() {

    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}
// bot response 

function getBotResponse(userMessage){

    userMessage = userMessage.toLowerCase();

    for (let item of chatbotResponses) {
        for (let keyword of item.keywords){
            if(userMessage.includes(keyword)){
                return item.response;
}

}

}
return `😅 Sorry, I couldn't understand that

Try asking:

• Tech Events
• Workshops
• Music Events
• Weekend Events`;
}

function sendMessage(){
    const message = userInput.value.trim();

    if(message==="")
       return ;

       addMessage(message,'user');

  const botResponse = getBotResponse(message);
    addMessage(botResponse,'bot');  
    
    userInput.value="";

}


sendBtn.addEventListener("click",sendMessage);

userInput.addEventListener("keydown",(event)=>{
    if(event.key=="Enter")
          sendMessage();
});


const suggestionBtns=document.querySelectorAll(".suggestion-btn"); 

suggestionBtns.forEach(btn=> {
    btn.addEventListener("click",()=>{
        userInput.value=btn.innerText;
        sendMessage();
    })
});
