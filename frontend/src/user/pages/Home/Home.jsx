import Header from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import CategoryNav from "../../components/CategoryNav/CategoryNav";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import "../../style/style.css";

const Home = () => {
  return (
    <div className="home-page">
      <Header />

      <main>
        <HeroSection />

        <CategoryNav />

        <ProductGrid />
      </main>
    </div>
  );
};

export default Home;
