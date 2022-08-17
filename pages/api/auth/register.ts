import excuteQuery from "../../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      let result = await excuteQuery({
        query: "SELECT * FROM users WHERE email = ?",
        values: [req.body.email],
      });
      result = JSON.stringify(result);
      result = JSON.parse(result);
      if (result.length > 0) {
        console.log(req.body.email);

        res.status(500);
        res.json({
          error: {
            message:"E-mail already exists",
          },
        });
        res.end();
        return;
      }
    } catch (err) {}

    try {
      const saltRounds = 10;
      let password = req.body.password;
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        const result = await excuteQuery({
          query: "INSERT INTO users (email, password) VALUES(?,?)",
          values: [req.body.email, hash],
        });

        res.status(201).end(JSON.stringify({ result }));
      });
    } catch (error) {
      res
        .status(400)
        .end(JSON.stringify({ message: "ERROR: " + JSON.stringify(error) }));
    }
    return;
  }
}
