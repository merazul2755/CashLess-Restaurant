import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const Review = () => {
  const [user] = useAuthState(auth);

  const handleAddReview = (e) => {
    e.preventDefault();

    const review = {
      name: e.target.name.value,
      email: e.target.email.value,
      image: user.photoURL,
      description: e.target.description.value,
    };

    fetch(`https://cashless-restaurant.herokuapp.com/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          toast.success("Review Added");
          window.location.reload();
        }
      });
  };
  return (
    <form
      onSubmit={handleAddReview}
      className="overflow-x-auto relative shadow-md sm:rounded-lg"
    >
      <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Give Review
        </h3>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
              defaultValue={user.displayName}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              defaultValue={user.email}
              required
            />
          </div>

          <div className="col-span-6 sm:col-span-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Text
            </label>
            <textarea
              id="description"
              rows="4"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-5pur00 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
        </div>
      </div>
      {/* <!-- Modal footer --> */}
      <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          ADD
        </button>
      </div>
    </form>
  );
};

export default Review;
