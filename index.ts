import definePlugin, { OptionType } from "@utils/types";

const sounds = {
    click1: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/click1.wav"),
    click2: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/click2.wav"),
    click3: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/click3.wav"),
    backspace: new Audio("https://github.com/Domis-Vencord-Plugins/KeyboardSounds/raw/main/sounds/backspace.wav")
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

const keydown = (e: KeyboardEvent) => {
    if (ignoredKeys.includes(e.code)) return;
    for (const sound of Object.values(sounds)) sound.pause();
    if (e.code === "Backspace") {
        sounds.backspace.currentTime = 0;
        sounds.backspace.play();
    } else {
        const click = sounds[`click${Math.floor(Math.random() * 3) + 1}`];
        click.currentTime = 0;
        click.play();
    }
};

export default definePlugin({
    name: "KeyboardSounds",
    description: "Adds the Opera GX Keyboard Sounds to Discord",
    authors: [{ name: "domi.btnr", id: 354191516979429376n }],
    start: () => {
        const volume = Vencord.Settings.plugins.KeyboardSounds.volume;
        for (const sound of Object.values(sounds)) sound.volume = volume / 100;
        document.addEventListener("keydown", keydown);
    },
    stop: () => document.removeEventListener("keydown", keydown),
    options: {
        volume: {
            description: "Volume",
            type: OptionType.SLIDER,
            markers: [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            stickToMarkers: false,
            default: 100,
            onChange: value => { for (const sound of Object.values(sounds)) sound.volume = value / 100; }
        }
    }
});