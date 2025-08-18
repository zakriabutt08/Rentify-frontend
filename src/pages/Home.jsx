import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white text-gray-900 pt-16">
      {/* Hero Section - Light Blue Theme */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Rentify
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your one-stop solution for finding the perfect rental properties
            and real estate opportunities.
          </p>
          <Link
            to="/properties"
            className="bg-white text-blue-700 font-medium py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Explore Properties
          </Link>
          
        </div>
      </section>

      {/* Features Section - Light Gray Background */}
      <section className="w-full py-16 bg-gray-200">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Rentify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Wide Selection</h3>
              <p>
                Discover a diverse range of rental properties that cater to your
                specific needs and preferences.
              </p>
            </div>
            
            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">User-Friendly</h3>
              <p>
                Our platform is designed to make your property search as easy
                and convenient as possible.
              </p>
            </div>
            <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Trusted Listings</h3>
              <p>
                We ensure that all our listings are verified and reliable so
                that you can rent with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section - Light Gray Background */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg mb-8">
            Start exploring rental properties and real estate listings today.
            Your perfect home awaits!
          </p>
          <Link
            to="/properties"
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Browse Properties
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
