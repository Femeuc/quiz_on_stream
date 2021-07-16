const pool = require('../database/connection');


module.exports = {

    async getGeneralAndChannelSubjects(req, res) {
        const response = await pool.query("SELECT * FROM question_subjects WHERE is_general_subject = true or channel = $1", [
            req.query.name
        ]);
        res.status(200).json({response: response.rows});
    },
    
};  