import React from "react";
import { Link } from "react-router-dom";

// Top companies logos
const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
];

const HomePage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans">

      {/* ✅ Hero Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Find Your <span className="text-blue-600">Dream Job</span> Today
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse thousands of job opportunities, connect with top companies, and
            take the next step in your career.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/jobs"
              className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600">Why Choose JobFinder?</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Simplifying the job search and hiring process for job seekers and employers.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Wide Job Listings</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access thousands of job opportunities across multiple industries and locations.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Easy Application Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track all your applications in one place and never miss an update.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Connect With Employers</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Communicate directly with recruiters and get noticed by top companies.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Top Companies Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600">Top Companies Hiring Now</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Work with leading companies that are actively hiring.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {companies.map((company) => (
            <div key={company.name} className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition duration-200">
              <img src={company.logo} alt={company.name} className="h-12 object-contain mx-auto" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
