import excuteQuery from "../../../config/db";

export default async function handler(req, res) {
    let results;
    if (req.method === "POST") {
        try {
            console.log(req.body);
            let result = await excuteQuery({
                query: "DELETE FROM events WHERE id = ?",
                values: [req.body],
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
