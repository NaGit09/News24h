import { createSlice, type  PayloadAction } from "@reduxjs/toolkit"
import type { GoldPrice } from "@/types/gold-price"

interface GoldStoreProps {
  goldData: Record<string, GoldPrice[]>
  brand: string
  currentDate: string
    goldDateAllBrand: Record<string, GoldPrice[]>
}

const today = new Date()
today.setHours(0, 0, 0, 0)

const initialState: GoldStoreProps = {
    goldData: {},
    goldDateAllBrand  :{},
    brand: "SJC",
    currentDate: today.toISOString().slice(0, 10),
}


export const goldSlice = createSlice({
    name: "goldStore",
    initialState,
    reducers: {
        setGoldData: (
            state,
            action: PayloadAction<Record<string, GoldPrice[]>>
        ) => {
            state.goldData = action.payload
        },

        setBrand: (state, action: PayloadAction<string>) => {
            state.brand = action.payload
        },

        setCurrentDate: (
            state,
            action: PayloadAction<string>
        ) => {
            state.currentDate = action.payload
        },
        setGoldDateAllBrand: (
            state,
            action: PayloadAction<Record<string, GoldPrice[]>>
        ) => {
            state.goldDateAllBrand = action.payload
        },
    },
})

export const { setGoldData, setBrand, setCurrentDate, setGoldDateAllBrand } =
    goldSlice.actions
export default goldSlice.reducer
