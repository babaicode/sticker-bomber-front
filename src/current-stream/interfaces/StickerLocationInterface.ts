export interface CurrentStreamDataDto {
    streamerId: number;
    stickers: StickerOnCurrentStreamDto[];
};

export interface StickerOnCurrentStreamDto {
    stickerId: number;
    stickerName: string;
    stickerUrl: string;
    locationX: number;
    locationY: number;
    time: number;
};