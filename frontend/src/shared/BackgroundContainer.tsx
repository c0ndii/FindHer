import { Overlay } from '@mantine/core'
import { WithChildren } from '../utils/WithChildren'
import classes from './BackgroundContainer.module.css'

export const BackgroundContainer = ({ children }: WithChildren) => {
  return (
    <div className={classes['hero-background']}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .25) 40%)"
        opacity={1}
        zIndex={0}
      />
      {children}
    </div>
  )
}
