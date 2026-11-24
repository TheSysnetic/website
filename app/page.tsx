import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ServicesScroller from "@/components/sections/ServicesScroller";
import WorkStack from "@/components/sections/WorkStack";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Consultation from "@/components/sections/Consultation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesScroller />
      <WorkStack />
      <Process />
      <TechStack />
      <Consultation />
    </>
  );
}
