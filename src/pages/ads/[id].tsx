import { AdCardProps } from "@/components/AdCard";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ad, setAd] = useState<AdCardProps>();

  async function fetchAd() {
    const res = await axios.get<AdCardProps>(`http://localhost:5001/ads/${id}`);
    setAd(res.data);
  }

  useEffect(() => {
    if (typeof id === "string") {
      fetchAd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Layout title="Ad">
      {ad && (
        <>
          <img src={ad.picture} alt="" />
          <h2>{ad.title}</h2>
          <p>{ad.price} €</p>
          <p>{ad.description}</p>
        </>
      )}
    </Layout>
  );
};

export default AdDetail;
