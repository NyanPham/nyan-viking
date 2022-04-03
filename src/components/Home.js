import React from 'react'
import Footer from './Footer';
import Header from "./Header";
import Hero from "./Hero";
import ImageGrid from './ImageGrid';
import Policies from "./Policies";
import ProductShowcase from './ProductShowcase';
import RandomBanner from './RandomBanner';
import Testimonials from './Testimonials';

export default function Home() {
    return (
        <div className="relative">
            <Header />
            <Hero />
            <Policies />
            <h2 className="product-showcase-title">Our Picks For Active</h2>
            <ProductShowcase tags={['top-pick']} numberToShow={4} hasButton={false} />
            <RandomBanner />
            <h2 className="product-showcase-title">Performance In Urban</h2>
            <ProductShowcase tags={['performance']} numberToShow={4} hasButton={true} buttonText={'Shop All Active Outdoors'} />
            <Testimonials />
            <ImageGrid />
            <Footer />
        </div>
    )
}
