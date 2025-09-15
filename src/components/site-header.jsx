import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
export function SiteHeader() {
  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
         <p
                className="text-xl font-bold "
                style={{ color: "lab(32 -1.69 -39.12)" }}
              >Ware
                <span className="text-orange-400">house </span>
                <span className="text-black"> System</span>
              </p>
        <div className="ml-auto flex items-center gap-2">
          
             <p
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
                 <Image 
                src={"/Pictogrammers-Material-Warehouse.svg"} 
                alt="Logo" 
                width={30} 
                height={30} 
                priority 
              />
            </p>
          
        </div>
      </div>
    </header>
  );
}
