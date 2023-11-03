import { AdCardProps } from "@/components/AdCard";
import { AdForm } from "@/components/AdForm";
import Layout from "@/components/Layout";
import { GET_AD } from "@/graphql/queryAd";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function EditAd() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, loading } = useQuery<{ getAdById: AdCardProps }>(
    GET_AD,
    { variables: { id } }
  );

  const ad = data?.getAdById;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <Layout title="Ad">{ad && <AdForm ad={ad} />}</Layout>;
}
