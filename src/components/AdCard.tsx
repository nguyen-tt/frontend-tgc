import axios from "axios";
import styles from "./AdCard.module.css";
import React, { useState } from "react";

export type AdType = {
  id: number;
  title: string;
  picture: string;
  price: number;
  description: string;
  link: string;
};

export type AdCardProps = AdType & {
  onDelete?: () => void;
};

export const AdCard = ({
  id,
  title,
  picture,
  price,
  link,
  onDelete,
}: AdCardProps): React.ReactNode => {
  const [isDeleted, setIsDeleted] = useState(false);

  async function deleteAd() {
    await axios.delete<AdCardProps>(`http://localhost:5001/ads/${id}`);
    if (onDelete) {
      onDelete();
      setIsDeleted(true);
    }
  }
  return (
    <div className={styles["ad-card-container"]}>
      {isDeleted && <p>Bien supprimée !</p>}

      <a className={styles["ad-card-link"]} href={link}>
        <img className={styles["ad-card-image"]} src={picture} />
        <div className={styles["ad-card-text"]}>
          <div className={styles["ad-card-title"]}>{title}</div>
          <div className={styles["ad-card-price"]}>{price} €</div>
        </div>
      </a>
      <button type="button" onClick={deleteAd}>
        Supprimer
      </button>
    </div>
  );
};
