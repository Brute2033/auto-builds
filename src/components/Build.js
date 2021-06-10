import axios from 'axios'
import {useState, useEffect} from 'react'
// import {useDispatch} from 'react-redux'
// import {setVehicles} from '../ducks/vehicleReducer'
import ModItem from './ModItem'

const Build = (props) => {
    const {id} = props.match.params
    // const {builds} = useSelector((store) => store.vehicle)
    const [build, setBuild] = useState({})
    const [exMods, setExMods] = useState([])
    const [inMods, setInMods] = useState([])
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    // const [descriptionTwo, setDescriptionTwo] = useState('')
    // const [yeet, setYeet] = useState('')
    const [pic, setPic] = useState([])
    // const [newMod, setNewMod] = useState('')
    // const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`/api/readvehicle/${id}`)
        .then((res) => {
            console.log(res.data)
            setBuild(res.data)
            
        })
        .catch((err) => console.log(err))
    }, [id])

    useEffect(() => {
        axios.get(`/api/getmods/${id}`)
        .then((res) => {
            console.log(res.data)
            const {exteriorArr, interiorArr} = res.data
            setExMods(exteriorArr)
            setInMods(interiorArr)
        })
        .catch((err) => console.log(err))
    }, [id])

    useEffect(() => {
        axios.get(`/api/getPhotos/${id}`)
        .then((res) => {
            console.log(res.data)
            const {picArr} = res.data
            setPic(picArr)
        })
    }, [id])

    const save = () => {
        axios.post('/api/addmod', {vehicle: props.match.params.id, description, type})
        .then((res) => {
            console.log('Mod saved')
            console.log(res.data)
            const {exteriorArr, interiorArr} = res.data
            setExMods(exteriorArr)
            setInMods(interiorArr)
        })
        .catch((err) => console.log(err))
    }

    const saveEdit = (id, text) => {
        axios.put(`/api/editmod/${id}`, {vehicle: props.match.params.id, descriptionTwo: text})
        .then((res) => {
            console.log('Mod Updated')
            const {exteriorArr, interiorArr} = res.data
            setExMods(exteriorArr)
            setInMods(interiorArr)
            // setDescription('')

        })
    }

    const deleteMod = (mod_id) => {
        axios.put(`/api/deletemod/${mod_id}`, {vehicle: props.match.params.id})
        .then((res) => {
            console.log('Mod Deleted')
            // setYeet(res.data)
            const {exteriorArr, interiorArr} = res.data
            setExMods(exteriorArr)
            setInMods(interiorArr)
        })
        .catch((err) => console.log(err))
    }
    // const handleToggle = () => {}
    // const addaMod = (props) => {
    //     axios.post('/api/addmod', {description, type})
    //     .then(() => console.log('Yuuuuuuhhhhh'))
    //     .catch((err) => console.log(err))
    // }
    // useEffect(() => {
    //     axios.post('/api/addmod', {description, type})
    //     .then((res) => {
    //         console.log(res.data)
    //         const {newMod} = res.data
    //         setNewMod(res.data)
    //     })
    // }, [dispatch])
    return(
        <div>
            {/* <h1>{props.match.params.id}</h1> */}
            <h2>{build.author}'s {build.year} {build.make} {build.model} {build.trim}</h2>
            {pic.map(picture => {
                return(
                    <div className='gallery'>
                        <img className='pictures' src={picture.link} alt='build pic' style={{width: 300, height: 250}} />
                    </div>
                )
            })}
            <div>
                <input placeholder='Part/Modification' value={description} onChange={(e) => setDescription(e.target.value)} />
                <input placeholder='Exterior or Interior' value={type} onChange={(e) => setType(e.target.value)} />
                <button onClick={save}>Add Mod</button>
            </div>
            <div>
                <h3> Exterior Modifications: </h3>
                {exMods.map(mod => {
                    return(
                        <ModItem mod={mod} deleteMod={deleteMod} saveEdit={saveEdit} key={mod.mod_id} />
                        )
                    })}
            </div>
            <div>
                <h3> Interior Modifications: </h3>
                {inMods.map(mod => {
                    return(
                        <ModItem mod={mod} deleteMod={deleteMod} saveEdit={saveEdit} key={mod.mod_id} />
                        )
                    })}
            </div>
        </div>
    )
}


export default Build