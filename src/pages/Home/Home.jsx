import React from 'react'
import CarouselComponent from '../../components/Carousel/CarouselComponent'
import CarouselSearchByType from '../../components/Carousel/CarouselSearchByType'


import HeaderLocation from './HeaderLocation/HeaderLocation'

function Home() {
  return (
    <>
        <CarouselSearchByType/>
        <CarouselComponent/>
        <HeaderLocation/>
    </>
  )
}

export default Home