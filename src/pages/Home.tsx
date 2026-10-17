import Hero from "@/components/Hero";
import RoutesSection from "@/components/RoutesSection";
import ContactSection from "@/components/ContactSection";
import { LocalSection, DarshanSection, CoastalSection } from "@/components/CategorySections";
import { About, Faq, Fleet, Process, Reviews, Services } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <RoutesSection />
      <LocalSection />
      <DarshanSection />
      <CoastalSection />
      <Fleet />
      <About />
      <Reviews />
      <Process />
      <Faq />
      <ContactSection />
    </>
  );
}
