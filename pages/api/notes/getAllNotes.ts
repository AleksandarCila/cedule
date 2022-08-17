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
          query: "SELECT * FROM notes",
        });

        res.status(200).json(results);
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
