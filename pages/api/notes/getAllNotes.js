import excuteQuery from "../../../config/db";

export default async function handler(req, res) {
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
}
