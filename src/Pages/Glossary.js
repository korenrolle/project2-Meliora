import "./Glossary.css"
import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import GlossaryTile from "./GlossaryTile"


const Glossary = (props) => {

    const [characterData, setCharacterData] = useState([])
    const [characterInfo, setCharacterInfo] = useState()
    const [loading, setLoading] = useState(true)
    const [URL, setURL] = useState("https://rickandmortyapi.com/api/character?page=1")
    const [nextPageUrl, setNextPageUrl] = useState()
    const [prevPageUrl, setPrevPageUrl] = useState()

    const Pages = []

    for (let i = 1; i < 43; i++) {
        Pages.push(i)
    }
    
    async function fetchData() {
        try {
            setLoading(true)
            const response = await fetch (URL)
            const Data = await response.json()

            setLoading(false)
            fetchInfo(Data.results)
            setNextPageUrl(Data.info.next)
            setPrevPageUrl(Data.info.prev)
            
            
            
        } catch (err) {
            console.log(err)
        }
        
    }

    async function fetchInfo(Data) {
        Data.map(async(item) => {
            const respond = await fetch (item.url)
            const charInfo = await respond.json()
            setCharacterData(list => {
                list=[...list,charInfo]
                return list
            })
          
        })

    }
    
    useEffect(() => {
        fetchData()
        
    }, [URL])


    return (
        <div className="Glossary-Page">
                <nav className="list-container">
                    <div className='page-list'>
                        {Pages.map((page) => {
                            return (
                                <button key={page} className='page-tile'
                                    onClick={() => {
                                        setCharacterData([])
                                        setURL(`https://rickandmortyapi.com/api/character?page=${parseInt(page)}`)
                                        }} >{page}</button>
                            )
                        }
                        )}
                    </div>
                </nav>
                <div className="prev-next">
                    { prevPageUrl && <button className="prev-next-button" onClick={()=> {
                        setCharacterData([])
                        setURL(prevPageUrl)
                    }}>Previous</button>}
                    { nextPageUrl && <button className="prev-next-button" onClick={()=> {
                        setCharacterData([])
                        setURL(nextPageUrl)
                    }}>Next</button>}
                </div>
                <GlossaryTile character={characterData} loading={loading} characterInfo={char=>setCharacterInfo(char)}/>
               
            
        </div>

)
}
export default Glossary

