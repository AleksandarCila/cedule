import excuteQuery from "../../../config/db";

export default async function handler(req, res) {
    let results;
    if (req.method === "POST") {
        try {
            const result = await excuteQuery({
                query: "INSERT INTO events (calendar_id,type,name,description,color,allDay, eventDate, eventStartTime, eventLength) VALUES(?,?,?,?,?,?,?,?,?)",
                values: [req.body.calendar_id, req.body.type, req.body.name, req.body.description, req.body.color, req.body.allDay, req.body.eventDate, req.body.eventStartTime, req.body.eventLength,],
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
