import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Input, Button, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { emailPattern, passwordPattern, usernamePattern } from "../../constants";
import { showMessage } from "../../utils/notify";
import { createUserWithEmailAndPassword, auth, setDoc, doc, db } from "../../lib/firebase";
import ShowError from "../ShowError";
import type { User } from "../../types";
import { isUsernameTaken } from "../../helpers";

interface SignupFormProps {
    email: string;
    username: string;
    password: string;
}

const Signup = () => {
    const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SignupFormProps>();
    const { username, email, password } = errors;

    const handleSignup: SubmitHandler<SignupFormProps> = async ({ email, password, username }) => {
        try {

            const isTaken = await isUsernameTaken(username)
            if (isTaken) {
                console.log(isTaken);
                showMessage({ type: "error", content: "Username already taken." });
                return;
            }

            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            const userData = { id: user.uid, email, username, blockedUsers: [] } as User;

            await setDoc(doc(db, "users", user.uid), userData);
            await setDoc(doc(db, "userChats", user.uid), {
                chats: []
            });
            reset();
            showMessage({ type: "success", content: "Signup successful!" });
        } catch (error: any) {
            showMessage({ type: "error", content: error.message || "Signup failed!" });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <div className="text-center mb-6">
                    <Typography.Title level={2} className="!mb-2">Create Account</Typography.Title>
                    <p className="text-gray-500">Sign up to get started 🚀</p>
                </div>

                <form onSubmit={handleSubmit(handleSignup)} className="!space-y-4">
                    <div>
                        <Controller
                            name="username"
                            control={control}
                            rules={{
                                required: "Username is required",
                                pattern: usernamePattern
                            }}
                            render={({ field }) => (
                                <Input {...field} placeholder="Username" className="!py-2" />
                            )}
                        />
                        {username && <ShowError message={username?.message || ""} />}
                    </div>
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
                        {email && <ShowError message={email?.message || ""} />}
                    </div>
                    <div>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                pattern: passwordPattern
                            }}
                            render={({ field }) => (
                                <Input.Password {...field} placeholder="Enter your password" className="!py-2" />
                            )}
                        />
                        {password && <ShowError message={password?.message || ""} />}
                    </div>
                    <Button
                        loading={isSubmitting}
                        type="primary"
                        htmlType="submit"
                        className="w-full !rounded-xl !py-5 text-lg"
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