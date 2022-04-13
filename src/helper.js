export function shuffleItems(items) {
    const shuffledItems = items
    for( let i = items.length - 1; i >= 0 ; i--) {
        const randomIndex = Math.floor(Math.random() * i)
        const oldItem = items[randomIndex]
        items[randomIndex] = items[i]
        items[i] = oldItem
    }
    return shuffledItems
}

export function capitalize(string) {
    const letters = string.split('')
    return [
        letters[0].toUpperCase(),
        ...letters.slice(1)
    ].join('')
}