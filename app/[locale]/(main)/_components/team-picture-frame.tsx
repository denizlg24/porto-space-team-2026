import { getTeamPictureUrl } from "@/lib/actions/content";
import { ImageFrame } from "@/components/ui/image-frame";
import team2025Photo from "@/public/2025-team.webp";

type Props = {
  alt: string;
  className?: string;
};

export async function TeamPictureFrame({ alt, className }: Props) {
  const teamPictureUrl = await getTeamPictureUrl();

  return (
    <ImageFrame
      src={teamPictureUrl ?? team2025Photo}
      alt={alt}
      aspectRatio="video"
      className={className}
    />
  );
}
