import { APP_NAME } from "@/lib/constants"

export default function Footer() {

    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t w-full" >
            <div className="p-5 flex-center">
                <span className="text-sm text-muted-foreground">
                    &copy; {currentYear} {APP_NAME}. All rights reserved.
                </span>
            </div>
        </footer>
    )
}
