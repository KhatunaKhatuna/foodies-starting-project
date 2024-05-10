import classes from "./loading.module.css";
// this does not need and does not wotks becouse of name of file
export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}
