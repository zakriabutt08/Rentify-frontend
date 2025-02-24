import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600">
          <strong>Effective Date: February 24, 2025</strong>
        </p>
      </header>

      {/* Section Container */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* 1. Information We Collect */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700">
            1. Information We Collect
          </h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            We collect various types of information to enhance and deliver our services effectively:
          </p>
          <ul className="mt-4 text-gray-700 list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> When you sign up, submit forms, or reach out to us, we may gather details like your name, email address, phone number, and payment information.
            </li>
            <li>
              <strong>Usage Data:</strong> We track how you interact with our site, capturing data such as your IP address, browser type, and operating system.
            </li>
            <li>
              <strong>Cookies:</strong> We utilize cookies to improve your experience and analyze trends. These small files store preferences on your device to optimize our services.
            </li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700">
            2. How We Use Your Information
          </h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            Your information helps us in the following ways:
          </p>
          <ul className="mt-4 text-gray-700 list-disc pl-6 space-y-2">
            <li>To deliver, manage, and enhance our website and services.</li>
            <li>To tailor your experience and address your unique needs.</li>
            <li>To handle transactions, including billing and customer support.</li>
            <li>To keep you informed with updates, newsletters, or promotions (with your permission).</li>
            <li>To optimize our website’s functionality and performance.</li>
            <li>To meet legal requirements and resolve disputes.</li>
          </ul>
        </section>

        {/* 3. Sharing Your Information */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700">
            3. Sharing Your Information
          </h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            We do not sell or lease your personal data. However, we may share it under these conditions:
          </p>
          <ul className="mt-4 text-gray-700 list-disc pl-6 space-y-2">
            <li>
              <strong>Service Providers:</strong> Trusted third-party partners may access your data to support our operations (e.g., payment processors, hosting services, or email platforms).
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may release your information if mandated by law or to safeguard Rentify, our users, or others.
            </li>
            <li>
              <strong>Business Transfers:</strong> Your data could be transferred during a merger, acquisition, or asset sale.
            </li>
          </ul>
        </section>

        {/* 4. Data Security */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700">
            4. Data Security
          </h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            We implement robust, industry-standard security protocols to protect your data. That said, no online system is entirely foolproof, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* 5. Your Rights and Choices */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700">
            5. Your Rights and Choices
          </h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            Based on your location, you may have rights over your personal data, including:
          </p>
          <ul className="mt-4 text-gray-700 list-disc pl-6 space-y-2">
            <li>
              <strong>Access:</strong> Request to see the personal data we have on you.
            </li>
            <li>
              <strong>Correction:</strong> Ask us to fix any incorrect details in your data.
            </li>
            <li>
              <strong>Deletion:</strong> Request removal of your data, subject to legal exceptions.
            </li>
            <li>
              <strong>Opt-Out:</strong> Unsubscribe from promotional emails via links provided or by contacting us directly.
            </li>
          </ul>
        </section>

        {/* 6. Children’s Privacy */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700">
            6. Children’s Privacy
          </h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            Our services are not designed for children under 13. We do not intentionally collect their data, and if we discover such information, we will promptly delete it.
          </p>
        </section>

        {/* 7. Updates to This Privacy Policy */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700">
            7. Updates to This Privacy Policy
          </h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            We may revise this Privacy Policy periodically to reflect changes in our practices or legal obligations. Significant updates will be posted here with a revised effective date.
          </p>
        </section>

        {/* 8. Contact Us */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700">
            8. Contact Us
          </h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            For questions or concerns about this Privacy Policy, reach out to us at:
          </p>
          <ul className="mt-4 text-gray-700 list-disc pl-6 space-y-2">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@rentify.com" className="text-indigo-600 hover:underline">
                support@rentify.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:+5551234567" className="text-indigo-600 hover:underline">
                (555) 123-4567
              </a>
            </li>
            <li>
              <strong>Address:</strong> 123 Rentify Lane, City, Country
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;