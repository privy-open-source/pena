import {
  type FC,
  useEffect,
  useRef,
} from 'react'
import Pena, { type PenaOption } from '@privyid/pena'

const PenaReact: FC<Omit<PenaOption, 'container'>> = (props) => {
  const target = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (target.current) {
      const cleanup = Pena.openDoc({
        container    : target.current,
        url          : props.url,
        lang         : props.lang,
        signature    : props.signature,
        layout       : props.layout,
        privyId      : props.privyId,
        onAfterAction: props.onAfterAction,
      })

      return cleanup
    }
  }, [props])

  return (
    <div
      ref={target}
      className="pena__container" />
  )
}

export default PenaReact
