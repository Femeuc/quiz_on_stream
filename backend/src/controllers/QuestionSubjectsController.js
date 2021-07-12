const pool = require('../database/connection');


module.exports = {

    async getSubjectsByChannel(req, res) {
        const response = await pool.query("SELECT * FROM question_subjects WHERE is_general_subject = true AND channel = $1", [
            req.query.channel
        ]);
        res.status(200).json({response: response.rows});
    },
    
};  