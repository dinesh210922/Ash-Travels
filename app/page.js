'use client'
import {useEffect,useRef,useState} from 'react'
import {supabase} from '../lib/supabase'
import {Phone,Mail,MapPin,Star,MessageCircle,Menu,X,Home,Image as Img,Send,Plane,Car,Compass,Users,Sun,Route,Sparkles,ArrowRight} from 'lucide-react'
const icons=[Plane,Car,Compass,Users,Sun,Route,Sparkles]
const Pic=({src,className=''})=>src?<img src={src} alt="" loading="lazy" className={'object-cover '+className}/>:<div className={'bg-gradient-to-br from-emerald to-teal '+className}/>
const Title=({t,s,light})=><div className="mb-8 text-center"><h2 className={'font-serif text-3xl font-bold md:text-4xl '+(light?'text-white':'')}>{t}</h2><p className={'mt-1 '+(light?'text-white/80':'text-emerald/70')}>{s}</p><div className="mx-auto mt-3 h-0.5 w-24 bg-gold"/></div>
function Counter({to,suffix=''}){const [n,setN]=useState(0),ref=useRef()
 useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;io.disconnect();const t0=performance.now();const tick=t=>{const k=Math.min((t-t0)/1500,1);setN(Math.round(to*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)},{threshold:.5});io.observe(ref.current);return()=>io.disconnect()},[to])
 return <span ref={ref}>{n}{suffix}</span>}
const nav=[['Home','#home'],['Services','#services'],['Destinations','#destinations'],['Gallery','#gallery'],['Reviews','#reviews'],['Contact','#contact']]

