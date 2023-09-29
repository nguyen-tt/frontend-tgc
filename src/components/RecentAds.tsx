import { useEffect, useState } from "react";
import { AdCard, AdCardProps } from "./AdCard";
import styles from "./RecentAds.module.css";
import axios from "axios";

export const RecentAds = (category: number) => {
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);

  const addPriceToTotal = (price: number) => {
    setTotal(total + price);
  };

  async function fetchAds() {
    let url = `http://localhost:5001/ads?`;
    if (category) {
      url += `categoryIn=${category}`;
    }
    const res = await axios.get(url);
    setAds(res.data);
  }

  useEffect(() => {
    fetchAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total : {total} €</p>
      <section className={styles["recent-ads"]}>
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              picture={ad.picture}
              link={`/ads/${ad.id}`}
              price={ad.price}
              title={ad.title}
              onDelete={fetchAds}
            />
            <button
              className="button"
              onClick={() => addPriceToTotal(ad.price)}
            >
              Add price to total
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
