import Link from "next/link";
import { Suspense } from "react";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/MealsGrid";
import { getMeals } from "@/lib/meals";

export const metadata = {
  title: "All Meals",
  description: "Brows the delicious meals shared by our vibrant community.",
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header>
        <h1>
          Delicious meals, creaed{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
