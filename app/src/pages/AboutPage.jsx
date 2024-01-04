import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg-4.jpg'

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} className="main-img" alt="" />
        <article>
          <div className="title">
            <h2>Welcome to ComfySloth: Embrace the Cozy Lifestyle</h2>
            <div className="underline"></div>
          </div>
          <p>
            At ComfySloth, we believe in the magic of comfort and the joy of
            embracing a slow, cozy lifestyle. Our story is one of relaxation,
            warmth, and effortless style, inspired by the tranquil nature of
            sloths and their leisurely approach to life.
          </p>
          <h4>The Art of Slothful Comfort </h4>
          <p>
            ComfySloth was born out of a desire to bring the serene comfort of
            sloths into your everyday life. We've taken inspiration from these
            adorable creatures to curate a collection that embodies the art of
            slothful comfort. From loungewear that feels like a warm hug to home
            essentials that create a sanctuary of tranquility, we've got your
            comfort covered.
          </p>
          <h4>Slothfully Designed Products</h4>
          <p>
            Our products are not just items; they're expressions of a lifestyle
            centered around ease and relaxation. Each piece is slothfully
            designed, ensuring that you not only look good but also feel like
            you're on a perpetual weekend getaway. Cozy fabrics, charming
            designs, and a commitment to quality define the essence of
            ComfySloth.
          </p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  h4 {
    margin-top: 2rem;
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
