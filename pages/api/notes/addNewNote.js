import excuteQuery from "../../../config/db";

export default async function handler(req, res) {
    let results;
    if (req.method === "POST") {
        try {
            const result = await excuteQuery({
                query: "INSERT INTO notes (user_id,title,content,date) VALUES(?,?,?,?)",
                values: [1, req.body.title, req.body.content, req.body.date],
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
