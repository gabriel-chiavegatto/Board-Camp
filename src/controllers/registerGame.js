import joi from "joi";
import { connection } from "../database.js";

export default async function registerGame(req, res) {
    try {
        const {name, image, stockTotal, categoryId, pricePerDay} = req.body;

        const schemaGame = joi.object({
            name: joi.string().required(),
            image: joi.string(),
            stockTotal: joi.number().greater(0).required(),
            categoryId: joi.number().required(),
            pricePerDay: joi.number().greater(0).required()
        });
        const validation = schemaGame.validate(req.body);
        if(validation.error){
            return res.sendStatus(400)
        }

        const confirmCategoryId = await connection.query('SELECT * FROM categories WHERE id = $1',[categoryId]);
        if(confirmCategoryId.rows.length === 0){
            return res.sendStatus(400)
        }

        const confirmNameAvailability = await connection.query('SELECT * FROM games WHERE name = $1',[name]);
        if(confirmNameAvailability.rows.length !== 0){
            return res.sendStatus(400)
        }

        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5);',[name, image, stockTotal, categoryId, pricePerDay]);
        
        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(422)
    }
}