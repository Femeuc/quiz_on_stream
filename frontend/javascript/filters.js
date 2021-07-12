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

const start_button = document.querySelector('#start-button');
start_button.onclick = function() {
    const all_filters = document.querySelectorAll('.filter-input');
    const filters_inputs = [];
    for (let i = 0; i < all_filters.length; i++) {
        if(all_filters[i].checked) {
            filters_inputs.push(all_filters[i].id);
        }
    }
    console.log(filters_inputs.toString());

    const subjects = [];
    const difficulties = [];
    let time;

    for (let i = 0; i < filters_inputs.length; i++) {

        switch (filters_inputs[i]) {
            case 'easy':
            case 'normal':
            case 'hard':
                difficulties.push(filters_inputs[i]);
                break;
            
            case 'dinamic':
            case 'predefined':
                time = filters_inputs[i];
                break;
            
            default:
                subjects.push(filters_inputs[i]);
        }
    }
    
/*

<div class="filter-div-item">
    <div class="filter-input-block">
        <input class="filter-input" type="checkbox" id="Gramática">
        <label for="Gramática">Gramática</label> 
    </div>
*/
    


        
    const select_from_questions = `SELECT * FROM questions WHERE difficulty IN (${difficulties}) AND subject IN (${subjects})`;

    localStorage.setItem("sql_statement", sql_statement);
    console.log(localStorage['sql_statement']);

    window.open('questions.html', '_self');
};

const api_url = `http://localhost:3000/question_subjects?channel=${channel}`;
get_question_subjects(api_url);
async function get_question_subjects(api_url) {
    const general_matters_input_div = document.querySelector('#general-matters-input-div')

    // Storing response
    const response = await fetch(api_url);
    
    // Storing data in form of JSON
    const data = await response.json();
    console.log(data.response);

    for (let i = 0; i < data.response.length; i++) {
        const filter_input_block = document.createElement("DIV");
        const general_matters_input = document.createElement("INPUT");
        const general_matters_label = document.createElement("LABEL");

        filter_input_block.className = "filter-input-block";
        general_matters_input.className = "filter-input";
        general_matters_input.type = "checkbox";
        general_matters_input.id = `${data.response[i].subject}`;
        general_matters_label.setAttribute("for", general_matters_input.id);
        general_matters_label.innerText = general_matters_input.id;
        general_matters_label.style = "margin-left: 5px";

        filter_input_block.appendChild(general_matters_input);
        filter_input_block.appendChild(general_matters_label);
        general_matters_input_div.appendChild(filter_input_block);
    }
}
/*
var btn = document.createElement("BUTTON");   // Create a <button> element
btn.innerHTML = "CLICK ME";                   // Insert text
document.body.appendChild(btn);  

<div class="filter-div-item" id="general-matters-input-div">
                                <div class="filter-input-block">
                                    <input class="filter-input" type="checkbox" id="Gramática">
                                    <label for="Gramática">Gramática</label> 
                                </div>

                            */