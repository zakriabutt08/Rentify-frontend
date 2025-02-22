import React from "react";
import { useState } from "react";

const About = () => {

    const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="container mx-auto py-10">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-3xl font-bold text-blue-700">About Us</h1>
        <p className="mt-4 text-gray-600 text-lg">
          Welcome to Rentify! We are committed to providing the best platform for finding rental properties and real estate.
          Our mission is to make property hunting easier and more efficient.
        </p>
      </header>

      {/* Our Mission Section */}
      <section className="mt-12 px-6 md:px-20">
        <h2 className="text-2xl font-semibold text-blue-700">Our Mission</h2>
        <p className="mt-4 text-gray-700 text-lg">
          At Rentify, we strive to simplify the property search process. Whether you’re looking to rent or buy, we aim to provide a seamless, user-friendly experience for our customers.
        </p>
        <p className="mt-4 text-gray-700 text-lg">
          With advanced search features, personalized recommendations, and up-to-date listings, Rentify is your go-to platform for real estate.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="mt-12 px-6 md:px-20 bg-gray-50 rounded-lg shadow-lg py-8">
        <h2 className="text-2xl font-semibold text-blue-700">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-blue-700">Integrity</h3>
            <p className="mt-2 text-gray-700">
              We are transparent, honest, and ethical in all our dealings with customers and partners.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-blue-700">Customer Focus</h3>
            <p className="mt-2 text-gray-700">
              We put our customers' needs first and strive to exceed their expectations at every step.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-blue-700">Innovation</h3>
            <p className="mt-2 text-gray-700">
              We continuously innovate to improve our platform, making property searches faster, easier, and more effective.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mt-12 px-6 md:px-20">
        <h2 className="text-2xl font-semibold text-blue-700">Our Services</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-700">Property Search</h3>
            <p className="mt-2 text-gray-700">
              Our platform lets you search for properties based on your specific preferences, such as location, price, and amenities.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-700">Personalized Recommendations</h3>
            <p className="mt-2 text-gray-700">
              Receive property suggestions tailored to your needs and preferences, making your search faster and more efficient.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-700">Market Insights</h3>
            <p className="mt-2 text-gray-700">
              We provide in-depth market analysis and trends to help you make informed decisions about renting or buying.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-700">Customer Support</h3>
            <p className="mt-2 text-gray-700">
              Our dedicated support team is available to assist you with any queries or issues you may have during your property search.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mt-12 px-6 md:px-20 bg-blue-700 text-white rounded-lg shadow-lg py-8">
        <h2 className="text-2xl font-semibold">Get In Touch</h2>
        <p className="mt-4 text-lg">We’d love to hear from you! If you have any questions or want to learn more about our services, feel free to reach out to us.</p>
        <div className="mt-6 text-center">
          <button className="bg-white text-blue-700 px-6 py-2 rounded-lg shadow-md font-medium text-lg hover:bg-gray-200 transition-all" 
          onClick={handleModalToggle}>
            Contact Us
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Company Name: Rentify</span> {/*property.company_name*/}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone Number: +92 300 9709433</span> {/*property.company_phone*/}
            </p>
            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
