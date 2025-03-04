export interface StickerInterface {
  stickerId: number;
  stickerUrl: string;
  stickerName: string;
}

export interface Sticker {
  stickerId: number;
  url: string;
  stickerName: string;
  price?: number;
}

export interface StickerForSettingLocation {
  stickerId: number;
  url: string;
  stickerName: string;
  time: number;
  stickerWidth: number;
  stickerHeight: number;
  price: number;
}

export interface StickerCardProps {
  stickerId: number;
  stickerUrl: string;
  stickerName: string;
  onClick?: () => void;
}