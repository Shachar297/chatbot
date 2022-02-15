var
    serverMessage = document.getElementById("server-message"),
    clientMessage = document.getElementById("client-message"),
    messageInput = document.getElementById("message-input"),
    messageBtn = document.getElementById("message-btn"),
    chatbox = document.getElementById("main-chatbox"),
    selectedSelect = document.getElementById("selectedSelect"),
    userMessageIndex = 0,
    serverMessageIndex = 0,
    serverMessageCurrentYPosition = 0,
    progressBarId = "progressBar",
    barId = "bar",
    userToken,
    socket;


// socket.opopen = () => {
//     socket.send('Connected');
// }

// socket.onmessage = (data) => {
//     console.log(data);
// }

init();
initForm();

function handleMessage(e) {
    e.preventDefault();
    if (!messageInput.value) { return };
    createClientMessage();
    sendMessage();
    handleInputClicks();
}

async function sendMessage() {

    const bar = createProgressBar();
    chatbox.appendChild(bar);

    const status = await fetch("http://localhost:4321/bot/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: messageInput.value })
    }).then(data => {
        data.json().then(response => {
            if (response) {
                console.log(response)
                setTimeout(() => {
                    removeProgressBar();
                    resetInputValue();

                }, 750)
                createServerMessage(response);
                if (response = "What should i do with this information ?") {
                    createInitializeMessage(response)
                }
            }

        })
    }).catch(err => {
        alert(err.message)
    });

    await saveMessages();
    return status;
}

async function saveMessages() {
const messageOptions = {
    message : messageInput.value
}
    let response = await fetch("http://localhost:4321/bot/message/" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization" : userToken
        },
        body: JSON.stringify({ message: messageInput.value })
    }).then(data => {
        console.log(data);
        data.json().then(json => {
            console.log(json, ">?")
        }).catch(err => {
            alert(err)
        })
    })

    console.log(response)
}

function createServerMessage(serverMessage) {

    const newServerMessage = document.createElement("div");
    const serverMessageOptions = "chatbox-server-message col-5 mb-2 p-4 bg-info card-header well well-large";

    let paragraph = setNameOnServerMessages();

    newServerMessage.innerHTML = serverMessage;
    newServerMessage.appendChild(paragraph);
    setElementClasses(newServerMessage, serverMessageOptions);
    chatbox.appendChild(newServerMessage);
    scrollChatBox();
}

function setNameOnServerMessages() {
    let options = "chatbox-username col-6 mb-1 card-footer";
    let paragraph = document.createElement("p");
    paragraph.innerHTML = "Chatbox,  " + setTimeStamp();
    setElementClasses(paragraph, options);
    paragraph.style.fontSize = "bold";
    return paragraph;
}

function createClientMessage() {


    const clientMessageOptions = "chatbox-user-message col-5 mb-2 mt-5 mx-auto p-4 bg-success card-body";
    let clientNewMessage = document.createElement("div");

    chatbox.appendChild(clientNewMessage);
    setElementClasses(clientNewMessage, clientMessageOptions);
    clientNewMessage.innerHTML = messageInput.value;

    let timestamp = createTimestampNote();
    let paragraph = createNameParagraph();

    clientNewMessage.appendChild(paragraph);


}


function createProgressBar() {
    const progressBar = document.createElement("div");
    const classes = "progress progress-striped active col-5 mb-1";
    setElementClasses(progressBar, classes);
    progressBar.id = progressBarId;

    const bar = document.createElement("div");
    setElementClasses(bar, "progress-bar");
    bar.id = barId;
    bar.style.width = "0"
    animateProgressBar(bar);
    progressBar.appendChild(bar);
    return progressBar;
}

function animateProgressBar(bar) {

    setInterval(() => {
        bar.style.width = parseInt(bar.style.width) + 25 + "%";

    }, 250)
}

function validateMessage() {
    return messageInput.value
}

function createNameParagraph() {
    let paragraphOptions = "chatbox-username col-6 mb-1 card-footer";
    let paragraph = document.createElement("p");
    paragraph.innerHTML = "Shachar, " + setTimeStamp();
    setElementClasses(paragraph, paragraphOptions);
    paragraph.style.fontSize = "bold"
    return paragraph;
}




function setElementClasses(element, options) {
    const classes = options.split(" ");
    for (let currentClass = 0; currentClass < classes.length; currentClass++) {
        element.classList.add(classes[currentClass]);
    }
    element.style.opacity = 0;
    setOpacity(element)
}


function setOpacity(element) {
    let opacity = parseInt(element.style.opacity);
    element.style.opacity = opacity;
    setInterval(() => {
        opacity = opacity + 0.1;
        element.style.opacity = opacity;
    }, 50);
}

function indexMessages(LastElementPosition) {
    userMessageIndex += 1;
    serverMessageIndex += 1;
    let lastPos = serverMessageCurrentYPosition;
    serverMessageCurrentYPosition = LastElementPosition + lastPos;
    return serverMessageCurrentYPosition
}

function disableInput() {
    messageInput.disabled = true;
}

function onValueSelected(element) {
    console.log(element.value)
    disableInput();
    switch (element.value) {
        case "Free Text":
            messageInput.disabled = false;
            messageInput.placeholder = element.value
            break;
        case "Report an issue":
            handleSelectOptionsCreation(element.value);
            clearInputPlaceHolder();
            scrollChatBox();
            break;
        case "I need something":
            handleSelectOptionsCreation(element.value);
            clearInputPlaceHolder();
            scrollChatBox();
            break;
    }
}


function handleSelectOptionsCreation(elementValue) {
    createClientMessage();
    const selectEvent = createSelectOptions(elementValue);
    chatbox.children[chatbox.children.length - 1].appendChild(selectEvent);


}

