import useSWR from "swr";
import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useAuth = ({ middleware, redirectIfAuthenticated }: any = {}) => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(0);

    const {
        data: user,
        error,
        mutate,
    }: any = useSWR("/api/user", () =>
        axios
            .get("/api/user")
            .then((res) => {
                res.data;
                setIsAuth(0);
            })
            .catch((error) => {
                if (error.response.status !== 409) throw error;
                router.push("/verify-email");
            })
    );
    const [isLoading, setIsLoading] = useState(true);

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const register = async ({ setErrors, ...props }) => {
        await csrf();
        setErrors([]);
        axios
            .post("/register", props)
            .then(() => {
                mutate();
                setIsAuth(0);
            })
            .catch((error) => {
                if (error.response.status !== 422) throw error;
                setErrors(error.response.data.errors);
            });
    };

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf();
        setErrors([]);
        setStatus(null);
        axios
            .post("/login", props)
            .then(() => {
                mutate();
                setIsAuth(0);
            })
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post("/forgot-password", { email })
            .then((response) => setStatus(response.data.status))
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post("/reset-password", { token: router.query.token, ...props })
            .then((response) =>
                router.push("/login?reset=" + btoa(response.data.status))
            )
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post("/email/verification-notification")
            .then((response) => setStatus(response.data.status));
    };

    const logout = async () => {
        setIsAuth(0);
        if (!error) {
            await axios.post("/logout").then(() => mutate());
        }
        window.location.pathname = "/Login";
    };

    useEffect(() => {
        if (middleware === "guest" && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated);
        if (
            window.location.pathname === "/verify-email" &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated);
        if (middleware === "auth" && error) logout();
        setIsLoading(false);
        setIsAuth(user?.isAdmin);
    }, [user, error, isLoading]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        isLoading,
        isAuth,
    };
};
