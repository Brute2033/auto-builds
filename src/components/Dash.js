import axios from 'axios'
import {useEffect, useState, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setVehicles} from '../ducks/vehicleReducer'
import {Link} from 'react-router-dom'
import './Dash.css'

const Dash = (props) => {
    const {builds} = useSelector((store) => store.vehicle)
    const [mine, setMine] = useState(false)
    const [search, setSearch] = useState('')
    const [oldest, setOldest] = useState(false)
    const dispatch = useDispatch()

    const grabBuilds = useCallback(() => {
        let url = '/api/getvehicles'
        if(mine && !search){
            oldest ? url += '?mine=true&oldest=true' : url += '?mine=true'
            console.log('1')
        } else if (!mine && search){
            oldest ? url += `?search=${search}&oldest=true` : url += `?search=${search}`
            console.log('2')
        } else if (mine && search){
            oldest ? url += `?mine=true&search=${search}&oldest=true` : url += `?mine=true&search=${search}`
            console.log('3')
        } else {
            if(oldest){
                url += '?oldest=true'
                console.log('4')
            }
        }
        axios.post(url)
        .then(res => {
            console.log(res.data)
            dispatch(setVehicles(res.data))
        })
        .catch((err) => console.log(err))
    }, [mine, search, oldest, dispatch])

    const deletevehicle = (vehicle_id) => {
        axios.put(`/api/deletevehicle/${vehicle_id}`)
        .then((res) => {
            console.log('Vehicle Deleted')
            const {vehiclesArr} = res.data
            setVehicles(vehiclesArr)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        grabBuilds()
    }, [mine, oldest, grabBuilds])

    return(
        <div className='dash'>
            <h1 className='dash-title'>Posted Builds</h1>
                <div className='dash-search'>
                    <input placeholder='Make and/or Model' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={() => grabBuilds()} >Search</button>
                    {/* <button>Reset</button> */}
                </div>
            <div className='dash-container'>
                <div className='dash-all-vehicles'>
                    {builds.map((vehicle) => {
                        return(
                            <div className='dash-vehicle-box' key={vehicle.vehicle_id}>
                                <Link to={`/build/${vehicle.vehicle_id}`}><h3 className='dash-vehicle-title'>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</h3></Link>
                                <img className='dash-pic' src={vehicle.link} alt='' style={{height: 150, width: 225}} />
                                {/* {pic.map(picture => {
                                    return(
                                        <div className='gallery'>
                                        <img className='pictures' src={picture.link} alt='build pic' />
                                        </div>
                                        )
                                    })} */}
                                <br />
                                <button className='dash-delete' onClick={() => deletevehicle(vehicle.vehicle_id)}>X</button>
                            </div>
                        )
                    })}
                </div>
                <div className='dash-filter-box'>
                    <div>
                        <p>Include my builds</p>
                        <input checked={mine} onChange={() => setMine(!mine)} type='checkbox' />
                    </div>
                    <div>
                        <p>oldest to newest</p>
                        <input checked={oldest} onChange={() => setOldest(!oldest)} type='checkbox' />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dash