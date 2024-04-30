const pool = require('../db');
require('dotenv').config();
class Course{
    static async createCourse(name, file, author_id){
        const query ='INSERT INTO courses (name, file, author_id) VALUES($1, $2, $3) RETURNING *';
        const values = [name, file, author_id];
        const {rows} = await pool.query(query,values);
        return rows[0];

    }

    static async getCourse(){
        const query ='SELECT * FROM courses';
        const {rows} =await pool.query(query);
        return rows;

    }
}

module.exports = Course;