/* eslint-disable @next/next/no-img-element */
import { AdCardProps } from "@/components/AdCard";
import Layout from "@/components/Layout";
import { GET_AD } from "@/graphql/queryAd";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

const AdDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useQuery<{ getAdById: AdCardProps }>(
    GET_AD,
    { variables: { id } }
  );

  const ad = data?.getAdById;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Layout title="Ad">
      {ad && (
        <>
          <img src={ad.picture} alt={ad.title} width={300} height={300} />
          <h2>{ad.title}</h2>
          <p>{ad.price} €</p>
          <p>{ad.description}</p>
          <Link href={`/ads/${ad.id}/edit`}>Modifier l&apos;annonce</Link>
        </>
      )}
    </Layout>
  );
};

export default AdDetail;
