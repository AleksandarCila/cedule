import excuteQuery from "../../../config/db";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            let result = await excuteQuery({
                query: "DELETE FROM calendars WHERE id = ?",
                values: [req.body],
            });
            result = await excuteQuery({
                query: "DELETE FROM events WHERE calendar_id = ?",
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
