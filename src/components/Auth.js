import {useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setUser} from '../ducks/authReducer'

const Auth = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleRegister = () => {
        axios.post('/auth/register', {username, password})
        .then((res) => {
            console.log(res.data)
            dispatch(setUser(res.data))
            props.history.push('/home')
        })
        .catch((err) => console.log(err))
    }
    const handleLogin = () => {
        axios.post('/auth/login', {username, password})
        .then((res) => {
            console.log(res.data)
            dispatch(setUser(res.data))
            props.history.push('/home')
        })
        .catch((err) => console.log(err))
    }
    return(
        <div>
            <h1>Auto Builds</h1>
            <div>
                <p>Username:</p>
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <p>Password:</p>
                <input value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    )
}


export default Auth