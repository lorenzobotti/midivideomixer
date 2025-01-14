<script lang="ts">
  import { drumState } from "./lib/debug_state.svelte";
  import Drums from "./lib/Drums.svelte";
    import MidiInputSelector from "./lib/MidiInputSelector.svelte";
  import { generateNotes, keys } from "./lib/notes";

  let drumsComponent: Drums;

  const notes = generateNotes(16);

  function keypress(ev: KeyboardEvent) {
    const note = keys[ev.code as any];
    if (note === undefined) {
      return;
    }

    drumsComponent.videoClick(note);
  }

  function onMidiNote(note: string) {
    console.log('midi note ' + note)
    drumsComponent.videoClick(note)
  }
</script>

<svelte:window onkeydown={keypress} />

<svelte:body />

<div class="app">
  <header>
    <h2>tatwd video mixer thingy che reagisce al midi</h2>
  </header>

  <main>
    <MidiInputSelector {onMidiNote} />
    <Drums bind:this={drumsComponent} />
  </main>

  <footer></footer>
</div>

<style>
  header {
    grid-area: "header";
    background-color: #a5aa52;
    color: #eee;
    font-weight: bold;

    min-height: 1.1rem;
  }

  main {
    grid-area: "main";
  }

  footer {
    grid-area: "footer";
    background-color: #a5aa52;
    color: #eee;
    font-weight: bold;

    min-height: 1.1rem;
  }

  .app {
    display: grid;
    grid-template-areas:
      "header"
      "main"
      "footer";

    grid-template-rows: auto 1fr auto;

    height: 100vh;
    width: 100vw;

    margin: 0;
    padding: 0;
  }
</style>
