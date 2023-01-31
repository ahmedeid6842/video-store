
const getUser = ` SELECT * FROM users WHERE %I = %L`;
const createUser = `INSERT INTO users(name,email,password) values($1,$2,$3) RETURNING *`

module.exports = {
    getUser,
    createUser
}