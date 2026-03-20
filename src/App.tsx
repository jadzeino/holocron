import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import HomePage from "@/pages/HomePage";
import ResourceListPage from "@/pages/ResourceList";
import ResourceDetailPage from "@/pages/ResourceDetail";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <SidebarProvider>
          <div className="min-h-screen flex w-full scanlines">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-h-screen">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:resource" element={<ResourceListPage />} />
                <Route path="/:resource/:id" element={<ResourceDetailPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
