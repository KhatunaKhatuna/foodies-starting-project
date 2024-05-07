import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

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

export function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  // becouse instruction is displayed as dangerouslySetInnerHTML xss cleans editional lines from instruction
  meal.instruction = xss(meal.instruction);
}
