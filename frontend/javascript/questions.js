console.log(localStorage['difficulties']);
console.log(localStorage['subjects']);
const channel = localStorage['username'];

const api_url = `http://localhost:3000/questions/subjects/channel?name=${channel}`;

get_question_subjects(api_url);
async function get_question_subjects(api_url) {
    // Storing response
    const response = await fetch(api_url);
    
    // Storing data in form of JSON
    const data = await response.json();
    console.log(data.response);

    let general_subjects = [];
    let channel_subjects = [];

    for(let i = 0; i < data.response.length; i++) {
        if(data.response[i].is_general)
            general_subjects.push(data.response[i]);
        else
            channel_subjects.push(data.response[i]);
    }

    add_general_subjects(general_subjects);
    add_channel_subjects(channel_subjects);
}
