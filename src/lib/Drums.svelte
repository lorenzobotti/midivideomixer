<script lang="ts">
    import { generateNotes } from "./notes";
    import Drumpad from "./Drumpad.svelte";
    import { reverseInGroupsOfN } from "./array_utils";

    import { drumState } from "./debug_state.svelte";
    import { videoFILEintoURI } from "./file_utils";

    let { muted = true } = $props();

    let notes = generateNotes(16);

    let videoFiles: (string | null)[] = $state(Array(16).fill(null));
    let videoElements: HTMLVideoElement[] = $state(Array(16).fill(null));

    let currentVideo = $state(0);
    let currentVideoSrc = $derived(videoFiles[currentVideo]);

    export async function videoClick(i: number | string) {
        if (typeof i === "string") {
            console.log(i);
            console.log(notes);

            i = notes.indexOf(i);
            if (i === -1) {
                throw new Error("unknown note");
            }
        }

        currentVideo = i;
        drumState.lastNotePlayed = notes[i];
        // await videoElements[currentVideo].load()
        await videoElements[currentVideo].play();
    }

    function assignFiles(files: string[], from: number) {
        for (const [i, file] of files.entries()) {
            console.log({ i, file });

            const idx = from + i;
            if (idx < videoFiles.length) {
                videoFiles[idx] = file
            }
        }
    }
</script>

<div>
    <div class="vertical-explainer">
        <section class="drumpads">
            {#each reverseInGroupsOfN(notes
                    .entries()
                    .toArray(), 4) as [i, note], _}
                <Drumpad
                    {note}
                    selectFileURI={(files: string[]) => assignFiles(files, i)}
                    click={() => videoClick(i)}
                    playing={currentVideo === i}
                    hasFile={videoFiles[i] !== null}
                />
            {/each}
        </section>
        <section class="explainer">
            <h2>come utilizzare questo programma</h2>
            <p>
                clicca su un pulsante qui sopra oppure trascinaci dentro un file
                video per caricarlo sulla rispettiva nota MIDI. quando clicchi
                di nuovo sul drum pad o mandi il corrispondente segnale MIDI o
                quando suoni quella nota sulla tua tastiera farai partire il
                video sulla schermata a destra. noi lo usiamo per i nostri
                concerti dal vivo, tu fai come ti pare.
            </p>
            <img src="key-map.png" alt="tastiera midi" />
        </section>
    </div>

    <div class="vertical-explainer">
        <section class="video">
            {#each videoFiles as videoFile, i}
                <video
                    bind:this={videoElements[i]}
                    src={videoFile}
                    loop
                    {muted}
                    class={{ visible: currentVideo === i }}
                ></video>
            {/each}
        </section>
        <section>
            <pre>{videoFiles
                    .map((f, i) => `${i} => ${f !== null}`)
                    .join("\n")}</pre>
        </section>
    </div>
</div>

<style>
    div {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    div.vertical-explainer {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    section.explainer {
        max-width: 50ch;
    }

    section.explainer img {
        max-width: 40ch;
    }

    section.drumpads {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.3rem;
    }

    section.video {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0px;
        margin: 0px;
    }

    video {
        display: none;

        padding: 0px;
        margin: 0px;

        width: 50vw;
        max-height: 50vh;
    }

    video.visible {
        display: block;
    }
</style>
