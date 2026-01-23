import Image from "next/image";
import logo from "@/public/logo-black.png";

export const PortoSpaceTeamLogo = () => {
  return (
    <div className="flex items-center gap-1">
      <Image
        src={logo}
        className="h-12 w-auto aspect-square object-contain"
        alt="Logo Porto Space Team"
      />
      <div className="flex flex-col items-start justify-center text-left text-foreground font-sans h-full mt-1">
        <h1 className="text-sm leading-none">Porto Space Team</h1>
        <h2 className="text-xs">
          <span className="text-primary">FEUP</span> Universidade do Porto
        </h2>
      </div>
    </div>
  );
};
