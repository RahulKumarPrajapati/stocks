import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../localStorage";

const persistedState = loadState();

export const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        code: 'BTC',
        stockDetails: [],
        topStocksDetails: [],
        ...persistedState
    },
    reducers: {
        stockCode: (state, action) =>{
             // Check to see if the reducer cares about this action
            if (action.type === 'stock/stockCode') {
                state.code = action.payload.code;
                const persistedState = loadState();
                saveState({
                    ...persistedState,
                    code: state.code,
                  });
            }
        },
        stockDetails: (state, action) =>{
            if(action.type === 'stock/stockDetails'){
                state.stockDetails = action.payload.data;
                const persistedState = loadState();
                saveState({
                    ...persistedState,
                    stockDetails: state.stockDetails,
                });
            }
        },
        topStocks: (state, action) =>{
            if(action.type === 'stock/topStocks'){
                state.topStocksDetails = action.payload.topStocksDetails;
                const persistedState = loadState();
                saveState({
                    ...persistedState,
                    topStocksDetails: state.topStocksDetails,
                });
            }
        }
    }
})

export const getCurrStock = (state) => state.stock.code;
export const getCurrStockDetails = (state) => state.stock.stockDetails;
export const getTopStocks = (state) => state.stock.topStocksDetails
export const { stockCode, stockDetails, topStocks } = stockSlice.actions;
export default stockSlice.reducer;