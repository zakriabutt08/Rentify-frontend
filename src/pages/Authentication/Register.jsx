import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../react-query/mutations/auth.mutation";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const mutation = useRegisterMutation();

  useEffect(() => {
    if (mutation.isSuccess && mutation.variables?.email) {
      toast.success("OTP sent to your email!");
      setTimeout(() => {
        navigate("/users/verify-otp", { state: { email: mutation.variables.email } });
      }, 1000); // Delay redirection slightly for better UX
    }
  }, [mutation.isSuccess, mutation.variables, navigate]);

  const onSubmit = async (data) => {
    try {
      await toast.promise(
        mutation.mutateAsync(data),
        {
          loading: "Creating your account...",
          error: (err) =>
            err.response?.data?.error || "Registration failed. Try again!", // Fix
        }
      );
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters long" },
              })}
              className="w-full p-4 mt-2 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Username"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full p-4 mt-2 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="User@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                pattern: {
                  value: /[!@#$%^&*(),.?":{}|<>]/,
                  message: "Password must include at least one special character (!@#$%^&*)",
                },
              })}
              className="w-full p-4 mt-2 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              className="w-full p-4 mt-2 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm Password"
            />
            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-red-500">{errors.password_confirmation.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-lg flex justify-center items-center gap-2 ${
              isSubmitting && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0116 0H4z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Register New Account"
            )}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/users/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
