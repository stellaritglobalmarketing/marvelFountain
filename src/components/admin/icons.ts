import {
  BadgeCheck,
  Building2,
  FolderOpen,
  GalleryHorizontal,
  Image,
  LayoutGrid,
  Link2,
  Package,
  Star,
  Type,
  Video,
  type LucideIcon,
} from "lucide-react";

// Icon names used in lib/admin/resources.ts
export const icons: Record<string, LucideIcon> = {
  package: Package,
  image: Image,
  video: Video,
  building: Building2,
  star: Star,
  badge: BadgeCheck,
  slides: GalleryHorizontal,
  folder: FolderOpen,
  grid: LayoutGrid,
  text: Type,
  link: Link2,
};
