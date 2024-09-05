import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Welcome to Emerald Medium
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1"
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit">Start reading</Button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
