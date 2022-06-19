import React, { useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero/Hero'
import ImageGrid from './ImageGrid'
import Policies from './Policies'
import ProductShowcase from './Product/ProductShowcase'
import RandomBanner from './RandomBanner'
import Testimonials from './Testimonials'

export default function Home({ documentRef }) {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [])

    return (
        <div className="relative">
            <Header documentRef={documentRef} />
            <Hero />
            <Policies />
            <h2 className="product-showcase-title">Our Picks For Active</h2>
            <ProductShowcase tags={['top pick', 'Tropical']} numberToShow={4} hasButton={false} />
            <RandomBanner />
            <h2 className="product-showcase-title">Performance In Urban</h2>
            <ProductShowcase tags={['performance', 'Tropical']} numberToShow={4} hasButton={true} buttonText={'Shop All Active Outdoors'} />
            <Testimonials />
            <ImageGrid />
            <Footer />
        </div>
    )
}
