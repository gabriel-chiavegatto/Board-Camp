import { connection } from "../database.js";

export default async function gameList(req, res) {
    try {
        const {name} = req.query;

        const games = (await (connection.query('SELECT * FROM games'))).rows;

        for (let i = 0; i < games.length; i++) {
            const categoryName = (await connection.query('SELECT name FROM categories WHERE id = $1',[games[i].categoryId])).rows[0];
            games[i] = {
                ...games[i],
                categoryName: categoryName.name
            }
        }

        res.status(200).send(games);
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}