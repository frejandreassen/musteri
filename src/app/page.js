'use client'
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import CheckOut from '../components/CheckOut'


const products = [
  {
    id: '3liter',
    name: 'Äppelmust 3 liter, ståpåse',
    href: '/Stapase-med-appelmotiv-och-tappkran.jpg',
    imageSrc: 'Stapase-med-appelmotiv-och-tappkran.jpg',
    imageAlt: "Ståpåse med äppelmotiv och tappkran",
    price: '95 kr',
    size: '3 liter',
    litres: 3,
  },
  {
    id: '15liter',
    name: 'Äppelmust 1.5 liter, ståpåse',
    href: '/Vit-stapase-pouch-med-tappkran-och-handtag.jpg',
    imageSrc: 'Vit-stapase-pouch-med-tappkran-och-handtag.jpg',
    imageAlt: "Vit ståpåse med tappkran",
    price: '60 kr',
    size: '1.5 liter',
    litres: 1.5,
  },
  {
    id: '1liter',
    name: 'Äppelmust 1 liter, bygelflaska',
    href: '/bygelflaska.jpg',
    imageSrc: 'bygelflaska.jpg',
    imageAlt: "Bygelflaska 1 liter",
    price: '60 kr',
    size: '1 liter',
    litres: 1,
  },

]


export default function Index() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8" style={{ 
      backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,1) 100%), url('/liana-mikah-PyJCcS09RTg-unsplash.jpg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-green-600">Äppelmust</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Hertings Trädgårdsmusteri</h1>
        <p className="mt-6 text-xl leading-8">
        Hertings Trädgårdsmusteri ligger på Hertings allé 10. Vi mustar äpplen som en trevlig hobby. Lämna in dina äpplen på morgonen med en namnlapp, så meddelar vi när din must är klar att hämtas.
        </p>
        <button 
          onClick={() => document.getElementById('checkoutForm').scrollIntoView({ behavior: 'smooth' })}
          className="mt-5 rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
          Till bokning
        </button>
        <div className="mt-10 max-w-3xl">
          <p>
            Om du vill förvandla dina egna äpplen till must, boka din tid med oss. Observera att vi kräver en minsta mängd om 50 kg äpplen för bokning för att fylla en hel press. Om du inte har möjlighet att väga dina äpplen kan du uppskatta att en full papperskasse med äpplen väger cirka 10-15 kg.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Så går det till</h2>
          <p className="mt-6">
            Att skapa en högkvalitativ must kräver noggrannhet från start till slut. Här är några enkla steg för att säkerställa att du får bästa möjliga resultat när du lämnar in dina äpplen till oss:
          </p>
          <ul role="list" className="mt-8 max-w-2xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-gray-900">Förbered dina äpplen:</strong> Samla dina mogna äpplen i papperskassar eller IKEA-kassar. Vi tar gärna emot äpplen med mindre skador i skalet, men sortera bort dem som är övermogna, mögliga eller ruttna.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-gray-900">Inlämning:</strong> Lämna in dina äpplen på morgonen eller förmiddagen. Adressen är Hertings allé 10. Om vi inte är hemma, lämna en lapp vid dina äpplen med ditt namn och telefonnummer. 
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-gray-900">Förpackning & Förvaring:</strong> Din must levereras i antingen bag-in-boxförpackningar eller glasflaskor. Tack vare pastörisering håller musten upp till ett år i oöppnad förpackning. Efter att förpackningen öppnats, håller bag-in-box sig i minst fyra veckor i kylskåp, medan glasflaskan håller cirka 1 vecka.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-gray-900">Utbyte:</strong> Vanligtvis får du 45-65% av fruktens vikt i must, beroende på äppelsort.
              </span>
            </li>
          </ul>
        </div>
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Priser</h2>
          <p className="mt-8">
            Våra priser varierar beroende på mängd och förpackningsval.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Bokning</h2>
          <p className="mt-8">
            Boka din tid för äppelmustning nedan. De grönmarkerade dagarna är när vi har lediga tider för inlämning av must. Om ni har några frågor eller annat, så hör av er till oss på frej@andreassens.se eller 0706920705.
          </p>
        </div>
        <div id="checkoutForm">
          <CheckOut products={products}/>
        </div>

      </div>
    </div>
  )
}
