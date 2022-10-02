import AppLayout from "../../components/Layouts/AppLayout";
import Head from "next/head";
import useSWR from "swr";
import axios from "../../lib/axios";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/auth";
import { useEffect } from "react";
import PageLoader from "../../components/PageLoader";
const Dashboard = () => {
    const { isAuth, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuth === 0 && !isLoading) {
            router.push("/", undefined, { shallow: true });
        } else if (isAuth === 1 && !isLoading) {
            console.log("Welcome Admin");
        }
    }, [isLoading, isAuth]);
    if (!isLoading || isAuth === 0) {
        return <PageLoader loading={!isLoading} />;
    } else {
        return (
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                }
            >
                <Head>
                    <title>Laravel - Dashboard</title>
                </Head>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                You are logged in!
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }
};

export default Dashboard;
