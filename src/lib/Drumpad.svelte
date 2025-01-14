<script lang="ts">
    import { getFilesFromDragEvent, videoFILEintoURI } from "./file_utils";

    interface Props {
        hasFile: boolean;
        note: string;
        click: () => void;
        selectFileURI: (url: string[]) => void;
        playing: boolean;
    }

    let {
        hasFile,
        note,
        click,
        selectFileURI,
        playing = false,
    }: Props = $props();

    let input: HTMLInputElement;

    let draggingOver = $state(false);

    function dropHandler(ev: DragEvent) {
        ev.preventDefault();
        draggingOver = false;

        const files = getFilesFromDragEvent(ev);
        selectFileURI(files.map((f) => videoFILEintoURI(f)));
    }

    function dragOverHandler(event: DragEvent) {
        draggingOver = true;
        event.preventDefault();
    }

    function onclick(event: MouseEvent) {
        if (!hasFile) {
            input.click();
        } else {
            click();
        }
    }

    function oninput() {
        if (!input.files || input.files.length == 0) {
            return;
        }

        const files = [];
        for (const f of input.files) {
            files.push(f);
        }

        selectFileURI(files.map((f) => videoFILEintoURI(f)));
    }
</script>

<div
    aria-roledescription="video input"
    {onclick}
    ondrop={dropHandler}
    ondragover={dragOverHandler}
    ondragleave={() => {
        console.log("leave");
        draggingOver = false;
    }}
    class={{ dragging: draggingOver, full: hasFile, playing: playing }}
>
    {note}
</div>

<input
    type="file"
    multiple
    name={`videoinput_${note}`}
    accept="video/*"
    {oninput}
    bind:this={input}
/>

<style>
    input {
        display: none;
    }

    div {
        min-width: 5rem;
        min-height: 5rem;
        aspect-ratio: 5/4;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #dbf4ad;
        opacity: 100%;
    }

    div:hover {
        opacity: 90%;
    }

    .dragging {
        background-color: #cdc776;
    }

    .full {
        background-color: #a9e190;
    }

    .playing {
        /* font-weight: bold; */
        border: 3px solid #a9e190;
    }
</style>
