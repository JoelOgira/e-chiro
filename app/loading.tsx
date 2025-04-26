import { Loader2 } from "lucide-react"

export default function LoadingPage() {
    return (
        <main className="min-h-[100svh] flex justify-center items-center">
            <Loader2 className="animate-spin size-10" />
        </main>
    )
}
