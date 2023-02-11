export const getUser = ` SELECT * FROM users WHERE %I = %L`;
export const createUser = `INSERT INTO users(name,email,password) values($1,$2,$3) RETURNING *`;

