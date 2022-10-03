import { connection } from "../database.js";

export default async function theCustomer(req,res){
    try{
        const {id} = req.params;
        const customer = (await connection.query('SELECT * FROM customers WHERE id = $1',[id])).rows[0];
        if(!customer){
            return res.sendStatus(404);
        }
        res.status(200).send(customer)
    }catch(error){
        console.log(error);
        res.sendStatus(422);
    }
}