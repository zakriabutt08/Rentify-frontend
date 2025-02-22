import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center text-blue-700">Privacy Policy</h1>
      <p className="mt-6 text-gray-700 text-lg text-center">
        <strong>Effective Date: January 28, 2025</strong>
      </p>
      
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-700">1. Information We Collect</h2>
        <p className="mt-4 text-gray-700">
          We collect several types of information to provide and improve our services to you:
        </p>
        <ul className="mt-4 text-gray-700 list-disc pl-6">
          <li><strong>Personal Information:</strong> When you register for an account, fill out forms, or contact us, we may collect information such as your name, email address, phone number, and payment details.</li>
          <li><strong>Usage Data:</strong> We may collect information about how you access and use the website, such as IP address, browser type, and operating system.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze usage patterns. Cookies are small files stored on your device that help us remember your preferences and improve our services.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-700">2. How We Use Your Information</h2>
        <p className="mt-4 text-gray-700">
          We use the information we collect in the following ways:
        </p>
        <ul className="mt-4 text-gray-700 list-disc pl-6">
          <li>To provide, operate, and maintain our website and services.</li>
          <li>To personalize your experience and respond to your specific needs.</li>
          <li>To process transactions, including billing and support.</li>
          <li>To communicate with you, including sending updates, newsletters, or promotional material (with your consent).</li>
          <li>To improve our website's functionality and performance.</li>
          <li>To comply with legal obligations and resolve disputes.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-700">3. Sharing Your Information</h2>
        <p className="mt-4 text-gray-700">
          We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:
        </p>
        <ul className="mt-4 text-gray-700 list-disc pl-6">
          <li><strong>Service Providers:</strong> We may share your information with trusted third-party vendors who assist us in operating our website and services (e.g., payment processors, hosting services, and email marketing platforms).</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information when required by law or to protect the rights, property, or safety of Rentify, our users, or others.</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-700">4. Data Security</h2>
        <p className="mt-4 text-gray-700">
          We use industry-standard security measures to protect your personal information. However, no method of electronic storage or transmission over the internet is completely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-700">5. Your Rights and Choices</h2>
        <p className="mt-4 text-gray-700">
          Depending on your location, you may have certain rights regarding your personal information, such as:
        </p>
        <ul className="mt-4 text-gray-700 list-disc pl-6">
          <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
          <li><strong>Correction:</strong> You can request corrections to any inaccuracies in your information.</li>
          <li><strong>Deletion:</strong> You may request the deletion of your personal information, subject to certain legal exceptions.</li>
          <li><strong>Opt-Out:</strong> You can opt out of receiving promotional communications from us by following the unsubscribe instructions in the email or contacting us directly.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-700">6. Children’s Privacy</h2>
        <p className="mt-4 text-gray-700">
          Our website and services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected information from a child under 13, we will take steps to delete that information.
        </p>
      </section>

      
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-700">7. Updates to This Privacy Policy</h2>
        <p className="mt-4 text-gray-700">
          We may update our Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. We will notify you of any significant changes by posting the updated policy on this page with a new effective date.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-700">8. Contact Us</h2>
        <p className="mt-4 text-gray-700">
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <ul className="mt-4 text-gray-700 list-disc pl-6">
          <li><strong>Email:</strong> support@rentify.com</li>
          <li><strong>Phone:</strong> (555) 123-4567</li>
          <li><strong>Address:</strong> 123 Rentify Lane, City, Country</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
