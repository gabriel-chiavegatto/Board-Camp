import { connection } from "../database.js";

export default async function customersList(req, res){
    try{
        const {cpf} = req.query;

        const customers = (await connection.query('SELECT * FROM customers')).rows;

        res.status(200).send(customers)
    } catch(error){
        res.sendStatus(422)
    }
}