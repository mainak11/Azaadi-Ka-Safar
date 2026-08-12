import { LanguageProvider } from "./context/LanguageContext";
import { RadioProvider } from "./context/RadioContext";
import { FixedBackground } from "./components/FixedBackground";
import { Hero } from "./components/Hero";
import { Rotations } from "./components/Rotations";
import { SongList } from "./components/SongList";
import { PlayerBar } from "./components/PlayerBar";
import { ShareButton } from "./components/ShareButton";
import { VandeMataramButton } from "./components/VandeMataramButton";
import { Footer } from "./components/Footer";

function App() {
  return (
    <LanguageProvider>
      <RadioProvider>
        <FixedBackground />
        <div className="relative flex min-h-screen flex-col">
          <Hero />
          <main className="flex-1 bg-parchment/70 backdrop-blur-sm">
            <Rotations />
            <SongList />
          </main>
          <Footer />
          <ShareButton />
          <VandeMataramButton />
          <PlayerBar />
        </div>
      </RadioProvider>
    </LanguageProvider>
  );
}

export default App;
