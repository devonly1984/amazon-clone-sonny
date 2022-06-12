import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import Header from "../components/Header";
import Image from "next/image";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);
const Checkout = () => {
  const items = useSelector(selectItems);
  const { data: session } = useSession();
  const total = useSelector(selectTotal);
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session?.user?.email,
    });
    console.log(session);
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-2xl mx-auto">
        {/**Left*/}
        <div className="m-5 shadow-sm flex-grow">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          {/**Left */}
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {" "}
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct key={i} item={item} />
            ))}
          </div>
          {/**Right */}
          <div className="flex flex-col p-10 bg-white shadow-md">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal ({items.length} items):
                  <span className="text-bold">
                    <Currency quantity={total} />
                  </span>
                </h2>
                <button
                  role="link"
                  onClick={createCheckoutSession}
                  disabled={!session}
                  className={`button mt-2 ${
                    !session &&
                    "from-grey-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {!session ? "Sign in to checkout" : "Proceed to Checkout"}
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
