import { RESOURCES, type ResourceType } from "@/lib/swapi";
import { ResourceIcon } from "@/components/ResourceIcon";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        {/* Logo area */}
        <div className="border-b border-border">
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-5 group cursor-pointer text-left transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-accent"
            aria-label="Go to home page"
          >
            {!collapsed ? (
              <div>
                <span className="font-starwars text-sm text-accent transition-colors duration-200">
                  Holocron
                </span>
                <p className="font-tactical text-muted-foreground mt-1" style={{ fontSize: "0.6rem" }}>
                  Database Terminal v2.1
                </p>
              </div>
            ) : (
              <div className="flex justify-center">
                <span className="text-accent text-lg transition-colors duration-200 px-1">◈</span>
              </div>
            )}
          </button>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="font-tactical text-muted-foreground">
            {!collapsed && "Sectors"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {RESOURCES.map((resource) => {
                const isActive = location.pathname.startsWith(`/${resource}`);
                return (
                  <SidebarMenuItem key={resource}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={`/${resource}`}
                        className={`flex items-center gap-3 px-3 py-2 transition-colors hover:text-accent ${
                          isActive ? "sector-active text-accent" : "text-sidebar-foreground"
                        }`}
                        activeClassName="sector-active text-accent"
                      >
                        <ResourceIcon resource={resource as ResourceType} className="h-4 w-4" />
                        {!collapsed && (
                          <span className="font-tactical" style={{ fontSize: "0.7rem" }}>
                            {resource}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
