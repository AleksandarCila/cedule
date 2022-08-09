import excuteQuery from "../../../config/db";

export default async function handler(req, res) {
    let results;
    if (req.method === "POST") {
        try {
            const result = await excuteQuery({
                query: "UPDATE calendars SET name = ?, color = ?  WHERE id = ? ",
                values: [req.body.name, req.body.color, req.body.id],
            });

            res.status(201).end(JSON.stringify({ result }));
        } catch (error) {
            res
                .status(400)
                .end(JSON.stringify({ message: "ERROR: " + JSON.stringify(error) }));
        }
        return;
    }
}
