import { Button } from "@/components/ui/button";
import Link from "next/link";


const CallToAction = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Start Writing Today
          </h2>
          <p className="mx-auto max-w-[600px] text-primary-foreground/60 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join our community of writers and share your stories with millions
            of readers.
          </p>
        </div>
        <Button
          className="bg-background text-primary hover:bg-secondary"
          size="lg"
          asChild
        >
          <Link href="/signup"> Create an account</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default CallToAction;