export default function Page(){
 const [d,setD]=useState({settings:{},services:[],destinations:[],gallery:[],reviews:[]})
 const [open,setOpen]=useState(false),[cat,setCat]=useState('All'),[box,setBox]=useState(null),[done,setDone]=useState(false),[err,setErr]=useState('')
 const [vehicle,setVehicle]=useState('Sedan')
 useEffect(()=>{(async()=>{
  const [s,sv,ds,g,r]=await Promise.all([supabase.from('settings').select(),supabase.from('services').select().order('sort'),supabase.from('destinations').select().order('sort'),supabase.from('gallery').select().order('created_at',{ascending:false}),supabase.from('reviews').select().eq('approved',true).order('created_at',{ascending:false})])
  setD({settings:Object.fromEntries((s.data||[]).map(x=>[x.key,x.value])),services:sv.data||[],destinations:ds.data||[],gallery:g.data||[],reviews:r.data||[]})})()},[])
 const S=d.settings,wa=`https://wa.me/${S.whatsapp||''}?text=${encodeURIComponent('Hello Ash Signature Travels, I would like to make a booking enquiry.')}`
 const cats=['All',...new Set(d.gallery.map(g=>g.category).filter(Boolean))]
 const photos=d.gallery.filter(g=>cat==='All'||g.category===cat)
 useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.rv').forEach(el=>io.observe(el));return()=>io.disconnect()},[d,cat])
 const f=e=>Object.fromEntries(new FormData(e.target))
 async function book(e){e.preventDefault();setErr('');const v=f(e);v.passengers=+v.passengers||1;v.travel_date=v.travel_date||null
  const {error}=await supabase.from('bookings').insert(v);error?setErr('Could not send enquiry. Please try WhatsApp.'):(setDone(true),e.target.reset())}
 async function review(e){e.preventDefault();const v=f(e);v.rating=+v.rating
  const {error}=await supabase.from('reviews').insert(v);alert(error?'Could not submit review.':'Thank you! Your review will appear once approved.');if(!error)e.target.reset()}
 async function contact(e){e.preventDefault();const {error}=await supabase.from('messages').insert(f(e));alert(error?'Could not send message.':'Message sent. We will reply soon.');if(!error)e.target.reset()}
 return <main className="pb-20 md:pb-0">
 <div className="hidden bg-emerald px-8 py-2 text-xs text-white md:flex justify-between"><span>{S.address}</span><span>{S.email} · {S.phone}</span></div>
 <header className="sticky top-0 z-40 bg-ivory/95 shadow backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
  <a href="#home" className="flex items-center gap-2"><img src="/logo.jpg" alt="Ash Signature Travels" className="h-14 w-14 rounded-full"/><span className="font-serif text-xl font-bold leading-none">Ash<small className="block text-[10px] tracking-widest">SIGNATURE TRAVELS</small></span></a>
  <nav className="hidden gap-6 text-sm font-medium md:flex">{nav.map(([n,h])=><a key={n} href={h} className="hover:text-gold">{n}</a>)}</nav>
  <div className="flex items-center gap-2"><a href={wa} className="grid h-10 w-10 place-items-center rounded-full bg-emerald text-white md:hidden"><MessageCircle size={20}/></a><a href="#book" className="btn hidden md:inline-flex">Book Your Ride <ArrowRight size={16}/></a><button className="grid h-10 w-10 place-items-center rounded-full bg-sand md:hidden" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button></div></div>
  {open&&<div className="grid gap-1 bg-ivory px-4 pb-4 md:hidden">{nav.map(([n,h])=><a key={n} href={h} onClick={()=>setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-sand/30">{n}</a>)}</div>}</header>

 <section id="home" className="relative flex min-h-[78vh] items-center overflow-hidden bg-emerald text-white">
  {S.hero_image&&<img src={S.hero_image} alt="" className="kenburns absolute inset-0 h-full w-full object-cover"/>}<div className="absolute inset-0 bg-gradient-to-r from-emerald/90 via-emerald/50 to-transparent"/>
  <Plane className="plane absolute text-sand/80" size={44}/>
  <div className="up relative mx-auto w-full max-w-7xl px-6"><p className="font-serif text-2xl italic text-sand md:text-4xl">Discover the Beauty of</p><h1 className="font-serif text-6xl font-bold md:text-8xl">Sri Lanka</h1>
   <p className="mt-4 max-w-md text-lg">Explore Sri Lanka in Comfort, Style & Confidence.</p>
   <div className="mt-6 flex flex-wrap gap-3"><a href="#destinations" className="btn">Explore Our Tours <ArrowRight size={16}/></a><a href="#book" className="inline-flex items-center rounded-full border border-white px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-emerald">Book Your Ride</a></div></div><svg className="absolute inset-x-0 bottom-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" height="60"><g className="wave1"><path d="M0 40 Q180 0 360 40 T720 40 T1080 40 T1440 40 T1800 40 V80 H0Z" fill="#E0AE54" opacity=".5"/></g><g className="wave2"><path d="M0 50 Q180 10 360 50 T720 50 T1080 50 T1440 50 T1800 50 V80 H0Z" fill="#F3EBD9"/></g></svg></section>

 <section className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-4 pt-10 text-center md:grid-cols-4">{[[d.destinations.length,'','Destinations'],[d.services.length,'','Services'],[+S.stat_trips||0,'+','Tours Completed'],[+S.stat_years||0,'+','Years of Experience']].filter(x=>x[0]>0).map(([n,sf,l])=><div key={l} className="rv"><div className="font-serif text-4xl font-bold text-gold"><Counter to={n} suffix={sf}/></div><div className="text-sm">{l}</div></div>)}</section>

 <section id="services" className="mx-auto max-w-7xl px-4 py-14"><Title t="Our Services" s="Travel Your Way – With Ash Signature Travels"/>
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">{d.services.map((s,i)=>{const I=icons[i%7];return <a key={s.id} style={{'--d':i*.08+'s'}} href="#book" className="rv group overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1"><Pic src={s.image_url} className="h-28 w-full"/><div className="p-3 text-center"><I className="mx-auto -mt-8 mb-2 rounded-full bg-emerald p-2 text-sand" size={36}/><h3 className="font-serif font-bold">{s.title}</h3><p className="text-xs text-emerald/70">{s.description}</p><span className="mt-2 inline-block text-xs font-semibold text-gold">Enquire Now →</span></div></a>})}</div></section>

 <section id="destinations" className="bg-emerald py-14 text-white"><div className="mx-auto max-w-7xl px-4"><Title light t="Explore Sri Lanka" s="From ancient wonders to golden beaches"/>
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{d.destinations.map((x,i)=><div key={x.id} style={{'--d':i*.08+'s'}} className="rv group relative overflow-hidden rounded-2xl"><Pic src={x.image_url} className="h-44 w-full transition duration-500 group-hover:scale-110 md:h-56"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-3"><h3 className="flex items-center gap-1 font-semibold"><MapPin size={14} className="text-sand"/>{x.title}</h3><p className="hidden text-xs text-white/80 md:block">{x.description}</p></div></div>)}</div></div></section>

 <section id="gallery" className="mx-auto max-w-7xl px-4 py-14"><Title t="Our Travel Gallery" s="Moments from our unforgettable journeys"/>
  <div className="mb-6 flex flex-wrap justify-center gap-2">{cats.map(c=><button key={c} onClick={()=>setCat(c)} className={'rounded-full border px-4 py-1 text-sm '+(cat===c?'bg-emerald text-white':'border-emerald/30 bg-white')}>{c}</button>)}</div>
  {!photos.length&&<p className="text-center text-emerald/60">Photos from previous tours will appear here.</p>}
  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{photos.map((p,i)=><button key={p.id} style={{'--d':(i%8)*.06+'s'}} onClick={()=>setBox(p)} className="rv overflow-hidden rounded-xl"><img src={p.image_url} alt={p.destination||'Tour photo'} loading="lazy" className="h-40 w-full object-cover transition hover:scale-105 md:h-52"/></button>)}</div></section>
 {box&&<div className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4" onClick={()=>setBox(null)}><button className="absolute right-4 top-4 text-white"><X size={32}/></button><figure className="max-h-full text-center text-white"><img src={box.image_url} alt="" className="max-h-[80vh] rounded-lg"/><figcaption className="mt-2"><b>{box.destination}</b> {box.description}</figcaption></figure></div>}

 <section id="reviews" className="bg-emerald py-14"><div className="mx-auto max-w-7xl px-4"><Title light t="What Our Clients Say" s="Real stories. Real experiences."/>
  <div className="grid gap-4 md:grid-cols-3">{d.reviews.map((r,i)=><div key={r.id} style={{'--d':i*.1+'s'}} className="rv rounded-2xl bg-ivory p-5"><div className="flex text-sand">{[...Array(r.rating)].map((_,i)=><Star key={i} size={16} fill="currentColor"/>)}</div><p className="my-2 text-sm">“{r.comment}”</p><b className="text-sm">— {r.name}{r.country&&`, ${r.country}`}</b></div>)}
  {!d.reviews.length&&<p className="text-white/80 md:col-span-3 text-center">Be the first to share your experience.</p>}</div>
  <form onSubmit={review} className="mx-auto mt-8 grid max-w-xl gap-3 rounded-2xl bg-ivory p-5"><h3 className="font-serif text-xl font-bold">Share Your Review</h3>
   <div className="grid grid-cols-2 gap-3"><input required name="name" placeholder="Your name" className="inp"/><input name="country" placeholder="Country" className="inp"/></div>
   <select name="rating" className="inp" defaultValue="5">{[5,4,3,2,1].map(n=><option key={n} value={n}>{'★'.repeat(n)} ({n})</option>)}</select>
   <textarea required name="comment" rows={3} placeholder="Your experience" className="inp"/><button className="btn">Submit Review</button><p className="text-xs text-emerald/60">Reviews appear after approval.</p></form></div></section>

 <section id="book" className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2"><div><h2 className="font-serif text-4xl font-bold italic text-gold">Your Journey, <span className="not-italic text-emerald">Our Signature.</span></h2><p className="my-4">Get in touch for bookings, enquiries or custom travel plans.</p><a href={wa} target="_blank" className="btn"><MessageCircle size={18}/> Chat on WhatsApp</a></div>
  {done?<div className="rounded-2xl bg-white p-8 text-center shadow"><h3 className="font-serif text-2xl font-bold">Thank you!</h3><p className="my-2">Your enquiry has been received. We will contact you shortly.</p><a href={wa} className="btn">Continue on WhatsApp</a><button className="block mx-auto mt-3 text-sm underline" onClick={()=>setDone(false)}>New enquiry</button></div>:
  <form onSubmit={book} className="grid gap-3 rounded-2xl bg-white p-5 shadow sm:grid-cols-2"><h3 className="font-serif text-xl font-bold sm:col-span-2">Book Your Journey</h3>
   <input required name="full_name" placeholder="Full Name" className="inp"/><input required type="email" name="email" placeholder="Email Address" className="inp"/><input required name="whatsapp" placeholder="WhatsApp Number" className="inp"/><input required name="pickup" placeholder="Pickup Location" className="inp"/>
   <input required name="destination" placeholder="Destination" className="inp"/><input required type="date" name="travel_date" className="inp"/><input type="number" min="1" name="passengers" placeholder="Passengers" className="inp"/>
   <select name="vehicle" value={vehicle} onChange={e=>setVehicle(e.target.value)} className="inp">{['Sedan','SUV','Van','Mini Bus'].map(v=><option key={v}>{v}</option>)}</select>
   <textarea name="message" rows={3} placeholder="Additional Message" className="inp sm:col-span-2"/>{err&&<p className="text-red-600 text-sm sm:col-span-2">{err}</p>}<button className="btn sm:col-span-2"><Send size={16}/> Send Enquiry</button></form>}</section>

 <section id="contact" className="bg-emerald py-14 text-white"><div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2"><div><h2 className="mb-4 font-serif text-3xl font-bold">Contact Us</h2>
  <p className="flex gap-2 py-1"><Phone size={18}/>{S.phone}</p><p className="flex gap-2 py-1"><Mail size={18}/>{S.email}</p><p className="flex gap-2 py-1"><MapPin size={18}/>{S.address}</p>
  <p className="my-3 flex gap-4 text-sand">{['facebook','instagram','youtube'].map(k=><a key={k} href={S[k]} target="_blank" className="capitalize underline">{k}</a>)}</p>
  <iframe title="Map" className="h-56 w-full rounded-xl" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(S.map_query||'Colombo')}&output=embed`}/></div>
  <form onSubmit={contact} className="grid gap-3 text-emerald"><input required name="name" placeholder="Name" className="inp"/><input required type="email" name="email" placeholder="Email" className="inp"/><textarea required name="message" rows={5} placeholder="Message" className="inp"/><button className="btn">Send Message</button></form></div></section>
 <footer className="bg-emerald/95 py-6 text-center text-sm text-white/80">© {new Date().getFullYear()} Ash Signature Travels. All rights reserved. <a href="/admin" className="ml-2 opacity-40">Admin</a></footer>

 <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 bg-emerald py-2 text-center text-[11px] text-white md:hidden">{[[Home,'Home','#home'],[MapPin,'Tours','#destinations'],[Img,'Gallery','#gallery'],[Star,'Reviews','#reviews'],[Phone,'Contact','#contact']].map(([I,n,h])=><a key={n} href={h} className="grid justify-items-center gap-0.5"><I size={20} className="text-sand"/>{n}</a>)}</nav>
 </main>}
