import fs from "node:fs";
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

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  // becouse instruction is displayed as dangerouslySetInnerHTML xss cleans editional lines from instruction
  meal.instruction = xss(meal.instruction);

  // save image in public folder and add urt to db
  // get image extension
  const extension = meal.image.name.split(".").pop();
  // generate unic file name
  const fileName = `${meal.slug}.${extension}`;
  //save into public/images folder(Storing Uploaded Images )
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  //Storing Data in the Database
  meal.image = `/images/${fileName}`;

  // save all to db
  db.prepare(
    `
  INSERT INTO meals (title,summary,instructions,creator,creator_email,image,slug)
  VALUES (
    @title,
    @summary,
    @instructions, 
    @creator,
    @creator_email,
    @image,
    @slug
    )
  `
  ).run(meal);
}
