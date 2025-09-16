import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardDemo({ id, name, details }) {
  return (
  <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-1 ">
     <Card className="w-50 " key={id}>
       <CardHeader className="flex justify-center items-center">
         <Image src={"/9284767.png"} alt="Logo" width={60} height={60} priority  /> 
         </CardHeader>
          <CardFooter className="flex-col gap-2"> 
            <CardTitle>{name} tttttttttttttttt</CardTitle>
             <CardDescription>{details.description}</CardDescription> 
             </CardFooter> 
             </Card> 
             </div>
  )
}
