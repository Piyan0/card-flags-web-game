import arrayShuffle from 'array-shuffle'

export default function useRandom(){
  const generatePlainNumber= (toNum)=>{
    let r= []
    for(let i=0; i<toNum; i++){
      r.push(i)
    }
    //console.log(r) 
    return r
  }
  const getRandom= (arr)=> {
    const idx= Math.floor(Math.random()* arr.length)
    //console.log("idx is>>", idx, arr)
    return arr[idx]
  }
  const generatePair= (limit, allNum)=>{
    const r= []
    for(let i= 0; i<limit; i++){
      const random= getRandom(allNum)
      const idx= allNum.indexOf(random)
      r.push(random)
      r.push(random)
      allNum.splice(idx, 1)
      //console.log('getted>>', random, 'at index>>', idx)
      //console.log(allNum)
    }
    return arrayShuffle(r)
  }

  return {generatePlainNumber, generatePair}
}