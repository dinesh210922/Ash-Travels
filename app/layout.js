import './globals.css'
import {Playfair_Display,Inter} from 'next/font/google'
const serif=Playfair_Display({subsets:['latin'],variable:'--font-serif'})
const sans=Inter({subsets:['latin'],variable:'--font-sans'})
export const metadata={title:'Ash Signature Travels | Private Cab & Tours in Sri Lanka',description:'Airport transfers, private car hire and tailor-made tours across Sri Lanka. Travel in comfort, style and confidence.',openGraph:{title:'Ash Signature Travels',description:'Premium private cab & tour service in Sri Lanka',images:['/logo.jpg']}}
export default function L({children}){return <html lang="en"><body className={`${serif.variable} ${sans.variable} font-sans`}>{children}</body></html>}
