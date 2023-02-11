export const createCustomer = `
    INSERT INTO customers(name,isGold,phone)
    VALUES($1,$2,$3)   
    RETURNING *
`;

export const getCustomer = `
    SELECT * FROM customers
    WHERE %I = %L
`;

export const updateCustomer = `
    UPDATE customers SET %I = %L
    WHERE customer_id = %L
    RETURNING *
`;

export const deleteCustomer = `
DELETE from customers 
WHERE customer_id = $1
RETURNING *
`;
