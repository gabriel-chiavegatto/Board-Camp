import { connection } from "../database.js";

export default async function deleteRental(req, res) {
    try {
        const { id } = req.params;

        const rental = (await connection.query('SELECT * FROM rentals WHERE id = $1', [id])).rows[0];
        if (!rental) { return res.sendStatus(404) }
        if (rental.returnDate === null) { return res.sendStatus(400) }

        await connection.query('DELETE FROM rentals WHERE id = $1', [id]);
        res.sendStatus(200)

    } catch (error) {
        console.log(error);
        res.sendStatus(422)
    }
}