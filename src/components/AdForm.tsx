import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, FormEvent, useEffect } from "react";
import { CategoryProps } from "./Category";
import styles from "./AdForm.module.css";
import { AdType } from "./AdCard";
import { GET_CATEGORIES } from "@/graphql/queryCategories";
import { CREATE_AD } from "@/graphql/mutationCreateAd";
import { UPDATE_AD } from "@/graphql/mutationUpdateAd";
import { GET_ADS } from "@/graphql/queryAds";
import { GET_AD } from "@/graphql/queryAd";

type AdFormData = {
  title: string;
  price: number;
  description: string;
  owner: string;
  picture: string;
  location: string;
  category: { id: number };
  tags: number[];
};

type AdFormProps = {
  ad?: AdType;
};

export const AdForm = ({ ad }: AdFormProps) => {
  const router = useRouter();

  const [isAdded, setIsAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [picture, setPicture] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<{ id: number } | undefined>();
  const [tags, setTags] = useState<number[]>([]);

  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useQuery<{
    getCategories: CategoryProps[];
  }>(GET_CATEGORIES);
  const categories = categoriesData?.getCategories || [];

  const [createAdMutation, { loading: createLoading }] = useMutation(
    CREATE_AD,
    {
      refetchQueries: [GET_ADS],
    }
  );

  const [updateAdMutation, { loading: updateLoading }] = useMutation(
    UPDATE_AD,
    {
      refetchQueries: [GET_AD, GET_ADS],
    }
  );

  const loading = createLoading || updateLoading;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const data: AdFormData = {
      title,
      price,
      description,
      owner,
      picture,
      location,
      category: { id: category?.id || 0 },
      tags,
    };

    if (data.title.trim().length === 0) {
      setErrorMessage("title");
    } else if (data.price < 0) {
      setErrorMessage("price");
    } else {
      if (!ad) {
        const result = await createAdMutation({
          variables: {
            data: data,
          },
        });
        if ("id" in result.data?.createAd) {
          setIsAdded(true);
          setTimeout(() => {
            router.replace(`/ads/${result.data?.createAd.id}`);
          }, 1000);
        }
      } else {
        const result = await updateAdMutation({
          variables: {
            id: ad?.id,
            data: data,
          },
        });
        if (!result.errors?.length) {
          router.replace(`/ads/${ad?.id}`);
        }
      }
    }
  }

  useEffect(() => {
    if (ad) {
      setTitle(ad.title);
      setPrice(ad.price);
      setDescription(ad.description);
      setOwner(ad.owner);
      setPicture(ad.picture);
      setLocation(ad.location);
      setCategory(ad.category?.id ? { id: ad.category.id } : undefined);
      setTags(ad.tags);
    }
  }, [ad]);

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {isAdded && <p>Nouvelle annonce bien ajoutée !</p>}
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
        value={category?.id}
        onChange={(e) => setCategory({ id: Number(e.target.value) })}
      >
        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit" className={styles.button} disabled={loading}>
        {ad ? "Modifier" : "Créer"} l&apos;annonce
      </button>
    </form>
  );
};
