import Button from "../components/FormButton";
import { useAuth } from "../hooks/auth";
export default function Home() {
    const { logout } = useAuth();
    const submitForm = async (event) => {
        event.preventDefault();
        logout();
    };
    return (
        <div className="">
            <div className="p-5">
                <form onSubmit={submitForm}>
                    <Button className={"p-5"}>
                        <p>Log Out</p>
                    </Button>
                </form>
            </div>
        </div>
    );
}
