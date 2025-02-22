//import { useMutation } from 'react-query';
import { useMutation } from "@tanstack/react-query";
import {
  createUser,
  verifyOtp,
  resendOtp,
  loginUser,
  updateUserProfile,
  changePassword,
  forgotPassword,
  verifyForgotPassword,
  resetPassword,
} from "../../apis/account.api";
import { queryClient } from "../../main";
import { QUERY_KEYS } from "../constants/keys";
import { useAuth } from "../../hooks/useAuth";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};

export const useVerifyForgotPasswordOTPMutation = () => {
  return useMutation({
    mutationFn: verifyForgotPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};


export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};




export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};

export const useUpdateProfileMutation = () => {
  const { reloadUser } = useAuth();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      reloadUser();
    },
  });
};

export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
  });
};
