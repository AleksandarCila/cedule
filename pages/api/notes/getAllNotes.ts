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

    let results;
    if (req.method === "GET") {
      try {
        // console.log("req nom", req.body)
        results = await excuteQuery({
          query: "SELECT * FROM notes WHERE user_id = ? ORDER BY date DESC",
          values: [token.id],
        });
        if (results.error) {
          throw Error("DB Connection error")
        } else {
          res.status(200).json(results);
        }
      } catch (error) {
        res
          .status(400)
          .end(JSON.stringify({ message: "ERROR: " + JSON.stringify(error) }));
      }
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
