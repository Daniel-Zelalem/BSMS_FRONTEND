"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function CheckoutPage() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const amount = useSelector((state) => state.calForListingFee.value);
  const email = currentUser.user.Email;
  const fee = amount.amount;
  const router = useRouter();

  const Payment = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/payment/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            Fee: fee,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      router.push(res.data.data.checkout_url);
      console.log(res.data.data.checkout_url);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-4/12 mx-auto px-4 py-8">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-semibold mb-4 items-center mx-auto">
            Property Listing Fee
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={`${currentUser.user.FirstName}  ${currentUser.user.LastName}`}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={currentUser.user.Email}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="card"
            >
              Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="card"
              type="text"
              placeholder="Card number"
              value={amount.amount}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green hover:bg-green/80 text-white font-light py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={Payment}
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
