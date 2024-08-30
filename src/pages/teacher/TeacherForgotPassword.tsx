import React, { useState } from "react";
import { Label } from "../../components/ui/input/label";
import { Input } from "../../components/ui/input/input";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import { changeTeacherPassword, teacherForgotPassword, teacherVerifyOtp } from "../../api/teacher/teacherForgotPassword";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { newPassword } from "../../schemas";

export function TeacherForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const emailFormik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await teacherForgotPassword(values);
                if (response?.status === 201) {
                    toast.success('OTP sent successfully');
                    setStep(2);
                } else {
                    toast.error('Failed to send OTP');
                }
            } catch (error) {
                console.error('OTP request failed:', error);
                toast.error('An error occurred. Please try again.');
            }
        },
    });


    const otpFormik = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: Yup.object({
            otp: Yup.number().required("OTP is required").min(6, "OTP must be 6 digits"),
        }),
        onSubmit: async (values) => {
            try {
                const verifyOtpRes = await teacherVerifyOtp(
                    {
                        email: emailFormik.values.email,
                        otp: Number(values.otp)
                    })
                if (verifyOtpRes?.status === 201) {
                    toast.success('OTP verified successfully');
                    setStep(3);
                }else{
                    toast.error('Invalid OTP')
                }
            } catch (error) {
                console.error("OTP verification failed:", error);
                toast.error("Invalid OTP. Please try again.");
            }
        },
    });

    const passwordFormik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: newPassword,
        onSubmit: async (values) => {
            try {
                const changePasswordResponse = await changeTeacherPassword(
                    {email:emailFormik.values.email,
                     newPassword:values.newPassword,   
                    })
                    if (changePasswordResponse?.status === 201) {
                        toast.success('Password reset successfully');
                        navigate("/teacherLogin");
                        }
            } catch (error) {
                console.error("Password reset failed:", error);
                toast.error("Failed to reset password. Please try again.");
            }
        },
    });

    const handleBackToLogin = () => {
        navigate('/teacherLogin');
    }

    return (
        <div className="flex justify-center items-start min-h-screen pt-20 px-4">
            <div className="max-w-md w-full rounded-2xl p-8 shadow-input bg-white dark:bg-black">
                {step === 1 && (
                    <>
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            Forgot Your Password?
                        </h2>
                        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                            Enter your email address below and we'll send you an OTP to reset your password.
                        </p>
                        <form className="my-8" onSubmit={emailFormik.handleSubmit}>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter your email Id here"
                                    type="email"
                                    onChange={emailFormik.handleChange}
                                    onBlur={emailFormik.handleBlur}
                                    value={emailFormik.values.email}
                                />
                                {emailFormik.touched.email && emailFormik.errors.email && (
                                    <div className="text-red-500 text-sm mt-1">{emailFormik.errors.email}</div>
                                )}
                            </LabelInputContainer>
                            <div className="mb-4 text-right">
                                <button
                                    type="button"
                                    onClick={handleBackToLogin}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Back to login
                                </button>
                            </div>
                            <button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="submit"
                            >
                                Send OTP
                            </button>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <>

                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            Enter OTP
                        </h2>
                        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                            Enter the OTP sent to your email address.
                        </p>
                        <form className="my-8" onSubmit={otpFormik.handleSubmit}>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="otp">OTP</Label>
                                <Input
                                    id="otp"
                                    placeholder="Enter 6-digit OTP"
                                    type="text"
                                    onChange={otpFormik.handleChange}
                                    onBlur={otpFormik.handleBlur}
                                    value={otpFormik.values.otp}
                                />
                                {otpFormik.touched.otp && otpFormik.errors.otp && (
                                    <div className="text-red-500 text-sm mt-1">{otpFormik.errors.otp}</div>
                                )}
                            </LabelInputContainer>
                            <button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="submit"
                            >
                                Verify OTP
                            </button>
                        </form>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                            Reset Password
                        </h2>
                        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                            Enter your new password below.
                        </p>
                        <form className="my-8" onSubmit={passwordFormik.handleSubmit}>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    placeholder="Enter new password"
                                    type="password"
                                    onChange={passwordFormik.handleChange}
                                    onBlur={passwordFormik.handleBlur}
                                    value={passwordFormik.values.newPassword}
                                />
                                {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
                                    <div className="text-red-500 text-sm mt-1">{passwordFormik.errors.newPassword}</div>
                                )}
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    placeholder="Confirm new password"
                                    type="password"
                                    onChange={passwordFormik.handleChange}
                                    onBlur={passwordFormik.handleBlur}
                                    value={passwordFormik.values.confirmPassword}
                                />
                                {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                                    <div className="text-red-500 text-sm mt-1">{passwordFormik.errors.confirmPassword}</div>
                                )}
                            </LabelInputContainer>
                            <button
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="submit"
                            >
                                Reset Password
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

const LabelInputContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};