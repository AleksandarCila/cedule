// db.js
import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: "ozivitrenutak.rs",
    port: 3306,
    database: "ozivitre_cedule",
    user: "ozivitre_cedule_user",
    password: "Jasamacabre96"
  }
});
export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
