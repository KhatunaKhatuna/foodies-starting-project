import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // this await we dont use in real code
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //  check error page
  // throw new Error("Loading meals failed");

  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  //  check error page
  // throw new Error("Loading meals failed");

  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}
