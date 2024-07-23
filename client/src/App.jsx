import 'bootstrap/dist/css/bootstrap.min.css'
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { DOMAIN } from './shared/constant';
import { stockCode, stockDetails, topStocks, getCurrStock, getCurrStockDetails, getTopStocks } from './shared/stockSlice';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const crypto = [
    {value: 'BTC', 'label': 'BTC'},
    {value: 'ETH', 'label': 'ETH'},
    {value: 'USDT', 'label': 'USDT'},
    {value: 'BNB', 'label': 'BNB'},
    {value: 'SOL', 'label': 'SOL'},
  ];

  const [show, setShow] = useState(false);

  const currCode = useSelector(getCurrStock);
  const currStockDetails = useSelector(getCurrStockDetails);
  const topStocksDetails = useSelector(getTopStocks)
  const dispatch = useDispatch();
  const [code, setCode] = useState(currCode);
  const handleClose = () => {
    setCode(currCode);
    setShow(false);
  };
  const handleShow = () => setShow(true);
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

  const getStockData = (code) =>{
    let url = DOMAIN.dev + '/api/stock/coins/details';
    let coinData = {
      code: code
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

  useEffect(() => {
    const interval = setInterval(() => {
      getStockData(currCode);
    }, 5000);

    return () => clearInterval(interval);
  });

  const handleChange = (newValue) => {
    setCode(newValue.value);
  };

  const handleClick = () => {
    dispatch(stockCode({code: code}) );
    getStockData(code);
    setShow(false);
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
          <div className='d-flex justify-content-end align-items-center'>
            <Button variant="primary" className='ms-2 text-nowrap col-5' onClick={handleShow}>
              Change Crypto
            </Button>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            className="basic-single col-5"
            classNamePrefix="select"
            defaultValue={{value: currCode, label: currCode}}
            name="color"
            options={crypto}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
