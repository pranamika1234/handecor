import React, { useState } from 'react';

export default function PaymentUI({ amount, onSubmit, onClose }) {
  const [method, setMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');

  const handleCardChange = e => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (method === 'card') {
      onSubmit({ method, cardDetails });
    } else {
      onSubmit({ method, upiId });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close payment"
          onClick={onClose}
        >×</button>
        <h2 className="text-2xl font-bold mb-6 text-center">Payment</h2>
        <div className="mb-4 text-center text-xl font-semibold">Amount: ₹{amount}</div>
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${method === 'card' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setMethod('card')}
          >Card</button>
          <button
            className={`px-4 py-2 rounded ${method === 'upi' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setMethod('upi')}
          >UPI</button>
        </div>
        {method === 'card' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChange={handleCardChange}
              className="w-full border rounded px-4 py-2"
              required
            />
            <input
              type="text"
              name="number"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={handleCardChange}
              className="w-full border rounded px-4 py-2"
              required
              maxLength={16}
            />
            <div className="flex gap-2">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleCardChange}
                className="w-1/2 border rounded px-4 py-2"
                required
                maxLength={5}
              />
              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardChange}
                className="w-1/2 border rounded px-4 py-2"
                required
                maxLength={3}
              />
            </div>
            <button type="submit" className="w-full bg-brand text-white py-2 rounded font-semibold mt-2 hover:bg-brand/80">
              Pay Now
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={e => setUpiId(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            />
            <button type="submit" className="w-full bg-brand text-white py-2 rounded font-semibold mt-2 hover:bg-brand/80">
              Pay Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
