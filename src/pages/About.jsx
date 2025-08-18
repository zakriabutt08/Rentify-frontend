import React, { useState } from "react";

const About = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-gray-100 pt-18">
      {/* Header Section */}
      <header className="text-center mb-16 mt-5">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 tracking-tight">
          About Us
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Welcome to Rentify! We’re dedicated to revolutionizing the way you find rental properties and real estate with a seamless, efficient platform.
        </p>
      </header>

      {/* Our Mission Section */}
      <section className="mb-16 px-6 md:px-12">
        <h2 className="text-3xl font-semibold text-indigo-700">Our Mission</h2>
        <p className="mt-4 text-gray-700 text-lg leading-relaxed">
          At Rentify, we’re on a mission to simplify your property search. Whether you’re renting or buying, our goal is to deliver a smooth, intuitive experience.
        </p>
        <p className="mt-4 text-gray-700 text-lg leading-relaxed">
          With cutting-edge search tools, personalized recommendations, and real-time listings, Rentify is your ultimate real estate companion.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="mb-16 px-6 md:px-12 bg-white rounded-2xl shadow-xl py-10">
        <h2 className="text-3xl font-semibold text-indigo-700">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="text-center p-4 hover:bg-indigo-50 rounded-lg transition-all duration-200">
            <h3 className="text-xl font-semibold text-indigo-700">Integrity</h3>
            <p className="mt-2 text-gray-600">
              Transparency, honesty, and ethics guide everything we do with our customers and partners.
            </p>
          </div>
          <div className="text-center p-4 hover:bg-indigo-50 rounded-lg transition-all duration-200">
            <h3 className="text-xl font-semibold text-indigo-700">Customer Focus</h3>
            <p className="mt-2 text-gray-600">
              Your needs come first—we aim to exceed expectations at every turn.
            </p>
          </div>
          <div className="text-center p-4 hover:bg-indigo-50 rounded-lg transition-all duration-200">
            <h3 className="text-xl font-semibold text-indigo-700">Innovation</h3>
            <p className="mt-2 text-gray-600">
              We push boundaries to make property searching faster, smarter, and better.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-16 px-6 md:px-12">
        <h2 className="text-3xl font-semibold text-indigo-700">Our Services</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-indigo-700">Property Search</h3>
            <p className="mt-2 text-gray-600">
              Find properties tailored to your preferences—location, price, amenities, and more.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-indigo-700">Personalized Recommendations</h3>
            <p className="mt-2 text-gray-600">
              Get custom property suggestions to streamline your search process.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-indigo-700">Market Insights</h3>
            <p className="mt-2 text-gray-600">
              Access detailed market trends to make informed renting or buying decisions.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-indigo-700">Customer Support</h3>
            <p className="mt-2 text-gray-600">
              Our team is here to help with any questions or challenges you encounter.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 md:px-12 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-2xl shadow-xl py-10 mb-16">
        <h2 className="text-3xl font-semibold">Get In Touch</h2>
        <p className="mt-4 text-lg leading-relaxed max-w-2xl">
          We’d love to connect! Have questions or want to explore our services? Reach out today.
        </p>
        <div className="mt-6 text-center">
          <button
            className="bg-white text-indigo-700 px-6 py-3 rounded-full shadow-md font-semibold text-lg hover:bg-indigo-50 hover:shadow-lg transition-all duration-200"
            onClick={handleModalToggle}
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Company Name:</span> Rentify
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone Number:</span> +92 300 9709433
            </p>
            <div className="mt-6 text-right">
              <button
                className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md transition-all duration-200"
                onClick={handleModalToggle}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;