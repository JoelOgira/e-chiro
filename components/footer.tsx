import { APP_NAME } from "@/lib/app-constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="top-full border-t py-2 md:py-4">
      <div className="flex justify-center items-center text-muted-foreground">
        {APP_NAME} All Rights Reserved. {currentYear}
      </div>
    </footer>
  );
}
