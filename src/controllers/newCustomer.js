import joi from 'joi';
import { connection } from '../database.js';

export default async function newCustomer(req, res) {
    try {
        const { name, phone, cpf, birthday } = req.body;

        const schemaCustomer = joi.object({
            name: joi.string().required(),
            phone: joi.string().min(10).max(11),
            cpf: joi.string().min(11).max(11),
            birthday: joi.date().iso()
        })
        const validation = schemaCustomer.validate(req.body);
        if(validation.error){
            return res.sendStatus(400);
        }
        if(isNaN(cpf) || isNaN(phone)){
            return res.sendStatus(400);
        }
        const confirmCpfAvailability = (await connection.query('SELECT * FROM customers WHERE cpf = $1',[cpf])).rows;
        if(confirmCpfAvailability.length !== 0){
            res.sendStatus(409)
        }

        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)',[name, phone, cpf, birthday])

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}