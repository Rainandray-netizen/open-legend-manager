const statTable = {
  0: [0,0],
  1: [1,4],
  2: [1,6],
  3: [1,8],
  4: [1,10],
  5: [2,6],
  6: [2,8],
  7: [2,10],
  8: [3,8],
  9: [3,10],
  10: [4,8]
}

const rollFromStat = (stat, mods) => {
  if( stat < 0 || stat > 10 ) return ('invalid stat!')
  if( !mods ){ mods = 0 }
  //convert undefined mods to 0

  let [numRolls, dieSize] = statTable[stat]
  let absMod = Math.abs(mods)
  //convert stat to dice

  let allRolls = numRolls + absMod

  let diePool = []

  for(let i = 0; i < allRolls; i++){
    diePool.push(rollOne(dieSize))
  }
  //rolling all dice

  if(mods>0){
    diePool.sort((a,b)=>b-a)
  }else if(mods<0){
    diePool.sort((a,b)=>a-b)
  }
  //sorting values 

  diePool = diePool.slice(0,numRolls)
  //trimming the rolls

  //need to check for max rolls and explode the dice, also increasing the numrolls by 1 for each explosion

  let explodedDiePool = []

  const explodeDie = (die, maxRoll) => {
    if(die===maxRoll){
      let newRoll = rollOne(die)
      if(newRoll === maxRoll){
        console.log('exploding roll explodes again!')
        explodeDie(die, maxRoll)
        //if the roll explodes again, repeat the function
        //and do not push the new roll as it will be updated in the next loop
      }else{
        explodedDiePool.push(newRoll)
      }
    }
    explodedDiePool.push(die)
  }

  diePool.forEach((die)=>{
    explodeDie(die, dieSize)
  })

  let rollTotal = 0

  //die sum here
  for(let i = 0; i < explodedDiePool.length; i++){
    rollTotal += explodedDiePool[i] 
  }

  // const statRolls = diePool.slice(0,numRolls)

  const d20Roll = rolld20(stat, mods)

  const statRolls = explodedDiePool.sort((a,b)=>b-a)

  return {
    rollTotal:rollTotal+d20Roll,
    d20Roll,
    statRolls,
    dieSize
  }
}

const rollOne = (dieSize) => {
  if(!dieSize) return 0
  const rollRes = Math.ceil(Math.random() * dieSize)
  return rollRes
}

const explodeD20 = () => {
  let res = rollOne(20)
  return res === 20 ? res + explodeD20() : res
}

const rolld20 = (stat, mods) => {
  let res = 0
  //if no stat apply adv/disadv to d20, else do not apply
  if (stat) {
    res = rollOne(20)
  }else{
    console.log('no stats were found, applying adv')
    if(mods>0){
      res = Math.max(rollOne(20), rollOne(20))
    }else if(mods<0){
      res = Math.min(rollOne(20),rollOne(20))
    }else{
      res = rollOne(20)
    }
  }

  //now explode the die if necessary
  if(res===20){
    res += explodeD20()
  }

  return res
}

export {
  rollFromStat,
  rollOne
}