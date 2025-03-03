import CardStack from "@/components/Card";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Section from "@/components/Section";

export default function Home() {
  return (
    <div className="bg-[#1A2960] text-white min-w-screen min-h-screen flex flex-col overflow-x-hidden">
      <Main />
      <CardStack/>
      <Section/>
      <Footer/>
    </div>
  );
}
