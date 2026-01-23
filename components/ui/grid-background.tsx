import { cn } from "@/lib/utils";

const GridBackground = ({className}:{className?:string}) => {
    return <div className={cn(`absolute pointer-events-none -z-10 inset-0 h-full w-full opacity-3 bg-[linear-gradient(to_right,#8c2d19_1px,transparent_1px),linear-gradient(to_bottom,#8c2d19_1px,transparent_1px)] bg-size-[60px_60px]`,className)}></div>
}

export {GridBackground};