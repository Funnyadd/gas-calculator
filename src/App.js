import 'bootstrap/dist/css/bootstrap.min.css';
import { inject } from '@vercel/analytics';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const App = () => {
  // Injects vercel's analytics
  inject();

  const [form, setForm] = useState({
    gasPrice: 0,
    averageConsumption: 0,
    tripLength: 0,
    numberOfPeople: 1,
    answer: 0
  });

  const setField = (field, value) => {
    setForm({
        ...form,
        [field]: value
    });
  }

  const calculateSplitPrice = (event) => {
    event.preventDefault()

    var price  = form.tripLength / 100
        price *= form.averageConsumption
        price *= form.gasPrice
        price /= form.numberOfPeople

    setField("answer", price)
  };

  return (
    <>
      <div className='App d-flex flex-column align-items-center'>
        <h1 className='mt-5 mb-5' style={{'font-size':'44px', 'color':'#00a3c9'}}>Gas Price Splitter</h1>

        <Form onSubmit={calculateSplitPrice}>
          <Form.Group className="mb-3" controlId="formBasicGasPrice">
            <Form.Label className="text-white">Gas price ( $ / L )</Form.Label>
            <Form.Control size="lg" type="number" min={0.001} step="0.001" placeholder="Enter price" value={form.gasPrice} onChange={e => setField("gasPrice", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAverageConsumption">
            <Form.Label className="text-white">Average consumption ( L / 100km )</Form.Label>
            <Form.Control size="lg" type="number" min={0.1} step="0.1" placeholder="Enter average" value={form.averageConsumption} onChange={e => setField("averageConsumption", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTripLength">
            <Form.Label className="text-white">Trip length ( km )</Form.Label>
            <Form.Control size="lg" type="number" min={1} step="0.1" placeholder="Enter length" value={form.tripLength} onChange={e => setField("tripLength", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNumberOfPeople">
            <Form.Label className="text-white">Number of people in the car</Form.Label>
            <Form.Control size="lg" type="number" min={1} placeholder="Enter number of people" value={form.numberOfPeople} onChange={e => setField("numberOfPeople", e.target.value)} />
          </Form.Group>
          
          <Button className="mb-3 w-100 mt-3" style={{'font-size':'22px', 'background-color':'#00a3c9', 'border-color':'#00a3c9'}} variant="primary" type="submit">Calculate</Button>

          <Form.Group className="mt-3" controlId="formBasicNumberOfPeople">
            <Form.Label className="text-white">Price per person: </Form.Label>
            <Form.Text className="answerText" style={{'font-size':'30px', 'color':'#00a3c9'}}> {form.answer.toFixed(2)} $</Form.Text>
          </Form.Group>
        </Form>
      </div>

      <div className="p-3" style={{'color':'#ccc','background-color':'#1f1f1f','margin-top':'auto','text-align':'center'}} >
        © 2023 - {new Date().getFullYear()} Adam Mihajlovic. All rights reserved.
      </div>
    </>
  );
}

export default App;
