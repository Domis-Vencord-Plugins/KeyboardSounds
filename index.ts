/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

import { getRandomClick, getSound, play, startAudio, stopAudio } from "./modules/audio";
import { SoundName } from "./modules/packs";
import { settings } from "./settings";

const KEY_SOUNDS: Record<string, SoundName> = {
    Backspace: "backspace",
    Enter: "enter",
    NumpadEnter: "enter",
    Space: "space",
    CapsLock: "caps",
    ArrowUp: "arrow",
    ArrowRight: "arrow",
    ArrowDown: "arrow",
    ArrowLeft: "arrow"
};

const SILENT_WITHOUT_SOUND: SoundName[] = ["caps", "arrow"];

const IGNORED_KEYS = new Set([
    "ShiftLeft",
    "ShiftRight",
    "ControlLeft",
    "ControlRight",
    "AltLeft",
    "AltRight",
    "MetaLeft",
    "MetaRight",
    "MediaPlayPause",
    "MediaStop",
    "MediaTrackNext",
    "MediaTrackPrevious",
    "MediaSelect",
    "MediaEject",
    "MediaVolumeUp",
    "MediaVolumeDown",
    "AudioVolumeUp",
    "AudioVolumeDown",
    "AudioVolumeMute"
]);

function onKeyDown(e: KeyboardEvent) {
    if (e.repeat || IGNORED_KEYS.has(e.code)) return;

    const sound = KEY_SOUNDS[e.code];
    const buffer = getSound(sound);
    if (!buffer && SILENT_WITHOUT_SOUND.includes(sound)) return;

    const toPlay = buffer ?? getRandomClick();
    if (toPlay) play(toPlay);
}

export default definePlugin({
    name: "KeyboardSounds",
    description: "Plays keyboard sounds while you type, with multiple sound packs to choose from",
    authors: [{ name: "domi.btnr", id: 354191516979429376n }],
    settings,

    start() {
        startAudio();
        document.addEventListener("keydown", onKeyDown);
    },

    stop() {
        document.removeEventListener("keydown", onKeyDown);
        stopAudio();
    }
});
