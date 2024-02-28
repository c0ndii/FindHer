import { Header } from '../../features/welcome/Header'
import { HeroBanner } from '../../features/welcome/HeroBanner'
import { BackgroundContainer } from '../../shared/BackgroundContainer'
export const Welcome = () => {
  return (
    <BackgroundContainer>
      <Header />
      <HeroBanner />
    </BackgroundContainer>
  )
}
