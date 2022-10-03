import { connection } from "../database.js";
import joi from 'joi';

export default async function updateCustomer(req,res){
    try{
        const {id} = req.params;
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

        const customer = (await connection.query('SELECT * FROM customers WHERE id = $1',[id])).rows[0];
        if(!customer){
            res.sendStatus(404)
        }

        await connection.query('UPDATE customers SET name = $1 WHERE id = $2',[name, id]);
        await connection.query('UPDATE customers SET phone = $1 WHERE id = $2',[phone, id]);
        await connection.query('UPDATE customers SET cpf = $1 WHERE id = $2',[cpf, id]);
        await connection.query('UPDATE customers SET birthday = $1 WHERE id = $2',[birthday, id]);

        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.sendStatus(422);
    }
}