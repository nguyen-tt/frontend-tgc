import styles from "./AdCard.module.css";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { DELETE_AD } from "@/graphql/mutationDeleteAd";

export type AdType = {
  id: number;
  title: string;
  price: number;
  link: string;
  description: string;
  owner: string;
  picture: string;
  location: string;
  category: { id: number };
  tags: number[];
};

export type AdCardProps = AdType & {
  onDelete?: () => void;
  onAddPriceToTotal: (price: number) => void;
};

export const AdCard = ({
  id,
  title,
  picture,
  price,
  link,
  description,
  owner,
  location,
  category,
  tags,
  onDelete,
  onAddPriceToTotal,
}: AdCardProps): React.ReactNode => {
  const [isDeleted, setIsDeleted] = useState(false);

  const [deleteAdMutation] = useMutation<{ deleteAd: AdCardProps }>(DELETE_AD, {
    refetchQueries: ["GetAds"],
  });

  async function deleteAd() {
    await deleteAdMutation({
      variables: {
        id: id,
      },
    });
    setIsDeleted(true);
    if (onDelete) {
      onDelete();
    }
  }

  return (
    <div className={styles["ad-card-container"]}>
      {isDeleted && <p>Bien supprimée !</p>}

      <div className={styles["ad-card-content"]}>
        <Link className={styles["ad-card-link"]} href={link}>
          <img className={styles["ad-card-image"]} src={picture} />
        </Link>
        <div className={styles["ad-card-title"]}>{title}</div>
        <div className={styles["ad-card-price"]}>{price} €</div>
        <div className={styles["ad-card-description"]}>{description}</div>
        <div className={styles["ad-card-owner"]}>{owner}</div>
        <div className={styles["ad-card-location"]}>{location}</div>
        <button className="button" onClick={() => onAddPriceToTotal(price)}>
          Ajouter le prix au total
        </button>
        <button type="button" onClick={deleteAd}>
          Supprimer
        </button>
      </div>
    </div>
  );
};
