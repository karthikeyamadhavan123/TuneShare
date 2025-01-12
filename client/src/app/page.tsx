import HeroSection from "@/components/HeroSection";
import Works from "../components/Works";
import CommentSection from "@/components/Comments";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="min-w-screen min-h-screen">
       <Navbar/>
      <HeroSection />
      <Works />
      <CommentSection/>
      <Footer/>
      </div>
     
    
  );
}
