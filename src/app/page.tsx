import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Products from "@/components/Products";
import Applications from "@/components/Applications";
import Finishes from "@/components/Finishes";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Products />
        <Applications />
        <Finishes />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
