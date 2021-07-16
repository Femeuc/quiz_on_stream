const pool = require('../database/connection');

module.exports = {
    async getAllQuestions(req, res) {
        const response = await pool.query("SELECT * FROM questions");
        res.status(200).json({response: response.rows});
    },

    async getQuestionById(req, res) {
        const response = await pool.query("SELECT * FROM questions WHERE id = $1", [
            req.params.id
        ]);
        res.status(200).json({response: response.rows});
    },

    async getQuestionsByFilters(req, res) {

        const difficulties = adaptDifficultiesToDatabase(req.query.difficulty);
        const subjects = await adaptSubjectsToDatabase(req.query.subject);
        
        const response = await pool.query("SELECT id FROM questions WHERE subject = ANY ($1) AND difficulty = ANY ($2)", [
            subjects,
            difficulties
        ]);
        res.status(200).json({response: response.rows});
    }, 

    async createQuestion(req, res) {
        const response = await pool.query("INSERT INTO questions (description, option_a, option_b, option_c, option_d, correct_option, difficulty, subject, author) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id", [
            req.body.description,
            req.body.option_a,
            req.body.option_b,
            req.body.option_c,
            req.body.option_d,
            req.body.answer,
            req.body.difficulty,
            req.body.subject,
            req.body.author.toLowerCase()
        ]);
        res.status(200).json({response: response.rows[0].id});
    },
    
};  


function adaptDifficultiesToDatabase(difficulties) {

    let new_difficulty_array = [];
        
    if(typeof(difficulties) == 'object') {
        for(let i = 0; i < difficulties.length; i++){
            switch(difficulties[i]) {
                case 'easy':
                    difficulties[i] = 1;
                    break;
                case 'normal':
                    difficulties[i] = 2;
                    break;
                case 'hard':
                    difficulties[i] = 3;
                    break;
            }
        }
        new_difficulty_array = difficulties;
    } else {
        switch(difficulties) {
            case 'easy':
                difficulties = 1;
                break;
            case 'normal':
                difficulties = 2;
                break;
            case 'hard':
                difficulties = 3;
                break;
        }
        new_difficulty_array.push(difficulties);
    }
    return new_difficulty_array;
}

async function adaptSubjectsToDatabase(subjects) {
    let new_subjects_array = [];
    new_subjects_array.push(subjects);
    
    const response = await pool.query(`SELECT id FROM question_subjects WHERE subject_simplified = ANY ($1)`, [
        new_subjects_array
    ]);

    new_subjects_array = response.rows.map(function(value, index) {
        return value.id;
    });
    
    return (new_subjects_array);
}