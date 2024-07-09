import Footer from "@/components/Footer";
import NeuralNetwork from "@/components/projects/NeuralNetwork";
import GoTerminalEmulatorTutorial from "@/components/projects/Terminal";
import { FloatingNav } from "@/components/ui/FLoatingNavBar";

export default function Home() {
  return (

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
      <GoTerminalEmulatorTutorial />
      </div>
    </main>
    
  );
}
