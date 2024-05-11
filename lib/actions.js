"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !text || text.trim() === "";
}
export async function shareMealAction(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    // imagepicker shoud have lable and name to get.image
    image: formData.get("image"),
    //name and email are names of input
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // this throws error from error file
    // throw new Error("Invalid input");

    // this uses useActionState
    return {
      message: "Invalid input.",
    };
  }
  await saveMeal(meal);
  // redirects after form submit
  redirect("/meals");
}
