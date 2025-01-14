import { WebMidi } from "webmidi";

export async function loadMidi() {
    const midi = await WebMidi.enable()
}