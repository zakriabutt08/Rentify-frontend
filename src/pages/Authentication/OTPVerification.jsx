import { useState, useEffect } from "react";
import { useVerifyOtpMutation, useResendOtpMutation } from "../../react-query/mutations/auth.mutation";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60); // 1-minute countdown
  const [loading, setLoading] = useState(false); // NEW: Loading state
  const [resending, setResending] = useState(false); // NEW: Resend state

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const { signInUser } = useAuth(); 

  const mutation = useVerifyOtpMutation();
  const resendMutation = useResendOtpMutation();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    mutation.mutate(
      { email, otp },
      {
        onSuccess: (data) => {
          toast.success("OTP verified! Logging in...");
          signInUser(data.tokens);
          setTimeout(() => {
            navigate("/user/profile"); // Redirect after a short delay
          }, 1000);
        },
        // onError: (error) => {
        //   console.error("OTP Verification Error:", error);
        //   toast.error(error.response?.data?.error || "Something went wrong.");
        // },
        onError: (error) => {
          console.error("OTP Verification Error:", error);
        
          // Try getting the error message from multiple possible sources
          const errorMessage =
            error.response?.data?.error ||  // If backend sends { error: "message" }
            error.response?.data?.message || // If backend sends { message: "message" }
            error.message ||  // If it's a general error object
            "Something went wrong. Please try again."; // Fallback message
        
          toast.error(errorMessage);
        },
        
        onSettled: () => setLoading(false), // Stop loading
      }
    );
  };

  const handleResendOtp = () => {
    if (!email) {
      toast.error("No email found. Please register again.");
      return;
    }

    setResending(true); // Start resend loading

    resendMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("A new OTP has been sent to your email.");
          setTimer(60); // Reset timer
        },
        onError: () => {
          toast.error("Failed to resend OTP. Try again.");
        },
        onSettled: () => setResending(false), // Stop resend loading
      }
    );
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Verify Your OTP</h2>
        
        {/* Timer */}
        <div className="text-center text-red-600 font-semibold mb-2">
          OTP expires in: {formatTime(timer)}
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="123456"
              required
              disabled={timer === 0 || loading} // Disable input while loading
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center"
            disabled={timer === 0 || loading} // Disable while loading
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {/* Resend OTP Button */}
        {timer === 0 && (
          <button
            className="w-full mt-3 bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 flex items-center justify-center"
            onClick={handleResendOtp}
            disabled={resending} // Disable while resending
          >
            {resending ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                Sending OTP...
              </>
            ) : (
              "Resend OTP"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;
