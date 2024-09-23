import { createSlice } from "@reduxjs/toolkit";

export const subreddits =  [
    'Home',
    'AskReddit',
    'NoStupidQuestions',
    'BaldursGate3',
    'facepalm',
    'interestingasfuck',
    'Damnthatsinteresting',
    'LivestreamFail',
    'pics',
    'Palworld',
    'AmItheAsshole',
    'mildlyinfuriating',
    'Piracy',
    'PeterExplainsTheJoke',
    'funny',
    'AITAH',
    'movies',
    'Helldivers',
    'gaming',
    'worldnews',
    'leagueoflegends',
    'pcmasterrace',
    'Unexpected',
    'news',
    'politics'
]

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: subreddits,
        selectedCategory: 'Home',
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        }
    }
})

export const { setSelectedCategory } = categoriesSlice.actions
export default categoriesSlice.reducer