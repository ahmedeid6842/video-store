const pg_format = require("pg-format")

const { createCustomer, getCustomer, updateCustomer, deleteCustomer } = require("../database/queries/customer");
const { createCustomerSchema, updateCusomterSchema } = require("../validators/customer")
const pool = require("../database/connect");

module.exports.createCustomer = async (req, res) => {
    let { name, isGold, phone } = req.body;
    isGold = isGold || false;

    const { error } = createCustomerSchema(req.body);
    if (error) return res.status(400).send(error.message);

    let customer = await pool.query(pg_format(getCustomer, 'name', name));
    if (customer.rows.length) return res.send("customer already exists");

    customer = await pool.query(createCustomer, [name, isGold, phone]);
    return res.send(customer.rows[0])
}

module.exports.getCustomer = async (req, res) => {
    const { id } = req.params;
    let customer = await pool.query(pg_format(getCustomer, 'customer_id', id))
    console.log(customer);
    if (!customer.rows.length) return res.status(404).send('no customer found with that id');

    return res.send(customer.rows[0]);
}

module.exports.updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { error } = updateCusomterSchema(req.body);
    if (error) return res.status(400).send(error.message);

    const customer = await pool.query(pg_format(updateCustomer, 'name', req.body.name, id));

    if(!customer.rows.length) return res.status(404).send('no customer found')
    res.send("user update succesfully");
}

module.exports.deleteCustomer = async (req, res) => {
    const customer = await pool.query(deleteCustomer, [req.params.id]);
    console.log(customer);
    
    if (!customer.rows.length) return res.status(404).send('no customer found');
    
    res.send("user deleted succesfully");
}