import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: 'Enter the temp in degrees,then click Calculate 2 compute the index.'
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: 'Its important for the tourists satisfaction with your tour.'
  },
  {
    imgUrl: customizationImg,
    title: "Customizaton",
    desc: 'the action of modifying something to suit a particular individual or task.'
  }
]

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  )
}

export default ServiceList
