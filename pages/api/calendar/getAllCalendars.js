import excuteQuery from "../../../config/db";

export default async function handler(req, res) {
  let results;
  if (req.method === "GET") {
    try {
      // console.log("req nom", req.body)
      results = await excuteQuery({
        query: "SELECT * FROM calendars",
      });
      // results = JSON.stringify(results);
      let calendars = await Promise.all(results.map(async (result) => {
        const events = await excuteQuery({
          query: "SELECT * FROM events WHERE calendar_id = ?",
          values: [result.id]
        })

        return ({
          ...result,
          events: events.map((event) => { return { ...event, color: result.color } }),
        })
      }))
      console.log(calendars);
      res.status(200).json(calendars);
    } catch (error) {
      console.log(error);
    }
  }
}
