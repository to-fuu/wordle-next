
export const hintClass = (hint) => {
    if (hint === undefined) return ''
    if (hint === 'b') return 'bg-gray-500 dark:bg-gray-600 dark:!border-gray-600 dark:!border-b-gray-700 !border-gray-500 border-b-4 !border-b-gray-600 text-white'
    if (hint === 'y') return 'bg-amber-500 dark:bg-amber-500 !border-amber-500 border-b-4 !border-b-amber-600 text-white'
    if (hint === 'g') return 'bg-green-600  dark:bg-green-600 border-b-4 !border-green-600 !border-b-green-700 text-white'
}
