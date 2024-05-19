import axios from 'axios'
import eact, { useEffect } from 'react'

function Table(){
    useEffect(()=>{
        axios.get('http://localhost:3000/users')
    })
}