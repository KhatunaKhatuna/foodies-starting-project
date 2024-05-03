import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // this await we dont use in real code
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}
