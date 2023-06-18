import React from 'react'
import BackToTop from '../../components/BackToTop/BackToTop'
import CarouselComponent from '../../components/Carousel/CarouselComponent'
import CarouselSearchByType from '../../components/Carousel/CarouselSearchByType'


import HeaderLocation from './HeaderLocation/HeaderLocation'

function Home() {
  return (
    <>
        <CarouselSearchByType/>
        <CarouselComponent/>
        <HeaderLocation/>
        <BackToTop/>
    </>
  )
}

export default Home