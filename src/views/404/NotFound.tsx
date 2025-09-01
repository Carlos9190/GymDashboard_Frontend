import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <h1 className="font-black text-center text-3xl sm:text-4xl md:text-5xl text-white">
                Page Not Found
            </h1>
            <p className="mt-8 sm:mt-10 text-center text-white text-base sm:text-lg md:text-xl">
                You might want to return to{" "}
                <Link to="/" className="text-red-500 hover:underline">
                    Dashboard
                </Link>
            </p>
        </>
    );
}
