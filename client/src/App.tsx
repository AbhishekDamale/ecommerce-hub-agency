/*
  Style reminder: Editorial Growth Ledger — keep the public experience single-page,
  confident, tactile, and conversion-oriented with warm paper, ink navy, coral,
  cobalt, chartreuse, and Space Grotesk + DM Sans.
*/
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CompactHome from "./pages/CompactHome";
import { PackagesPage, PastWorkPage, ServicesPage } from "./pages/DetailPages";
import ExplorePage from "./pages/ExplorePage";
import TeamPage from "./pages/TeamPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={CompactHome} />
      <Route path={"/studio"} component={Home} />
      <Route path={"/explore"} component={ExplorePage} />
      <Route path={"/team"} component={TeamPage} />
      <Route path={"/work"} component={PastWorkPage} />
      <Route path={"/services"} component={ServicesPage} />
      <Route path={"/packages"} component={PackagesPage} />
      <Route path={"/contact"} component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
