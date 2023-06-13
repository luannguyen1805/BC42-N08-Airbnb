import React from 'react'
import DetailBooking from '../DetailBooking/DetailBooking'
import DetailDescription from './DetailDescription/DetailDescription'
import DetailEquipment from './DetailEquipment/DetailEquipment'
import DetailInfoCover from './DetailInfoCover/DetailInfoCover'

function DetailInfo({ id }) {
  return (
    <div className='mt-14 flex gap-24'>
      <div className='w-3/5'>
        <DetailDescription />
        <DetailInfoCover />
        {/* <DetailIntroduce/> */}
        {/* <DetailSleepRoom /> */}
        <DetailEquipment />
        {/* <DetailCalendar/> */}
      </div>
      <div className='w-2/5 relative right-0 top-0'>
        <DetailBooking id={id} />
      </div>
    </div>
  )
}

export default DetailInfo