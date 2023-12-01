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
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  const addPriceToTotal = (price: number) => {
    setTotal(total + price);
  };

  const { data, error, loading } = useQuery<{
    getAds: AdCardProps[];
    count: number;
  }>(GET_ADS, {
    variables: {
      where: {
        ...(categoryId ? { categoryIn: categoryId } : {}),
        ...(searchWord ? { searchTitle: searchWord } : {}),
      },
      skip: page * pageSize,
      take: pageSize,
    },
  });

  const ads = data?.getAds || [];
  const count = data?.allAdsCount || 0;

  const pagesCount = Math.ceil(count / pageSize);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Prix total : {total} €</p>
      <p>
        Page {page + 1} - {pagesCount}
      </p>
      <button
        onClick={() => setPage(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        Précédent
      </button>
      <button
        onClick={() => setPage(Math.min(page + 1, pagesCount))}
        disabled={page === pagesCount - 1}
      >
        Suivant
      </button>
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
              tags={[]}
            />
          </div>
        ))}
      </section>
    </>
  );
};
