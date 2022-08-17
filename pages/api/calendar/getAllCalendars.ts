import excuteQuery from "../../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";

import Calendar from "../../../types/interfaces/Calendar";
import Event from "@mui/icons-material/Event";

import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let results;
  const token = await getToken({ req });
  if (token) {
    // Signed in
    if (req.method === "GET") {
      try {
        results = await excuteQuery({
          query: "SELECT * FROM calendars WHERE user_id = ?",
          values:[ token.id]
        });
        // results = JSON.stringify(results);
        let calendars = await Promise.all(
          results.map(async (calendar: Calendar) => {
            const events = await excuteQuery({
              query: "SELECT * FROM events WHERE calendar_id = ?",
              values: [calendar.id],
            });

            return {
              ...calendar,
              events: events.map((event: Event) => {
                return { ...event, color: calendar.color };
              }),
            };
          })
        );

        res.status(200).json(calendars);
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
