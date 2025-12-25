import React from 'react';

export default function Cart({ cartItems, onRemove, onCheckout, onClose, onUpdateQty }) {
  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button
          className="text-gray-400 hover:text-gray-700 text-2xl font-bold px-2"
          aria-label="Close cart"
          onClick={onClose}
        >×</button>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <ul className="divide-y divide-gray-200 mb-4">
          {cartItems.map(item => (
            <li key={item._id} className="py-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-600">₹{item.price}</div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="px-2 py-1 border rounded text-sm"
                    onClick={() => onUpdateQty(item._id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded text-sm"
                    onClick={() => onUpdateQty(item._id, item.quantity + 1)}
                  >+</button>
                </div>
              </div>
              <button
                className="text-red-500 hover:underline text-sm"
                onClick={() => onRemove(item._id)}
              >Remove</button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button
          className="w-full bg-brand text-white py-2 rounded font-semibold mt-4 hover:bg-brand/80"
          onClick={onCheckout}
        >Checkout</button>
      )}
    </div>
  );
}
