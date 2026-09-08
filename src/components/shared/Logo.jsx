import logoColor from '../../assets/brand/logo.png'
import logoWhite from '../../assets/brand/logo-white.png'

export default function Logo({ className = 'h-11 w-auto', light = false }) {
  return (
    <img
      src={light ? logoWhite : logoColor}
      alt="Dynamic Innovations logo"
      className={className}
    />
  )
}
