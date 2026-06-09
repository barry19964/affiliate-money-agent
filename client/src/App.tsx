import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ContentArchive from "./pages/ContentArchive";
import CreateContent from "./pages/CreateContent";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import ContentCalendar from "./pages/ContentCalendar";
import GoogleAdsSetup from "./pages/GoogleAdsSetup";
import EmailListBuilder from "./pages/EmailListBuilder";
import SocialMediaMonetization from "./pages/SocialMediaMonetization";
import RevenueHub from "./pages/RevenueHub";
import PaymentIntegration from "./pages/PaymentIntegration";
import CheckoutPage from "./pages/CheckoutPage";
import SubscriptionManagement from "./pages/SubscriptionManagement";
import PayPalDashboard from "./pages/PayPalDashboard";
import NichePivoting from "./pages/NichePivoting";
import InfluencerOutreach from "./pages/InfluencerOutreach";
import VideoGeneration from "./pages/VideoGeneration";
import AdOptimization from "./pages/AdOptimization";
import SmartNotifications from "./pages/SmartNotifications";
import APISetup from "./pages/APISetup";
import PayoutConfig from "./pages/PayoutConfig";
import NicheOptimization from "./pages/NicheOptimization";
import SEOOptimization from "./pages/SEOOptimization";
import LeadMagnetFunnel from "./pages/LeadMagnetFunnel";
import LeadMagnetLanding from "./pages/LeadMagnetLanding";
import ThankYouPage from "./pages/ThankYouPage";
import PublishingDashboard from "./pages/PublishingDashboard";
import { useAuth } from "./_core/hooks/useAuth";
import { Loader2 } from "lucide-react";

function ProtectedRoute({ component: Component }: { component: React.ComponentType<any> }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"} component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path={"/analytics"} component={() => <ProtectedRoute component={Analytics} />} />
      <Route path={"/calendar"} component={() => <ProtectedRoute component={ContentCalendar} />} />
      <Route path={"/content"} component={() => <ProtectedRoute component={ContentArchive} />} />
      <Route path={"/content/create"} component={() => <ProtectedRoute component={CreateContent} />} />
      <Route path={"/settings"} component={() => <ProtectedRoute component={Settings} />} />
      <Route path={"/affiliate"} component={() => <ProtectedRoute component={Settings} />} />
      <Route path={"/google-ads"} component={() => <ProtectedRoute component={GoogleAdsSetup} />} />
      <Route path={"/email-list"} component={() => <ProtectedRoute component={EmailListBuilder} />} />
      <Route path={"/social-media"} component={() => <ProtectedRoute component={SocialMediaMonetization} />} />
      <Route path={"/revenue"} component={() => <ProtectedRoute component={RevenueHub} />} />
      <Route path={"/payments"} component={() => <ProtectedRoute component={PaymentIntegration} />} />
      <Route path={"/paypal"} component={() => <ProtectedRoute component={PayPalDashboard} />} />
      <Route path={"/checkout"} component={CheckoutPage} />
      <Route path={"/subscriptions"} component={() => <ProtectedRoute component={SubscriptionManagement} />} />
      <Route path={"/niche-pivoting"} component={() => <ProtectedRoute component={NichePivoting} />} />
      <Route path={"/influencer-outreach"} component={() => <ProtectedRoute component={InfluencerOutreach} />} />
      <Route path={"/video-generation"} component={() => <ProtectedRoute component={VideoGeneration} />} />
      <Route path={"/ad-optimization"} component={() => <ProtectedRoute component={AdOptimization} />} />
      <Route path={"/smart-notifications"} component={() => <ProtectedRoute component={SmartNotifications} />} />
      <Route path={"/api-setup"} component={() => <ProtectedRoute component={APISetup} />} />
      <Route path={"/payout-config"} component={() => <ProtectedRoute component={PayoutConfig} />} />
      <Route path={"/niche-optimization"} component={() => <ProtectedRoute component={NicheOptimization} />} />
      <Route path={"/seo-optimization"} component={() => <ProtectedRoute component={SEOOptimization} />} />
      <Route path={"/lead-magnet"} component={() => <ProtectedRoute component={LeadMagnetFunnel} />} />
      <Route path={"/publishing"} component={() => <ProtectedRoute component={PublishingDashboard} />} />
      <Route path={"/lead-magnet-landing"} component={LeadMagnetLanding} />
      <Route path={"/thank-you"} component={ThankYouPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
