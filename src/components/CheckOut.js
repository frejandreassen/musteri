'use client'
import { useState } from 'react';
import DatePicker from './DatePicker'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Checkout({products}) {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  

  const handleQuantityChange = (productId, quantity) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedDate) {
      setFormError("Vänligen välj ett tillgängligt datum!");
      return;
    }
  
    
    if (totalLitres * 2 < 50) {
      setFormError("Du måste ha minst 50 kg äpplen!");
      return;
    }
    
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
  
    const data = {
      datum: selectedDate,
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      antal_3liter: parseInt(formData.get('antal_3liter')),
      antal_15liter: parseInt(formData.get('antal_15liter')),
      antal_1liter: parseInt(formData.get('antal_1liter')),
      totalt_liter: totalLitres,
      totalt_kg: totalLitres * 2,
      pris: totalPrice,
      moms: totalPrice * 0.2
    };

    console.log(data)
  
    try {
      const response = await fetch("https://api.andreassens.se/items/musteri_bokningar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        setFormError("Ursäkta! Något gick oväntat fel. Försök igen, och kontakta oss om felet kvarstår.");
      }
    } catch (error) {
        setFormError("Ursäkta! Något gick oväntat fel. Försök igen, och kontakta oss om felet kvarstår.");
    }
    setIsSubmitting(false);
  };
  
  const totalLitres = products.reduce((acc, product) => {
    const quantity = selectedQuantities[product.id] || 0;
    return acc + quantity * product.litres;
  }, 0);

  const totalPrice = products.reduce((acc, product) => {
    const quantity = selectedQuantities[product.id] || 0;
    return acc + quantity * parseInt(product.price);
  }, 0);
  

  return (
    <div className="bg-gray-50 my-10">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Checkout</h2>
      {
        formSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Tack för din beställning!</h2>
            <p>Vi kommer att kontakta dig snart med mer information.</p>
          </div>
        ) : (
        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" onSubmit={handleSubmit}>
          
          
          <div className="lg:grid lg:gap-x-16">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Välj datum</h2>
              <DatePicker onDateSelect={setSelectedDate}/>
              <div className="mt-4">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  E-postadress
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                  Telefonnummer
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phone-number"
                    name="phone"
                    autoComplete="tel"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Meddelande
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    placeholder="Skriv ditt meddelande här..."></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Beställning</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img src={product.imageSrc} alt={product.imageAlt} className="w-20 rounded-md" />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.title}
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                          <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                        </div>

                        
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>

                        <div className="ml-4">
                          <label htmlFor={`quantity-${product.id}`} className="sr-only">
                            Quantity
                          </label>
                          <select
                            id={`quantity-${product.id}`}
                            name={`antal_${product.id}`}
                            value={selectedQuantities[product.id] || 0}
                            onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                            className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                          >
                            <option value={0}>-</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Färdig Äppelmust</dt>
                  <dd className="text-sm font-medium text-gray-900">{totalLitres} liter</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Äpplen att lämna in (ungefär)</dt>
                  <dd className="text-sm font-medium text-gray-900">{totalLitres * 2} kg</dd>
                </div>
                {(totalLitres < 25 && totalLitres > 1) && <div className="mt-5 text-sm text-yellow-600">Minst 50 kg äpplen!</div>}
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Totalt pris</dt>
                  <dd className="text-base font-medium text-gray-900">{totalPrice || 0} kr</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">varav moms</dt>
                  <dd className="text-sm font-medium text-gray-900">{totalPrice * 0.2 || 0} kr</dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              {
                formError && <div className="text-red-600 mb-4">{formError}</div>
              }
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50 ${isSubmitting ? "bg-green-500" : "bg-green-600 hover:bg-green-700"}`}
              >
                {isSubmitting ? (
                  <div className="flex justify-center items-center">
                    <div className="spinner"></div>
                  </div>
                ) : (
                  "Bekräfta Order"
                )}
              </button>


                <div className="mt-5 text-sm text-center">Faktura skickas när musten är färdig.</div>
              </div>
            </div>
          </div>
        </form>
          )
        }
        
      </div>
    </div>
  )
}
