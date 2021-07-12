const channel = localStorage['username'];
const latest_messages_ul = document.querySelector('#latest-messages');

document.querySelector('#chat-owner').innerText = "Chat de " + channel +":";

const client = new tmi.Client({
	channels: [ channel ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	//console.log(`${tags['display-name']}: ${message}`);

    const li = document.createElement("LI");
    li.innerHTML = `<span style="font-weight: bold; color: yellow;"'>${tags['display-name']}</span>: &nbsp; ${message}`;
    latest_messages_ul.appendChild(li);

    if(latest_messages_ul.childElementCount > 7) {
        latest_messages_ul.removeChild(latest_messages_ul.childNodes[0]);
    };

    const chat_messages_div = document.querySelector('#chat-messages-div');
    chat_messages_div.scrollTop = chat_messages_div.scrollHeight;
});

function handleCheckboxChange() {
    let general_matters = document.querySelector('#general-matters');
    if (document.querySelector('#general-matters-checkbox').checked) {
        general_matters.style.display = "grid";
    } else {
        general_matters.style.display = "none";
    }

    let specific_matters = document.querySelector('#specific-matters');
    if (document.querySelector('#specific-matters-checkbox').checked) {
        specific_matters.style.display = "grid";
    } else {
        specific_matters.style.display = "none";
    }

    let how_much_time = document.querySelector('#how-much-time');
    if (document.querySelector('#predefined').checked) {
        how_much_time.style.display = "inline";
    } else {
        how_much_time.style.display = "none";
    }

}