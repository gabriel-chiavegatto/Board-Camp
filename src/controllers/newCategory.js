import joi from 'joi';
import { connection } from '../database.js';

export default async function newCategory(req,res){
    try{
        const {name} = req.body;

        const schemaName = joi.string().required();
        const validation = schemaName.validate(name);
        if(validation.error){
            return res.sendStatus(400);
        }

        const existingCategory = await connection.query('SELECT * FROM categories WHERE name = $1', [name]);
        if(existingCategory.rows.length !== 0){
            console.log(existingCategory);
            return res.sendStatus(409);
        }

        await connection.query('INSERT INTO categories (name) VALUES ($1)',[name])

        res.sendStatus(201);
    } catch(error){
        console.log(error);
        res.sendStatus(422);
    }
}