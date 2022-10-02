import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const PageLoader = (props) => {
    let [color, setColor] = useState("#ffffff");
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
            <ClipLoader
                color={color}
                loading={props.loading}
                cssOverride={override}
                size={150}
            />
            <p>Loading...</p>
        </div>
    );
};
export default PageLoader;
