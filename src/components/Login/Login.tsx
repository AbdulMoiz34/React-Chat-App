import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Input, Button, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { emailPattern } from "../../constants";
import { auth, signInWithEmailAndPassword } from "../../lib/firebase";
import { showMessage } from "../../utils/notify";

interface LoginFormProps {
    email: string;
    password: string;
}

const Login = () => {
    const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginFormProps>();

    const handleLogin: SubmitHandler<LoginFormProps> = async ({ email, password }) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            reset();
            showMessage({ type: "success", content: "Login Succesful!" });
        } catch (error: any) {
            showMessage({ type: "error", content: error.message || "Login failed!" });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <div className="text-center mb-6">
                    <Typography.Title level={2} className="!mb-2">Login</Typography.Title>
                    <p className="text-gray-500">Welcome back 👋</p>
                </div>

                <form onSubmit={handleSubmit(handleLogin)} className="!space-y-4">
                    <div>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: emailPattern
                            }}
                            render={({ field }) => (
                                <Input {...field} placeholder="Enter your email" className="!py-2" />
                            )}
                        />
                        {errors.email && <p className="text-red-500 text-xs !m-0">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required"
                            }}
                            render={({ field }) => (
                                <Input.Password {...field} placeholder="Enter your password" className="!py-2 !m-0" />
                            )}
                        />
                        {errors.password && <p className="text-red-500 text-xs !m-0">{errors.password.message}</p>}
                    </div>
                    <Button
                        loading={isSubmitting}
                        type="primary"
                        htmlType="submit"
                        className="w-full !rounded-xl !py-5 text-lg"
                    >
                        Login
                    </Button>
                </form>
                
                <p className="text-center text-gray-500 mt-6 text-sm">
                    Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
                </p>
            </Card>
        </div >
    );
};

export default Login;