import dayjs from "dayjs";
import { connection } from "../database.js";

export default async function returnGame(req, res) {
    try {
        const { id } = req.params;

        const rental = (await connection.query('SELECT * FROM rentals WHERE id=$1', [id])).rows[0];
        if (!rental) { return res.sendStatus(404) }
        if (rental.returnDate !== null) { return res.sendStatus(400) }

        const today = dayjs().format("YYYY-MM-DD");
        const rentDay = dayjs(rental.rentDate);
        const diference = dayjs(today).diff(rentDay, 'day');
        if (diference > 0) {
            const game = (await connection.query('SELECT "pricePerDay" FROM games WHERE id = $1', [rental.gameId])).rows[0];
            const delayFee = diference * game.pricePerDay;

            await connection.query('UPDATE rentals SET "delayFee"=$1 WHERE id=$2', [delayFee, id])
        }

        await connection.query('UPDATE rentals SET "returnDate"=$1 WHERE id=$2', [today, id]);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}