import definePlugin, { OptionType } from "@utils/types";
import { Settings } from "Vencord";

const packs = {
    "OperaGX": {
        click1: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/OperaGX/click1.wav"),
        click2: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/OperaGX/click2.wav"),
        click3: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/OperaGX/click3.wav"),
        backspace: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/OperaGX/backspace.wav"),
        allowedKeys: []
    },
    "osu": {
        caps: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/osu/key-caps.mp3"),
        enter: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/osu/key-confirm.mp3"),
        backspace: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/osu/key-delete.mp3"),
        arrow: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/osu/key-movement.mp3"),
        click1: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/osu/key-press-1.mp3"),
        click2: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/osu/key-press-2.mp3"),
        click3: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/osu/key-press-3.mp3"),
        click4: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/osu/key-press-4.mp3"),
        allowedKeys: [
            "CapsLock",
            "ArrowUp",
            "ArrowRight",
            "ArrowLeft",
            "ArrowDown"
        ]
    },
    "Lehtal Company": {
        enter: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSoounds/raw/main/sounds/LehtalCompany/enter.wav"),
        backspace: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSoounds/raw/main/sounds/LehtalCompany/backspace.wav"),
        space: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSoounds/raw/main/sounds/LehtalCompany/space.wav"),
        click1: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSoounds/raw/main/sounds/LehtalCompany/click1.wav"),
        click2: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSoounds/raw/main/sounds/LehtalCompany/click2.wav"),
        click3: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSoounds/raw/main/sounds/LehtalCompany/click3.wav"),
        click4: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSoounds/raw/main/sounds/LehtalCompany/click4.wav"),
        click5: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSoounds/raw/main/sounds/LehtalCompany/click5.wav"),
        click6: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSoounds/raw/main/sounds/LehtalCompany/click6.wav"),
        click7: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSoounds/raw/main/sounds/LehtalCompany/click7.wav"),
        allolwedKeys: [
            "Space"
        ]
    }
};

const ignoredKeys = [
    "CapsLock",
    "ShiftLeft",
    "ShiftRight",
    "ControlLeft",
    "ControlRight",
    "AltLeft",
    "AltRight",
    "MetaLeft",
    "MetaRight",
    "ArrowUp",
    "ArrowRight",
    "ArrowLeft",
    "ArrowDown",
    "MediaPlayPause",
    "MediaStop",
    "MediaTrackNext",
    "MediaTrackPrevious",
    "MediaSelect",
    "MediaEject",
    "MediaVolumeUp",
    "MediaVolumeDown",
    "AudioVolumeUp",
    "AudioVolumeDown"
];

const getActiveSoundPack = () => Settings.plugins.KeyboardSounds.pack;

const keydown = (e: KeyboardEvent) => {
    const currentPack = packs[getActiveSoundPack()];
    if (ignoredKeys.includes(e.code) && !currentPack.allowedKeys.includes(e.code)) return;

    for (const sound of Object.values(currentPack))
        if (sound instanceof Audio) sound.pause();

    switch (e.code) {
        case "Enter":
            currentPack.enter.currentTime = 0;
            currentPack.enter.play();
            break;
        case "Backspace":
            currentPack.backspace.currentTime = 0;
            currentPack.backspace.play();
            break;
        case "Space":
            currentPack.space.currentTime = 0;
            currentPack.space.play();
            break;
        case "CapsLock":
            currentPack.caps.currentTime = 0;
            currentPack.caps.play();
            break;
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowDown":
            currentPack.arrow.currentTime = 0;
            currentPack.arrow.play();
            break;
        default:
            const clickSoundsCount = Object.keys(currentPack).filter(key => key.startsWith("click")).length;
            const click = currentPack[`click${Math.floor(Math.random() * clickSoundsCount) + 1}`];
            click.currentTime = 0;
            click.play();
            break;
    }
};

export default definePlugin({
    name: "KeyboardSounds",
    description: "Adds the Opera GX Keyboard Sounds to Discord",
    authors: [{ name: "domi.btnr", id: 354191516979429376n }],
    start: () => {
        const volume = Settings.plugins.KeyboardSounds.volume;
        const currentPack = packs[getActiveSoundPack()];
        for (const sound of Object.values(currentPack))
            if (sound instanceof Audio) sound.volume = volume / 100;
        document.addEventListener("keydown", keydown);
    },
    stop: () => document.removeEventListener("keydown", keydown),
    options: {
        pack: {
            description: "Select the Sound Pack you want to use",
            type: OptionType.SELECT,
            options: Object.keys(packs).map((pack, i) => {
                return {
                    label: pack,
                    value: pack,
                    default: i === 0
                }
            }),
            onChange: () => {
                const volume = Settings.plugins.KeyboardSounds.volume;
                const currentPack = packs[getActiveSoundPack()];
                for (const sound of Object.values(currentPack))
                    if (sound instanceof Audio) sound.volume = volume / 100;
            }
        },
        volume: {
            description: "Volume",
            type: OptionType.SLIDER,
            markers: [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            stickToMarkers: false,
            default: 100,
            onChange: value => {
                const currentPack = packs[getActiveSoundPack()];
                for (const sound of Object.values(currentPack))
                    if (sound instanceof Audio) sound.volume = value / 100;
            }
        }
    }
});