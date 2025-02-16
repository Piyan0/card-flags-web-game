export default function useFlag() {
  const flagList = [
    { name: "uzbekistan",idx: "1" },
    { name: "malaysia",idx: "2" },
    { name: "indonesia",idx: "3" },
    { name: "france",idx: "4" },
    { name: "brazil",idx: "5" },
    { name: "prc",idx: "6" },
    { name: "australia",idx: "7" },
    { name: "japan",idx: "8" },
    { name: "korea",idx: "9" },
    { name: "arab",idx: "10" },
    { name: "bahrain",idx: "11" },
    { name: "vietnam",idx: "12" },
    ];
    
    const getImage= (idx)=> new URL(`../assets/images/${idx}.png`, import.meta.url).href
    
    return {flagList, getImage}
}
