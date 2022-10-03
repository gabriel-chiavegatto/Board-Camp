import { connection } from "../database.js";

export default async function gameList(req,res){
    try{
        const games = await connection.query("SELECT * FROM games");
        res.status(200).send(games.rows);
    } catch(error){
        console.log(error);
        res.sendStatus(422);
    }
}