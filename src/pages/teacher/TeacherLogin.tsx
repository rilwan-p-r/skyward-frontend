import React, { useEffect,} from "react";
import { Label } from "../../components/ui/input/label";
import { Input } from "../../components/ui/input/input";
import { cn } from "../../lib/utils";
import Lottie from "lottie-react";
import teacherLoginAnime from "../../assets/Animations/teacherLoginAnime.json";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { teacherLogin } from "../../api/teacher/teacherAuth";
import { toast } from "react-toastify";
import { setTeacherInfo } from "../../redux/slices/teacherSlices/TeacherSlices";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";

interface loginValues {
    email: string;
    password: string
}
export function TeacherLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const teacherInfo = useSelector((state: RootState) => state?.teacherInfo?.teacherInfo);
    useEffect(() => {
        if (teacherInfo) {
            navigate('/teacher')
        }
    }, [teacherInfo, navigate])

    const handleSubmit = async (values: loginValues) => {
        try {
            const response = await teacherLogin(values);
            console.log(response);

            if (response?.status == 201) {
                toast.success('login success');
                dispatch(setTeacherInfo(response.data))
                navigate('/teacher/');
            } else {
                toast.error('invalid credintial')
            }
        }
        catch (error) {
            console.error('Login failed:', error);
        }
    };

    const formik = useFormik<loginValues>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleForgotPassword = () => {
        navigate('/teacher/forgotPassword');
    };
    return (
        <>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start md:ml-40 mt-10 md:mt-32">
                <div className="hidden md:block">
                    <Lottie className="w-96 h-80" animationData={teacherLoginAnime} loop={true} />
                </div>
                <div className="mt-10 md:mt-0 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                        Welcome Back, Teacher!
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                        Please login with your credentials to continue. We're excited to have you back!
                    </p>

                    <form className="my-8" onSubmit={formik.handleSubmit}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Enter your email Id here"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-500">{formik.errors.email}</div>
                            )}
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="Enter your password here"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-red-500">{formik.errors.password}</div>
                            )}
                        </LabelInputContainer>

                        <div className="mb-4 text-right">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit"
                        >
                            Log In &rarr;
                            <BottomGradient />
                        </button>

                        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                    </form>
                </div>
            </div>
        </>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

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
