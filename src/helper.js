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

export function formatDoc(doc) {
    return {
        docId: doc.id,
        ...doc.data()
    }
}

export function camelCaseToWords(camelCasedWords) {
    const result = camelCasedWords.replace( /([A-Z])/g, " $1" )
    const words = result.charAt(0).toUpperCase() + result.slice(1)
    return words
}

export function formatPrice(price, currency) {
    return `${new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency }).format(price)} ${currency}`
}

export function convertMiliToTime(miliseconds) {
    const seconds = Math.floor(miliseconds % 60)
    const minutes = Math.floor((miliseconds / 60) % 60)
    const hours = Math.floor(miliseconds / 3600)
    
    return { hours, minutes, seconds }
}