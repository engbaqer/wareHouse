
import { AppSidebar } from "@/components/app-sidebar"
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Item } from "@radix-ui/react-dropdown-menu"
// import data from "./data.json"
import { GlobalStateProvider } from "../(blank-layout)/login/GlobalState";
export default function mainLayout({ children }) {
  return (
    <GlobalStateProvider>
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        }
      }>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 bg-gradient-to-br bg-neutral-300">
            <div className="flex flex-col gap-4 p-4 py-4 md:gap-6 md:py-6">
               <div className=" flex w-full max-w-sm items-center gap-2">
{/*===================================== the sections of the dashboard ========================= */}
{/* <Items /> */}

{/*===================================== the sections of the dashboard ========================= */}
                
    </div>
     {/* <SectionCards /> */}
              {/*
              <ChartAreaInteractive / */}
              <div>{children}</div>
              {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </GlobalStateProvider>
   
  );
}







