import Link from "next/link";
import styles from "./Category.module.css";

export type CategoryType = {
  id: number;
  name: string;
};

export type CategoryProps = CategoryType;

export const Category = ({ name, id }: CategoryProps) => {
  return (
    <div>
      <Link
        href={`/categories/${id}`}
        className={styles["category-navigation-link"]}
      >
        {name}
      </Link>
    </div>
  );
};
