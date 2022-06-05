import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        {/**Product Feed */}
        <ProductFeed />
      </main>
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
