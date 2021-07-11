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

    async createQuestion(req, res) {
        const response = await pool.query("INSERT INTO questions (description, option_a, option_b, option_c, option_d, difficulty, subject, author) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id", [
            req.body.description,
            req.body.option_a,
            req.body.option_b,
            req.body.option_c,
            req.body.option_d,
            req.body.difficulty,
            req.body.subject,
            req.body.author
        ]);
        res.status(200).json({response: response.rows[0].id});
    },
    
};  