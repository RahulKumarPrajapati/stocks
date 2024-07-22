import 'bootstrap/dist/css/bootstrap.min.css'
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { DOMAIN } from './shared/constant';
import { stockCode, stockDetails, topStocks, getCurrStock, getCurrStockDetails, getTopStocks } from './shared/stockSlice';
import { useEffect } from 'react';

function App() {
  const crypto = [
    {value: 'BTC', 'label': 'BTC'},
    {value: 'ETH', 'label': 'ETH'},
    {value: 'USDT', 'label': 'USDT'},
    {value: 'BNB', 'label': 'BNB'},
    {value: 'SOL', 'label': 'SOL'},
  ];

  const currCode = useSelector(getCurrStock);
  const currStockDetails = useSelector(getCurrStockDetails);
  const topStocksDetails = useSelector(getTopStocks)
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    dispatch(stockCode({code: newValue.value}))
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let url = DOMAIN.dev + '/api/stock/topStocks';
      axios.post(url).then(
        res => {
          dispatch(topStocks({topStocksDetails: res.data}))
        },
        err => {
            console.log('Error occured', err)
        }
      )
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let url = DOMAIN.dev + '/api/stock/coins/details';
      let coinData = {
        code: currCode
      }
      axios.post(url, coinData).then(
        res => {
          dispatch(stockDetails({data: res.data}))
        },
        err => {
            console.log('Error occured', err)
        }
      )
    }, 5000);

    return () => clearInterval(interval);
  });

  const getStockData = async () =>{
    let url = DOMAIN.dev + '/api/stock/coins/details';
    let coinData = {
      code: currCode
    }
    axios.post(url, coinData).then(
      res => {
        dispatch(stockDetails({data: res.data}))
      },
      err => {
          console.log('Error occured', err)
      }
    )
  }

  return (
    <div className="App">
      <div className="container mt-5">
        <table className="table shadow-lg p-3 mb-5 bg-white rounded">
            <thead>
            <tr>
              <th scope="col" colSpan="5" className="text-center">Top 5 Crypto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {topStocksDetails.map((item, index) => (
                <td key={item.code + index}>  {item.code} {item.rate}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className='w-25'>
          <div className='d-flex justify-content-end align-items-center bg-white'>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={{value: currCode, label: currCode}}
                name="color"
                options={crypto}
                onChange={handleChange}
              />
              <button className='btn btn-primary ms-2' onClick={getStockData}>Change</button>
          </div>
          <div className='mt-2'>
            <table className="table shadow-lg p-3 mb-5 bg-white rounded">
              <thead>
                <tr>
                  <th scope="col" colSpan="2" className="text-center">Data for Crypto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Crypto Name</td>
                  <td>Crypto Rate</td>
                </tr>
                {currStockDetails.length > 0 && (
                  currStockDetails.map((item, index) => (
                    <tr key={item.code + index}>
                      <td> {item.code} </td>
                      <td> {item.rate} </td>
                    </tr>
                  ))
                )}
                {currStockDetails.length == 0 && (
                  <tr>
                    <td>
                      No Data Available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
