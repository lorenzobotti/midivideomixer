const notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
]


export function generateNotes(howMany: number): string[] {
    const n = []

    for (let i = 0; i < howMany; i++) {
        n.push(notes[i % 12] + (Math.floor(i / 12) + 1))
    }

    return n
}

export const keys: {[index:string]: number | undefined} = {
    "KeyA": 0,
    "KeyW": 1,
    "KeyS": 2,
    "KeyE": 3,
    "KeyD": 4,

    "KeyF": 5,
    "KeyT": 6,
    "KeyG": 7,
    "KeyY": 8,
    "KeyH": 9,
    "KeyU": 10,
    "KeyJ": 11,

    "KeyK": 12,
    "KeyO": 13,
    "KeyL": 14,
}