import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewPage = ({ reviews, averageRating, totalReviews, onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 5; 
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleSubmit = () => {
    if (rating > 0 && comment.trim()) {
      onSubmitReview({ rating, comment });
      setRating(0);
      setComment("");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 dark:text-white">
      <div className="flex flex-col md:flex-row items-center justify-between shadow-md p-6 rounded-md dark:bg-slate-800">
        <div className="flex flex-col items-center md:items-start md:w-1/2">
          <div className="text-4xl font-bold text-yellow-500">
            {averageRating.toFixed(1)} <span className="text-gray-700 dark:text-white">Out of 5 Stars</span>
          </div>
          <div className="text-gray-500 mt-2 dark:text-white">
            Overall rating of <span className="text-blue-600 font-medium">{totalReviews} reviews</span>
          </div>
          <div className="mt-4 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <AiFillStar
                      key={index}
                      className={`${
                        index < star ? "text-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="w-40 h-3 bg-gray-200 rounded-full mx-4">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${(reviews.filter((r) => r.rating === star).length / totalReviews) * 100}%` }}
                  ></div>
                </div>
                <div className="text-gray-500">
                  {reviews.filter((r) => r.rating === star).length}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center md:text-right mt-6 md:mt-0 md:w-1/2">
          <img src="https://www.powerreviews.com/wp-content/uploads/2021/12/review-vol-rec.png" alt="" className="w-full h-full"/>
        </div>
      </div>

      <div className="mt-6 shadow-md p-6 rounded-md dark:bg-slate-800">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <span key={index} onClick={() => setRating(index + 1)} className="cursor-pointer">
              {rating > index ? (
                <AiFillStar className="text-yellow-500 text-2xl" />
              ) : (
                <AiOutlineStar className="text-gray-300 text-2xl" />
              )}
            </span>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="Write your review here..."
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600"
        >
          Submit Review
        </button>
      </div>

      <div className="mt-6 shadow-md p-6 rounded-md dark:bg-slate-800">
        <h3 className="text-lg font-semibold mb-4">Reviews</h3>
        {currentReviews.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <AiFillStar
                    key={i}
                    className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <div className="text-gray-700 dark:text-white">{review.comment}</div>
            </div>
            <div className="text-gray-500 text-sm mt-2 dark:text-white">Posted on {new Date().toLocaleDateString()}</div>
          </div>
        ))}

        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded shadow-sm ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;