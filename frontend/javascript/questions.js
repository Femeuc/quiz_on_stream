const questions_ids = JSON.parse(localStorage['questions_ids']);
const asked_questions_id = [];

console.log(questions_ids);

hideElements();
get_question_by_id();

async function get_question_by_id() {
    let api_url = "http://localhost:3000/question";

    const random_number = Math.floor(Math.random() * questions_ids.length);
    const random_question_id = questions_ids[random_number].id;

    api_url += `/${random_question_id}`;

    const response = await fetch(api_url);
    
    // Storing data in form of JSON
    const data = await response.json();
    const question = data.response;
    
    load_question(question);
}



function hideElements() {
    document.querySelector('#statistics').style.display = "none";
    document.querySelector('#scores').style.display = "none";
    document.querySelector('#buttons').style.display = "none";
}

function showElements() {
    document.querySelector('#statistics').style.display = "block";
    document.querySelector('#scores').style.display = "block";
    document.querySelector('#buttons').style.display = "block";
}

function load_question(question) {
    const description = question[0].description;
    const option_a = question[0].option_a;
    const option_b = question[0].option_b;
    const option_c = question[0].option_c;
    const option_d = question[0].option_d;
    const correct_option = question[0].correct_option;
    const difficulty = question[0].difficulty;
    const author = question[0].author;

    document.querySelector('#question-description').innerText = description;
    document.querySelector('#op_a').innerText = "A. " + option_a;
    document.querySelector('#op_b').innerText = "B. " + option_b;
    document.querySelector('#op_c').innerText = "C. " + option_c;
    document.querySelector('#op_d').innerText = "D. " + option_d;   
}

function stop_question() {
    showElements();
};