import Layout from "@/components/Layout";
import { RecentAds } from "@/components/RecentAds";
import { useRouter } from "next/router";

export default function Ads() {
  const router = useRouter();
  const searchWord = String(router.query.searchWord);

  return (
    <Layout title="Ads">
      <RecentAds searchWord={searchWord} />
    </Layout>
  );
}
