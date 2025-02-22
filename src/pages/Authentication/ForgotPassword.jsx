import { useState, useEffect } from "react";
import { useForgotPasswordMutation, useVerifyForgotPasswordOTPMutation, useResetPasswordMutation } from "../../react-query/mutations/auth.mutation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60); // 1-minute countdown
  const navigate = useNavigate();

  const forgotPasswordMutation = useForgotPasswordMutation();
  const verifyOtpMutation = useVerifyForgotPasswordOTPMutation();
  const resetPasswordMutation = useResetPasswordMutation();

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    forgotPasswordMutation.mutate({ email }, {
      onSuccess: () => {
        toast.success("OTP sent to your email.");
        setStep(2);
        setTimer(60); // Reset timer when OTP is sent
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || "Something went wrong.");
      }
    });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    verifyOtpMutation.mutate({ email, otp }, {
      onSuccess: () => {
        toast.success("OTP verified. You can now reset your password.");
        setStep(3);
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || "Invalid OTP.");
      }
    });
  };

  const handleResendOtp = () => {
    forgotPasswordMutation.mutate({ email }, {
      onSuccess: () => {
        toast.success("New OTP sent to your email.");
        setTimer(60); // Reset the timer on resend
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || "Failed to resend OTP.");
      }
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    resetPasswordMutation.mutate({ email, new_password: newPassword }, {
      onSuccess: () => {
        toast.success("Password reset successfully. You can now log in.");
        navigate("/users/login");
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || "Something went wrong.");
      }
    });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password"}
        </h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="user@email.com"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
              disabled={forgotPasswordMutation.isLoading}
            >
              {forgotPasswordMutation.isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter OTP"
                required
                disabled={timer === 0} // Disable OTP input when timer runs out
              />
            </div>

            <div className="text-center text-red-600 font-semibold mb-2">
              OTP expires in: {formatTime(timer)}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={timer === 0 || verifyOtpMutation.isLoading} // Disable button when timer reaches 0
            >
              {verifyOtpMutation.isLoading ? "Verifying OTP..." : "Verify OTP"}
            </button>

            {timer === 0 && (
              <button
                type="button"
                className="w-full mt-3 bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            )}
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
              disabled={resetPasswordMutation.isLoading}
            >
              {resetPasswordMutation.isLoading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