function createSelectOptions(elementValue) {
    let options;
    let name;

    switch (elementValue) {
        case "I need something":
            options = ["1", "2", "3", "4"];
            name = "secondSelect"
            break;
        case "Report an issue":
            options = ["2", "4", "6", "8"];
            name = "thirdSelect"
            break;
        case "What should i do with this information ?":
            options = ["Bla", "Bla1", "I need something", "Report an issue", "Free Text", "More"];
            name = "forthSelect";
            break;
    }
    let selectEvent = document.createElement("select");
    const styleOptions = "form-select col-4 mb-3";
    setElementClasses(selectEvent, styleOptions);
    for (let currentOption = 0; currentOption < options.length; currentOption++) {
        const opt = document.createElement("option");
        opt.value = options[currentOption];
        opt.text = options[currentOption];
        if (opt.text == "Free Text") {
            opt.classList.add("divider")
        }
        selectEvent.appendChild(opt);
    }
    selectEvent.name = name;
    selectEvent.ariaLabel = ".multiple select";
    selectEvent.id = name;
    console.log(selectEvent);
    selectEvent.addEventListener("change", () => onSelectedGeneratedEvent(selectEvent.value))

    return selectEvent
}


function setInputValue(elementValue) {
    messageInput.value = elementValue;
}

function resetInputValue() {
    messageInput.value = "";
}

function clearInputPlaceHolder() {
    messageInput.placeholder = "";

}

function onSelectedGeneratedEvent(optionValue) {
    setInputValue(optionValue);
}

function removeProgressBar() {
    const bar = document.getElementById(progressBarId);
    const pbar = document.getElementById(barId);

    bar ? bar.remove() : null;
    pbar ? pbar.remove() : null;
}

function disableButton() {
    messageBtn.disabled = !messageInput.value ? true : false;
}

function init() {
    disableInput();
    messageBtn.addEventListener('click', (e) => handleMessage(e));
    messageInput.addEventListener("keyup", () => disableButton());
    if (messageInput.value) {
        messageBtn.disabled = true;
    }

    messageInput.addEventListener("click", () => handleInputClicks());
    chatbox.style.display = 'none';
    document.getElementById("chatbox-send-message").style.display = 'none';
}

function setTimeStamp() {
    const now = new Date();
    return now.toString().split(" ")[4];
}

function createTimestampNote() {
    const time = setTimeStamp();
    const timeNote = document.createElement("p");
    timeNote.innerHTML = time;

    return timeNote;
}

function onMoreOptionClicked(e) {

    let optionalOptions = document.querySelectorAll(".selectedOptions");

    for (let currentOption = 0; currentOption < optionalOptions.length; currentOption++) {
        if (e.text.trim() == "Less") {
            optionalOptions[currentOption].style.display = "none"
        } else {
            optionalOptions[currentOption].style.display = "block"
            optionalOptions[currentOption].addEventListener("click", () => setOptionalOptionsCallback(optionalOptions[currentOption]))
        }
    }

    if (e.text == "Less") resetInputValue();

    e.text = e.text == "More" ? "Less" : "More"

}
function setOptionalOptionsCallback(optionSelected) {
    if (optionSelected.text) {
        setInputValue(optionSelected.text)
    }
}

function createInitializeMessage(response) {

    handleSelectOptionsCreation(response);
    scrollChatBox();
}

function scrollChatBox() {
    chatbox.scrollTo(0, indexMessages(Math.ceil(chatbox.children[chatbox.children.length - 1].getBoundingClientRect().y)));

}

function handleInputClicks() {
    switch (messageInput.value) {
        case "Free Text":
            resetInputValue();
            break;
            
        }
}
function initForm() {
    const 
    formActions = document.querySelectorAll(".formAction"),
    formBtn = document.getElementById('formBtn');

    formBtn.value = "Register";

    formBtn.addEventListener("click", ()=> {
        handleFormBtnClick(formBtn)
    });

    for(let action = 0; action < formActions.length; action++) {
        formActions[action].addEventListener("click", ()=> handleFormActions(formActions,formActions[action]))
    }

    
}

function handleFormActions(allActions,formAction) {
    const formBtn = document.getElementById('formBtn')
    for(let action = 0; action < allActions.length; action++) {
        
        allActions[action].classList.remove("active");
    }

    formAction.classList.add("active");
    formBtn.value = formAction.innerHTML

}


async function handleFormBtnClick(button) {
    let restApiAction;

    if(button.value.trim() == "Login") {
        restApiAction = "login/";
    }else{
        restApiAction = ""
    }
    button.addEventListener("click",() => login(restApiAction) )
}

async function login(restApiAction) {

    let userLogInDetails;
    const user = {
        username : document.getElementById("usernameInput").value,
        password : document.getElementById("passwordInput").value,
        phoneNumber : document.getElementById("phoneNumberInput").value,
    }
    try {
        userLogInDetails = await fetch("http://localhost:4321/users/" + restApiAction, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user : user })
        }).then(res => {
            if(res.status == 200) {
                displayChatbox();

                }
            res.json().then(json => {
                userToken = json.token
                sessionStorage.setItem("token", userToken);
                setTimeout(() => {
                    connectSocket();
                }, 2000)
                // connectSocket();
            })
        }).catch(err => {
            alert(err)
        })
    } catch (error) {
        alert(error)
    }

    return userLogInDetails
}

function displayChatbox() {
    document.getElementById("forms").style.display = "none";
    chatbox.style.display = 'block';
    document.getElementById("chatbox-send-message").style.display = 'block';
}


function connectSocket() {
    // socket = io.connect("http://localhost:4322/", {
    //     query: {['token']: sessionStorage.getItem('token')}
    // })

}