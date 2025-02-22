import _ from "lodash";
import api from ".";
import { toast } from "react-hot-toast";

// export const createUser = async (userData) => {
//   try {
//     const response = await api.post(`/register/`, userData);
//     return response.data;
//   } catch (err) {
//     if (err.response.status == 400) {
//       const errorData = await err.response.data;
//       const firstErrorMessage = _.chain(errorData)
//         .get("errors")
//         .values()
//         .flatten()
//         .head()
//         .value();
//       throw new Error(
//         errorData.message || firstErrorMessage || "Registration failed"
//       );
//     } else throw new Error(err);
//   }
// };


export const createUser = async (userData) => {
  try {
    const response = await api.post(`/register/`, userData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      const errorData = err.response.data;
      console.error("🚨 API Error Data:", errorData); // Debugging log

      // Extract error message
      const errorMessage =
        errorData.error || // Check for 'error' field
        errorData.message || // Check for 'message' field
        _.get(errorData, "errors", ["Registration failed"])[0]; // Fallback

      toast.error(errorMessage); // Show error message in toast
      throw new Error(errorMessage); // Ensure proper handling in UI
    } else {
      const genericError = "An unexpected error occurred. Please try again.";
      toast.error(genericError);
      throw new Error(genericError);
    }
  }
};




export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await api.post(`/verify-otp/`, { email, otp });
    return response.data; // Return success response
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error); // Show backend error message
    }
    throw new Error("Something went wrong. Please try again.");
  }
};

export const resendOtp = async ({ email }) => {
  try{
    const response = await api.post("/resend-otp/", { email });
    return response.data;
  }
  catch (err){
    throw new Error("Invalid OTP or verification failed.");
  }
  
};

export const forgotPassword = async ({ email }) => {
  try{
    const response = await api.post("/forgot-password/", { email });
    return response.data;
  }
  catch (err){
    throw new Error("Invalid OTP or verification failed.");
  }
  
};

export const verifyForgotPassword = async ({ email, otp }) => {
  try {
    const response = await api.post("/verify-password/", { email, otp }); // Include OTP
    return response.data;
  } catch (err) {
    throw new Error("Invalid OTP or verification failed.");
  }
};

export const resetPassword = async ({ email, new_password }) => {
  try {
    const response = await api.post("/reset-password/", { email, new_password });
    return response.data;
  } catch (err) {
    throw new Error("Password reset failed. Please try again.");
  }
};




export const loginUser = async (userData) => {
  try {
    const response = await api.post(`/login`, userData);
    return response.data;
  } catch (err) {
    if (err.response.status == 400) {
      const errorData = await err.response.data;
      const firstErrorMessage = _.chain(errorData)
        .get("errors")
        .values()
        .flatten()
        .head()
        .value();
      throw new Error(errorData.message || firstErrorMessage || "Login failed");
    } else throw new Error(err);
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put(`/update-profile`, profileData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      const errorData = await err.response.data;
      const firstErrorMessage = _.chain(errorData)
        .get("errors")
        .values()
        .flatten()
        .head()
        .value();
      throw new Error(
        errorData.message || firstErrorMessage || "Profile update failed"
      );
    } else throw new Error(err);
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await api.post(`/change-password`, passwordData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 400) {
      const errorData = await err.response.data;
      const firstErrorMessage = _.chain(errorData)
        .get("errors")
        .values()
        .flatten()
        .head()
        .value();
      throw new Error(
        errorData.message || firstErrorMessage || "Password change failed"
      );
    } else throw new Error(err);
  }
};



export const getAccounts = async () => {
  const { data } = await api.get("/accounts/");
  return data;
};

export const createAccount = async (accountData) => {
  const { data } = await api.post("/accounts/", accountData);
  return data;
};

export const updateAccount = async ({ id, ...accountData }) => {
  const { data } = await api.put(`/accounts/${id}/`, accountData);
  return data;
};

export const getAccountLedgers = async (accountId) => {
  const { data } = await api.get(`/ledgers/?account_id=${accountId}`);
  return data;
};

export const createLedger = async (ledgerData) => {
  const { data } = await api.post("/ledgers/", ledgerData);
  return data;
};

export const updateLedger = async ({ id, ...ledgerData }) => {
  const { data } = await api.put(`/ledgers/${id}/`, ledgerData);
  return data;
};

export const deleteLedger = async (id) => {
  const { data } = await api.delete(`/ledgers/${id}/`);
  return data;
};

export const getLedgerTransactions = async (ledgerId) => {
  const { data } = await api.get(`/transactions/?ledger_id=${ledgerId}`);
  return data;
};

export const createTransaction = async (transactionData) => {
  const { data } = await api.post("/transactions/", transactionData);
  return data;
};

export const updateTransaction = async ({ id, ...transactionData }) => {
  const { data } = await api.put(`/transactions/${id}/`, transactionData);
  return data;
};
