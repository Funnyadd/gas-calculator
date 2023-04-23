import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const App = () => {
  const [form, setForm] = useState({
    gasPrice: 0,
    averageConsuption: 0,
    tripLength: 0,
    numberOfPeople: 0,
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
        price *= form.averageConsuption
        price *= form.gasPrice
        price /= form.numberOfPeople

    setField("answer", price)
    console.log(form);
  };

  return (
    <>
      <div className='App d-flex flex-column align-items-center'>
        <h1 className='mt-5 mb-5 text-warning' style={{'font-size':'40px'}}>Gas Price Splitter</h1>

        <Form onSubmit={calculateSplitPrice}>
          <Form.Group className="mb-3" controlId="formBasicGasPrice">
            <Form.Label className="text-white">Gas price ( $ / L )</Form.Label>
            <Form.Control size="lg" type="number" step="0.01" placeholder="enter price" value={form.gasPrice} onChange={e => setField("gasPrice", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAverageConsuption">
            <Form.Label className="text-white">Average consuption ( L / 100km )</Form.Label>
            <Form.Control size="lg" type="number" step="0.1" placeholder="enter average" value={form.averageConsuption} onChange={e => setField("averageConsuption", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTripLength">
            <Form.Label className="text-white">Trip length ( km )</Form.Label>
            <Form.Control size="lg" type="number" placeholder="enter length" value={form.tripLength} onChange={e => setField("tripLength", e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNumberOfPeople">
            <Form.Label className="text-white">Number of people in the car</Form.Label>
            <Form.Control size="lg" type="number" placeholder="enter number of people" value={form.numberOfPeople} onChange={e => setField("numberOfPeople", e.target.value)} />
          </Form.Group>
          
          <Button className="mb-3 w-100 mt-3" style={{'font-size':'22px'}} variant="primary" type="submit">Submit</Button>

          <Form.Group className="mt-3" controlId="formBasicNumberOfPeople">
            <Form.Label className="text-white">Price per person: </Form.Label>
            <Form.Text className="answerText text-success" style={{'font-size':'30px'}}> {form.answer.toFixed(2)} $</Form.Text>
          </Form.Group>

        </Form>
      </div>
      
      <div className="p-2" style={{'color':'#ccc','background-color':'#1f1f1f','margin-top':'auto','text-align':'center'}} >
        @Copyrights 2023 - {new Date().getFullYear()} Adam Mihajlovic. All rights reserved.
      </div>
    </>
  );
}

export default App;
