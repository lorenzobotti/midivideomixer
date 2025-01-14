export function reverseInGroupsOfN<T>(arr: T[], n: number): T[] {
    const groups = groupsOfN(arr, n)
    return groups.reverse().flat()
}

export function groupsOfN<T>(arr: T[], n: number): T[][] {
    const res = []

    for (let i = 0; i < arr.length; i += n) {
        const j = i + n

        if (j < arr.length) {
            res.push(arr.slice(i, j))
        } else {
            res.push(arr.slice(i, arr.length))
        }
    }

    return res
}

