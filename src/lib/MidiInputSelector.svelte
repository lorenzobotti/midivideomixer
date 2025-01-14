<script lang="ts">
    import { onMount } from "svelte";
    import { loadMidi } from "./midi";
    import { Input, WebMidi, type NoteMessageEvent } from "webmidi";

    let {
        onMidiNote,
    } = $props()

    let inputs: string[] = $state([])
    let selected: number | undefined = $state(undefined)
    let device: Input | undefined = $state(undefined)

    $effect(() => {
        if (selected === undefined) {
            return
        }
        device = WebMidi.inputs[selected]
        device.addListener('noteon', onNoteOn)
    })

    function onNoteOn(event: NoteMessageEvent) {
        const noteName = event.note.name + (event.note.octave - 1)
        onMidiNote(noteName)
    }
    
    onMount(async () => {
        await loadMidi()
        inputs = WebMidi.inputs.map(input => input.name)
    })
</script>

<label>midi device: </label>
<select bind:value={selected}>
    {#each inputs as input, i}
        <option value={i}>{input}</option>
    {/each}
</select>


