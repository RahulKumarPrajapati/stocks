export const loadState = () => {
	try {
        const serialState = localStorage.getItem('appState');
        if (serialState == null) {
            const initialState = {
                code: 'BTC',
                stockDetails: [],
                topStocksDetails: []
            }
            saveState(initialState)
            return initialState;
        }
	    return JSON.parse(serialState);
	} catch (err) {
	    return {
            code: 'BTC',
            stockDetails: [],
            topStocksDetails: []
        };
	}
};

export const saveState = (state) => {
	try {
        const serialState = JSON.stringify(state);
        localStorage.setItem('appState', serialState);
	} catch(err) {
		console.log(err);
	}
};
