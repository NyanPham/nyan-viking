import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useTimeout from '../../hooks/useTimeout'
import { clearWarning } from '../../redux/actions/warningActions'
import Warning from './Warning'

export default function WarningContainer() {
    const [warningShown, setWarningShown] = useState(false)
    const warningContent = useSelector(state => state.warning)
    const dispatch = useDispatch()

    const closeWarning = () => {
        setWarningShown(false)
        clear()
    }

    const { reset: resetStart, clear: clearStart } = useTimeout(() => setWarningShown(true), 50)
    const { reset, clear } = useTimeout(closeWarning, 5000)
    
    const handleWarningTransitionEnd = () => {
        if (warningShown === false) {
            dispatch(clearWarning())
        }
    }

    useEffect(() => {
        if (warningContent != null) {
            resetStart()
            reset()
        }
    }, [warningContent])
    
    useEffect(clearStart, [])

    return (
        <div className="z-20">
            <Warning content={warningContent} warningShown={warningShown} closeWarning={closeWarning} handleWarningTransitionEnd={handleWarningTransitionEnd}/>
        </div>
    )
}
