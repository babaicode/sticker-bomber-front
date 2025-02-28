export interface CurrentStreamDataDto {
    streamerId: number;
    stickers: {
        stickerId: number;
        stickerName: string;
        stickerUrl: string;
        locationX: number;
        locationY: number;
        time: number;
    } [];
}