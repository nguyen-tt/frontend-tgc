import { useState } from "react";
import { AdCard, AdCardProps } from "./AdCard";
import styles from "./RecentAds.module.css";
import { useQuery } from "@apollo/client";
import { GET_ADS } from "@/graphql/queryAds";

type RecentAdsProps = {
  categoryId?: number;
  searchWord?: string;
};

export const RecentAds = ({
  categoryId,
  searchWord,
}: RecentAdsProps): React.ReactNode => {
  const [total, setTotal] = useState(0);

  const addPriceToTotal = (price: number) => {
    setTotal(total + price);
  };

  const { data, error, loading } = useQuery<{ getAds: AdCardProps[] }>(
    GET_ADS,
    {
      variables: {
        where: {
          ...(categoryId ? { categoryIn: categoryId } : {}),
          ...(searchWord ? { searchTitle: searchWord } : {}),
        },
      },
    }
  );

  const ads = data?.getAds || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

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
              description={ad.description}
              owner={ad.owner}
              location={ad.location}
              category={ad.category}
              onAddPriceToTotal={() => addPriceToTotal(ad.price)}
              // tags={ad.tags}
            />
          </div>
        ))}
      </section>
    </>
  );
};
