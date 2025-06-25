import { Loader } from "lucide-react";

export default function LoadingPage() {
    return <div className="min-h-screen flex justify-center items-center ">
        <Loader className="size-10 animate-spin lg:size-16" />
    </div>;
}
