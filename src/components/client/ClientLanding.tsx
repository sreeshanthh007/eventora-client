

import { ClientHeader } from './ClientHeader'
import EventHeroSection from './EventHeroSection'
import { CategoriesSection } from './CategoriesSection'
import { UpcomingEvents } from './UpcomingEvents'
import { EventProvidersSection } from './EventProvidersSection'
import { TestimonialsSection } from './TestimonialsSection'
import { NewsLetterSection } from './NewsLetterSection'
import { Footer } from '../mainComponents/Footer'
import { useDispatch } from 'react-redux'
import type { RootState } from '@/store/store'

export const ClientLanding = () => {
  
  return (
       <>
        <ClientHeader/>
        <EventHeroSection/>
        <CategoriesSection/>
        <UpcomingEvents/>
        <EventProvidersSection/>
        <TestimonialsSection/>
        <NewsLetterSection/>

        <Footer/>
       </>
        
   
  )
}
