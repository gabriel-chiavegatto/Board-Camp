import { connection } from "../database.js"

export default async function rentalList(req, res) {
    try {
        let rentals = (await connection.query('SELECT * FROM rentals')).rows;
        // console.log(rentals)

        for (let i = 0; i < rentals.length; i++) {
            const customer = (await connection.query('SELECT id, name FROM customers WHERE id = $1',[rentals[i].customerId])).rows[0];
            let game = (await connection.query('SELECT id, name, "categoryId" FROM games WHERE id = $1',[rentals[i].gameId])).rows[0];
            const categoryName = (await connection.query('SELECT name FROM categories WHERE id = $1',[game.categoryId])).rows[0];
            console.log(customer, game, categoryName);
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