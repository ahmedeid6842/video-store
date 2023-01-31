const _ = require('lodash');
const bcrypt = require("bcrypt");
const pg_format = require("pg-format");

const pool = require("../database/connect");
const { getUser, createUser } = require("../database/queries/user");
const { createToken, verifyToken } = require("../utils/token");
const { createUserSchema, loginUserSchema } = require("../validators/users")

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const { error } = loginUserSchema(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await pool.query(pg_format(getUser, 'email', email));
    if (!user.rows.length) return res.status(400).send("invalid user name or password");

    const validpass = await bcrypt.compare(password, user.rows[0].password);
    if (!validpass) return res.status(400).send("invalid user name or password");

    const token = createToken({ _id: user.rows[0].user_id, isAdmin: user.rows[0].isadmin });;

    return res.header('x-auth-token', token).send("loggin succesfully");
}

module.exports.register = async (req, res) => {
        let { name, email, password } = req.body;
        const { error } = createUserSchema(req.body);
        if (error) return res.status(400).send(error.message);

        let user = await pool.query(pg_format(getUser, 'email', email));
        if (user.rows.length) return res.status(400).send('email already used');

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        user = await pool.query(createUser, [name, email, password]);

        const token = createToken({ _id: user.rows[0].user_id });
        res.header('x-auth-token', token).send(_.pick(user.rows[0], ['name', 'email']));
}