export interface StickerInterface {
  stickerId: number;
  stickerUrl: string;
  stickerName: string;
}

export interface Sticker {
  stickerId: number;
  url: string;
  stickerName: string;
  price: number;
}

export interface StickerForSettingLocation {
  stickerId: number;
  url: string;
  stickerName: string;
  time: number;
  stickerWidth: number;
  stikerHeight: number;
  price: number;
}