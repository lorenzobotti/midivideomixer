export function getFilesFromDragEvent(ev: DragEvent) {
    const files: File[] = []
    
    if (ev.dataTransfer?.items) {
        [...ev.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
                const file = item.getAsFile()
                if (!file) {
                    throw new Error('not a file!')
                }
                
                files.push(file)
            }
        })
    }
    
    return files
}

export function videoFILEintoURI(f: Blob) {
    if (!f.type.startsWith('video/')) {
        throw new Error('not a video!')
    }

    return URL.createObjectURL(f);
}