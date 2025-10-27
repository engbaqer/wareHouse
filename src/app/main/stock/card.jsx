import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardDemo({ id, name, details, warehouses, setShowItemInfo, setSelectedItem }) {
  console.log("hhh", warehouses[0])
  return (
  <div onClick={() => { setShowItemInfo(true); setSelectedItem(id); }} className=" *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-1 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out     ">
     <Card  className="  shadow-2xl drop-shadow-xl" key={id}>
       <CardHeader className="flex justify-center items-center">
         <Image src={"/9284767.png"} alt="Logo" width={60} height={60} priority  /> 
         </CardHeader>
          <CardFooter className="flex-col gap-2"> 
            <CardTitle className="w-20 sm:w-40">Name: {name} </CardTitle>
             <CardDescription>{warehouses && warehouses[0] && warehouses[0].warehouseName ? warehouses[0].warehouseName : "unknown"} </CardDescription> 
             <div></div>
             </CardFooter> 
             </Card>
             </div>
  )
}
