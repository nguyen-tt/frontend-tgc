import Layout from "@/components/Layout";
import { AdForm } from "@/components/AdForm";

const NewAd = () => {
  return (
    <Layout title="Nouvelle annonce">
      <main className="main-content">
        <AdForm />
      </main>
    </Layout>
  );
};

export default NewAd;
