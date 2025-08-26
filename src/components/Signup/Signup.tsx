import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Input, Button, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { emailPattern, passwordPattern } from "../../constants";

const { Title } = Typography;

interface IFormInput {
    email: string;
    password: string;
}

const Signup = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    };
    console.log(errors);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <div className="text-center mb-6">
                    <Title level={2} className="!mb-2">Create Account</Title>
                    <p className="text-gray-500">Sign up to get started 🚀</p>
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
                            required: "Password is required",
                            pattern: passwordPattern
                        }}
                        render={({ field }) => (
                            <Input.Password {...field} placeholder="Enter your password" className="!py-2 mt-4 m-0" />
                        )}
                    />
                    {errors.password && <p className="text-red-500 text-xs m-0">{errors.password.message}</p>}
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full !rounded-xl !py-5 mt-4 text-lg"
                    >
                        Sign Up
                    </Button>
                </form>

                <p className="text-center text-gray-500 mt-6 text-sm">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </Card>
        </div>
    );
};

export default Signup;