import { useSession } from "next-auth/react";
import Header from "../components/Header";

const orders = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl">Your Orders</h1>
      </main>
    </div>
  );
};

export default orders;
