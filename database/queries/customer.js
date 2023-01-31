const createCustomer = `
    INSERT INTO customers(name,isGold,phone)
    VALUES($1,$2,$3)   
    RETURNING *
`;

const getCustomer = `
    SELECT * FROM customers
    WHERE %I = %L
`;

const updateCustomer = `
    UPDATE customers SET %I = %L
    WHERE customer_id = %L
`

const deleteCustomer = `
DELETE from customers 
WHERE customer_id = $1
RETURNING *
`
module.exports = {
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer
}