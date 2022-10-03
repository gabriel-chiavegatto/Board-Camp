import { connection } from "../database.js"

export default async function rentalList(req, res) {
    try {
        const { customerId, gameId } = req.query;

        let rentals;
        if (customerId) {
            rentals = (await connection.query('SELECT * FROM rentals WHERE "customerId" = $1', [customerId])).rows;
        } if (gameId) {
            rentals = (await connection.query('SELECT * FROM rentals WHERE "gameId" = $1', [gameId])).rows;
        } else {
            rentals = (await connection.query('SELECT * FROM rentals')).rows;
        }


        for (let i = 0; i < rentals.length; i++) {
            const customer = (await connection.query('SELECT id, name FROM customers WHERE id = $1', [rentals[i].customerId])).rows[0];
            let game = (await connection.query('SELECT id, name, "categoryId" FROM games WHERE id = $1', [rentals[i].gameId])).rows[0];
            const categoryName = (await connection.query('SELECT name FROM categories WHERE id = $1', [game.categoryId])).rows[0];

            game = {
                ...game,
                categoryName: categoryName.name
            }
            rentals[i] = {
                ...rentals[i],
                customer,
                game
            }
        }

        res.status(200).send(rentals);
    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }
}