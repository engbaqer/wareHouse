"use client"
import { useState } from "react";
import { useGlobalState } from "../hooks/globalHook";
import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";
import { useRouter } from "next/navigation"; 
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({ items }) {
const router = useRouter();
const { activeItem, setActiveItem } = useGlobalState();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
     
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} onClick={() => { setActiveItem(item.title); router.push(`/main/${item.title}`); }} className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer 
                            ${activeItem === item.title ? "bg-[#504B58] text-white" : "hover:bg-gray-200"}`}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
