import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { ThemeProvider } from "@/components/ThemeProvider";
import Timeline from "@/components/Timeline";
import { FloatingNav } from "@/components/ui/FLoatingNavBar";

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10">
        <div className="max-w-7xl w-full">
          <FloatingNav navItems={[
            {
              name: "Home",
              link: "/",
            },
            {
              name: "Chat",
              link: "/chat",
            },
            {
              name: "Learn",
              link: "/learn",
            },
          ]} />
          <Hero />
          <Timeline />
          <Footer />
        </div>
      </main>
    </ThemeProvider>
  );
}
