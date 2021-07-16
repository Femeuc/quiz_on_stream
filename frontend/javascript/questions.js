const questions_ids = JSON.parse(localStorage['questions_ids']);
const asked_questions_id = [];
const players = [];
const options_statistics = [0, 0, 0, 0];  // 0 = A, 1 = B, 2 = C, 3 = D
let current_question = [];
const can_repeat_question = false;

console.log(questions_ids);

initialize_page();

const client = new tmi.Client({
	channels: [ localStorage['username'] ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	//console.log(`${tags['display-name']}: ${message}`);
    
    if(message.length == 1) {
        if (message.toLowerCase() == 'a' || message.toLowerCase() == 'b' 
        || message.toLowerCase() == 'c' || message.toLowerCase() == 'd') {

            const player_name = tags['display-name'];
            if(does_player_exist(player_name)) {
                console.log("Player exists");
                if(!did_this_player_answer(player_name)) {
                    add_this_player_answer(player_name, message.toLowerCase());
                    update_statistics(message);
                }

            } else {
                console.log("Player doesn't exist, Let's create one1");
                players.push(
                    {
                        name: player_name,
                        answer: message.toLowerCase(),
                        score: 0
                    }
                );    
                update_statistics(message);
            }
        }
    }
    console.log(players);
});

async function initialize_page() {
    hideElements();
    current_question = await get_question_by_id();
    load_question();
    console.log(current_question);
}

async function get_question_by_id() {
    let api_url = "http://localhost:3000/question";

    const random_number = Math.floor(Math.random() * questions_ids.length);
    const random_question_id = questions_ids[random_number].id;

    api_url += `/${random_question_id}`;

    const response = await fetch(api_url);
    
    // Storing data in form of JSON
    const data = await response.json();
    return data.response;
}

function hideElements() {
    //document.querySelector('#statistics').style.display = "none";
    document.querySelector('#scores').style.display = "none";
    document.querySelector('#buttons').style.display = "none";
}

function showElements() {
    //document.querySelector('#statistics').style.display = "block";
    document.querySelector('#scores').style.display = "block";
    document.querySelector('#buttons').style.display = "block";
}

function load_question() {
    const description = current_question[0].description;
    const option_a = current_question[0].option_a;
    const option_b = current_question[0].option_b;
    const option_c = current_question[0].option_c;
    const option_d = current_question[0].option_d;
/*    const correct_option = current_question[0].correct_option;
    const difficulty = current_question[0].difficulty;
    const author = current_question[0].author;*/

    document.querySelector('#question-description').innerText = description;
    document.querySelector('#op_a').innerText = "A. " + option_a;
    document.querySelector('#op_b').innerText = "B. " + option_b;
    document.querySelector('#op_c').innerText = "C. " + option_c;
    document.querySelector('#op_d').innerText = "D. " + option_d;   
}

function stop_question() {
    showElements();
    update_scores();
    sort_scores();
    show_scores();
};

function does_player_exist(player_name) {
    for(let i = 0; i < players.length; i++) {
        if(players[i].name == player_name) {
            return true;
        }
    }
    
    return false;
}

function did_this_player_answer(player_name) {
    for(let i = 0; i < players.length; i++) {
        if(players[i].name == player_name && players[i].answer == "") {
            return false;
        } 
        else if(players[i].name == player_name && players[i].answer != "") {
            return true;
        }
    }

    throw "Erro ao verificar se player já respondeu: did_this_player_answer(player_name)";
}

function add_this_player_answer(player_name, player_answer) {
    for(let i = 0; i < players.length; i++) {
        if(players[i].name == player_name) {
            players[i].answer = player_answer;
        }
    }
}

function show_scores() {
    const players_scores_list = document.querySelector('#players-scores-list');

    clear_scores_list(players_scores_list);

    for(let i = 0; i < players.length; i++) {
        
        const player_score_li = document.createElement('LI');
        const player_item_span = document.createElement('SPAN');
        const question_score_span = document.createElement('SPAN');
        const general_score_span = document.createElement('SPAN');

        player_score_li.className = "player-score-li";
        player_item_span.className = "player-item";
        question_score_span.className = did_player_answer_correctly(players[i].answer) ? "question-score-correct" : "question-score-wrong";
        general_score_span.className = "general-score";

        player_item_span.innerText = players[i].name;
        question_score_span.innerText = did_player_answer_correctly(players[i].answer) ? "+ 1" : "+ 0";
        general_score_span.innerText = players[i].score + " pts.";

        players_scores_list.appendChild(player_score_li);
        player_score_li.appendChild(player_item_span);
        player_score_li.appendChild(question_score_span);
        player_score_li.appendChild(general_score_span);
    }
}

function did_player_answer_correctly(answer) {
    return answer == current_question[0].correct_option;
}

function update_scores() {
    for(let i = 0; i < players.length; i++) {
        if(did_player_answer_correctly(players[i].answer)) {
            players[i].score += 1;
        }
    }
}

function sort_scores() {
    let highest_score = -1;

    for(let i = 0; i < players.length; i++) {

        if(players[i].score > highest_score) {
            highest_score = players[i].score;
            players.unshift(players[i]);
            players.splice(i + 1, 1);
        }
    }
}

function next_question() {
    reset_players_answers();
    manage_question_repetition();
    initialize_page();
}

function reset_players_answers() {
    for(let i = 0; i < players.length; i++) {
        players[i].answer = "";
    }
}

function manage_question_repetition() {

    if(!can_repeat_question) {
    
        for(let i = 0; i < questions_ids.length; i++){ 
                                    
            if ( questions_ids[i].id == current_question[0].id) { 
                questions_ids.splice(i, 1); 
            }
        }
    }

    if(questions_ids.length < 1) {
        if(confirm("Não há nenhuma questão nova com esses filtros. Deseja ver questões repetidas?")) {
            const ids = JSON.parse(localStorage['questions_ids']);
            
            for(let i = 0; i < ids.length; i ++) {
                questions_ids.push(ids[i]);
            }
        } else {
            console.log("Não quer repetir");
        }
    }

}

function clear_scores_list(players_scores_list) {
    while (players_scores_list.firstChild) {
        players_scores_list.removeChild(players_scores_list.firstChild);
    }
}

function update_statistics(answer) {
    switch(answer.toLowerCase()) {
        case 'a':
            options_statistics[0] += 1;
            break;
        case 'b':
            options_statistics[1] += 1;
            break;
        case 'c':
            options_statistics[2] += 1;
            break;
        case 'd':
            options_statistics[3] += 1;
            break;
    }

    const options_votes_total = options_statistics[0] + options_statistics[1] + options_statistics[2] + options_statistics[3];
    console.log(options_votes_total);
    document.querySelector('#A-stats').style.width = `${options_statistics[0] / options_votes_total * 100}%`;
    document.querySelector('#B-stats').style.width = `${options_statistics[1] / options_votes_total * 100}%`;
    document.querySelector('#C-stats').style.width = `${options_statistics[2] / options_votes_total * 100}%`;
    document.querySelector('#D-stats').style.width = `${options_statistics[3] / options_votes_total * 100}%`;
    console.log(options_statistics[0] / options_votes_total * 100);

/*
    <div class="flex-stats"><div class="option">A. </div> <div id="A-stats"></div></div>
    <div class="flex-stats"><div class="option">B. </div> <div id="B-stats"></div></div>
    <div class="flex-stats"><div class="option">C. </div> <div id="C-stats"></div></div>
    <div class="flex-stats"><div class="option">D. </div> <div id="D-stats"></div></div>
                    */
}

function end_quiz() {

}