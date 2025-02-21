import { Sticker } from "@/sticker/interfaces/StickerInterface";

export interface StreamerData {
    streamerId: number;
    streamerName: string;
    stickers: Sticker[];
}