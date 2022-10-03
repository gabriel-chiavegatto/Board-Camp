import { connection } from "../database.js";

export default async function listCategories(req,res){
    try{
        const categories = await connection.query('SELECT * FROM categories');
        res.status(200).send(categories.rows);
    } catch(error){
        console.log(error);
        res.sendStatus(422)
    }
}