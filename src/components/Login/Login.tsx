import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Input, Button, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { emailPattern } from "../../constants";

const { Title } = Typography;

interface IFormInput {
    email: string;
    password: string;
}

const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log("Login data:", data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <div className="text-center mb-6">
                    <Title level={2} className="!mb-2">Login</Title>
                    <p className="text-gray-500">Welcome back 👋</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    {errors.email && <p className="text-red-500 text-xs m-0">{errors.email.message}</p>}

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required"
                        }}
                        render={({ field }) => (
                            <Input.Password {...field} placeholder="Enter your password" className="!py-2 !m-0 !mt-4" />
                        )}
                    />
                    {errors.password && <p className="text-red-500 text-xs !m-0">{errors.password.message}</p>}

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full !rounded-xl !py-5 text-lg mt-4"
                    >
                        Login
                    </Button>
                </form>

                <p className="text-center text-gray-500 mt-6 text-sm">
                    Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
                </p>
            </Card>
        </div>
    );
};

export default Login;