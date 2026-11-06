/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

import { loadPack, setVolume } from "./modules/audio";
import { Packs } from "./modules/packs";

export const settings = definePluginSettings({
    pack: {
        type: OptionType.SELECT,
        description: "Select the Sound Pack you want to use",
        options: Object.keys(Packs).map((pack, i) => ({ label: pack, value: pack, default: i === 0 })),
        onChange: loadPack
    },
    volume: {
        type: OptionType.SLIDER,
        description: "Volume",
        markers: [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        stickToMarkers: false,
        default: 100,
        onChange: setVolume
    }
});
