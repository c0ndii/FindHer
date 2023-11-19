import { Header } from '../components/Welcome/Header'
import { HeroBanner } from '../components/Welcome/HeroBanner'
import { BackgroundContainer } from '../components/Common/BackgroundContainer'
export const Welcome = () => {
  return (
    <BackgroundContainer>
      <Header />
      <HeroBanner />
    </BackgroundContainer>
  )
}
