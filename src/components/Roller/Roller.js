import React, { useState } from 'react'
import { rollFromStat } from '../../utils/dieRolling'
import { Button } from '@material-ui/core'
import rollerStyles from './RollerStyles'

const Roller = () => {
  const classes = rollerStyles()

  const [ mods, setMods ] = useState(0)
  const [ stat, setStat ] = useState(0)

  const [ rollsState, setRollsState ] = useState({
    total:null,
    d20Roll:null,
    statRolls:[],
    dieSize:null
  })

  const { total, d20Roll, statRolls } = rollsState

  const handleAdvantage = (val) => {
    setMods( mods + val )
  }

  const handleStat = (e) => {
    setStat(e.target.value)
  }

  const handleRoll = () => {
    const {rollTotal, statRolls, d20Roll, dieSize} = rollFromStat(stat,mods)
    setRollsState({
      total:rollTotal,
      statRolls,
      d20Roll,
      dieSize
    })
  }

  let advText = ''
  if(mods > 0){
    advText=`Advantage ${mods}`
  }else if(mods < 0){
    advText=`Disadvantage ${Math.abs(mods)}`
  }else{
    advText='No Advantage'
  }
  //determine adv text

  return(
    <section className={classes.rollerSection}>
      <input className='stat-input' type='number' min='0' max='10' value={stat} onChange={handleStat} />
      <div>
        <Button onClick={()=>handleAdvantage(1)}>Advantage</Button>
        <h3>{advText}</h3>
        <Button onClick={()=>handleAdvantage(-1)}>Disadvantage</Button>
      </div>
      <Button className={classes.rollButton} onClick={handleRoll}>Roll</Button>
      {total && <h2>{total} = {d20Roll}{statRolls[0] && ' + ' + statRolls.join(' + ')} </h2>}
      <div>
        
      </div>
    </section>
  )
}

export default Roller