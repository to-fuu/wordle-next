import { GetAuthCookie } from "./cookies"

export const hintClass = (hint) => {
    if (hint === undefined) return ''
    if (hint === 'b') return 'bg-gray-500 dark:bg-gray-600 dark:!border-gray-600 dark:!border-b-gray-700 !border-gray-500 border-b-4 !border-b-gray-600 text-white'
    if (hint === 'y') return 'bg-amber-500 dark:bg-amber-500 !border-amber-500 border-b-4 !border-b-amber-600 text-white'
    if (hint === 'g') return 'bg-green-600  dark:bg-green-600 border-b-4 !border-green-600 !border-b-green-700 text-white'
}



export const fethcStats = async () => {
    return await (await fetch("/api/stats")).json();
}
export const saveStats = async ({ games, won, streak, hscore }) => {
    const res = await fetch('/api/stats', {
        method: "POST",
        body: JSON.stringify({
            games, won, streak, hscore
        }),
    });
    return (await res.json())
}


export const getWords = async (length) => {
    const size = length == 5 ? 'five' : length == 6 ? 'six' : 'seven'
    const suggestions_res = await fetch(`http://localhost/wrodlex_development-main/words.php?l=${size}&t=words`)
    const guesses = await suggestions_res.json()
    const answers_res = await fetch(`http://localhost/wrodlex_development-main/words.php?l=${size}&t=answers`)
    const answers = await answers_res.json()

    return {
        guesses,
        answers
    }
}