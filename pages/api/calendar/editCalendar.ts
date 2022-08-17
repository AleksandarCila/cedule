import excuteQuery from "../../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (token) {
    // Signed in

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
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
