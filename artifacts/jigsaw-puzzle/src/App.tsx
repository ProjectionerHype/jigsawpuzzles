import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Gallery from "@/pages/gallery";
import Play from "@/pages/play";
import HowToPlay from "@/pages/how-to-play";
import Daily from "@/pages/daily";
import { Header, Footer } from "@/components/layout";

const queryClient = new QueryClient();

function Shell() {
  const [location] = useLocation();
  const isPlay = location.startsWith("/play");

  if (isPlay) {
    return (
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
        <main className="flex-1 flex flex-col min-h-0">
          <Switch>
            <Route path="/play" component={Play} />
          </Switch>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col mt-20">
        <Switch>
          <Route path="/" component={Gallery} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/Daily-Jigsaw-Puzzle" component={Daily} />
          <Route path="/how-to-play" component={HowToPlay} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Shell />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
