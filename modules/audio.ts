/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";

import { settings } from "../settings";
import { Packs, SoundName } from "./packs";

const logger = new Logger("KeyboardSounds");

type LoadedPack = Partial<Record<SoundName, AudioBuffer>> & { clicks: AudioBuffer[]; };

let context: AudioContext | undefined;
let gain: GainNode | undefined;
let pack: LoadedPack | undefined;

const SOUNDS_URL = "https://raw.githubusercontent.com/Domis-Vencord-Plugins/KeyboardSounds/main/sounds/";

async function load(path: string) {
    const res = await fetch(SOUNDS_URL + path);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${path}`);
    return context!.decodeAudioData(await res.arrayBuffer());
}

export async function loadPack() {
    if (!context) return;

    const name = settings.store.pack;
    const { folder, clicks, ...sounds } = Packs[name];
    const loadFile = (file: string) => load(`${folder}/${file}`);
    try {
        const loaded: LoadedPack = { clicks: await Promise.all(clicks.map(loadFile)) };
        for (const [sound, file] of Object.entries(sounds)) loaded[sound] = await loadFile(file);
        if (settings.store.pack === name) pack = loaded;
    } catch (err) {
        logger.error(`Failed to load the ${name} sound pack`, err);
    }
}

export function setVolume() {
    if (gain) gain.gain.value = settings.store.volume / 100;
}

export function getSound(sound?: SoundName) {
    return sound && pack?.[sound];
}

export function getRandomClick() {
    return pack?.clicks[Math.floor(Math.random() * pack.clicks.length)];
}

export function play(buffer: AudioBuffer) {
    if (!context || !gain) return;
    if (context.state === "suspended") context.resume();

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(gain);
    source.start();
}

export function startAudio() {
    context = new AudioContext();
    gain = context.createGain();
    gain.connect(context.destination);
    setVolume();
    loadPack();
}

export function stopAudio() {
    context?.close();
    context = gain = pack = undefined;
}
