import { CategoryProps, CategoryType } from "@/components/Category";
import Layout from "@/components/Layout";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import styles from "./new.module.css";
import { useRouter } from "next/router";

const NewAd = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<"title" | "price">();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [picture, setPicture] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<number | null>(null);

  async function fetchCategories() {
    const res = await axios.get<CategoryType[]>(
      "http://localhost:5001/categories"
    );
    setCategories(res.data);
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);
    const data = {
      title,
      price,
      description,
      owner,
      picture,
      location,
      category,
    };

    if (data.title.trim().length > 0) {
      setError("title");
    } else if (data.price < 0) {
      setError("price");
    } else {
      const res = await axios.post("http://localhost:5001/ads", data);
      if ("id" in res.data) {
        setTitle("");
        setPrice(0);
        setDescription("");
        setOwner("");
        setPicture("");
        setLocation("");
        setCategory(null);

        setIsAdded(true);
        setTimeout(() => {
          router.push(`/ads/${res.data.id}`);
        }, 5000);
      }
    }
  }

  return (
    <Layout title="Nouvelle annonce">
      <form onSubmit={onSubmit} className={styles.form}>
        {isAdded ? (
          <p>Nouvelle annonce bien ajoutée !</p>
        ) : (
          <>
            {error === "price" && <p>Le prix doit être positif</p>}
            {error === "title" && <p>Le titre est requis</p>}
          </>
        )}

        <label className={styles.label}>
          Titre de l&apos;annonce :
          <input
            type="text"
            className={styles["text-field"]}
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Prix :
          <input
            type="number"
            className={styles["text-field"]}
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <label className={styles.label}>
          Description :
          <textarea
            name="description"
            className={styles["description-field"]}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Nom du propriétaire :
          <input
            type="text"
            className={styles["text-field"]}
            name="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Image :
          <input
            type="text"
            className={styles["text-field"]}
            name="picture"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Lieu :
          <input
            type="text"
            className={styles["text-field"]}
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <select
          name="category"
          className={styles["select-field"]}
          value={category + ""}
          onChange={(e) => setCategory(Number(e.target.value))}
        >
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className={styles.button}>
          Poster l&apos;annonce
        </button>
      </form>
    </Layout>
  );
};

export default NewAd;
