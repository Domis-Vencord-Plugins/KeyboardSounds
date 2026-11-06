/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export type SoundName = "backspace" | "enter" | "space" | "caps" | "arrow";

export type SoundPack = Partial<Record<SoundName, string>> & {
    folder: string;
    clicks: string[];
};

export const Packs: Record<string, SoundPack> = {
    "OperaGX": {
        folder: "OperaGX",
        clicks: ["click1.wav", "click2.wav", "click3.wav"],
        backspace: "backspace.wav"
    },
    "osu": {
        folder: "osu",
        clicks: ["key-press-1.mp3", "key-press-2.mp3", "key-press-3.mp3", "key-press-4.mp3"],
        backspace: "key-delete.mp3",
        enter: "key-confirm.mp3",
        caps: "key-caps.mp3",
        arrow: "key-movement.mp3"
    },
    "Lethal Company": {
        folder: "LethalCompany",
        clicks: ["click1.wav", "click2.wav", "click3.wav", "click4.wav", "click5.wav", "click6.wav", "click7.wav"],
        backspace: "backspace.wav",
        enter: "enter.wav",
        space: "space.wav"
    }
};
