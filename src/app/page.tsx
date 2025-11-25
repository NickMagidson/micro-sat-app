import { Button } from "@/components/ui/button";
import MainPage from "./main/page";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">🎉 Tailwind CSS is installed!</h1>
        <p className="text-muted-foreground mb-4">Ready for Shad/cn components</p>
        <Button>Primary Button</Button>
      </div>

      <MainPage />
    </main>
  );
}
