import excuteQuery from "../../../config/db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
