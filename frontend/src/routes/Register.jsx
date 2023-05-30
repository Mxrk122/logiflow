import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'
import { UserContext } from '../providers/UserProvider'
import '../scss/Register.scss'; 
import { Link } from 'react-router-dom';

const Register = () => {
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [gender, setGender] = useState("")
    const [phone, setPhone] = useState()

    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)

    const handleRegister = async () => {
        if (
            firstname &&
            lastname &&
            username &&
            password &&
            phone &&
            (gender === "Male" || gender === "Female")
        ) {
            console.log("firstname: "+ firstname)
            console.log("lastname: "+ lastname)
            console.log("username: " + username)
            console.log("password: "+ password)
            console.log("gender: " + gender)
            console.log("phone: "+phone)
        } else {
            console.log("error faltan datos")
        }

        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${username}/${password}`)
        // if (response.data) {
        // console.log(response.data)
        // setUser(response.data)
        // navigate('/')
        // } else {
        // alert('User not found.')
        // }
    }

    return (
        <div className='register-container'>
            <h1>Register</h1>
            <form className='register-form'>
                <div className='form-group'>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                    /> 
                </div>
                <div className='form-group'>
                    <input
                        type="lastName"
                        placeholder="Last Name"
                        onChange={(event) => setLastname(event.target.value)}
                    /> 
                </div>
                <div className='form-group'>
                    <p>Gender: 
                        <select
                            value={gender}
                            onChange={(event) => setGender(event.target.value)}
                        >
                            {gender === "" ?(
                                <>
                                    <option value="">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </>
                            ): (
                                <>
                                    <option value={gender}>{gender}</option>
                                    {gender === 'Male' ? (
                                    <option value="Female">Female</option>
                                    ) : (
                                    <option value="Male">Male</option>
                                    )}
                                </>
                            )}
                        </select>
                    </p>
                </div>
                <div className='form-group'>
                    <input
                        type="phone"
                        placeholder="Phone number"
                        onChange={(event) => setPhone(event.target.value)}
                    /> 
                </div>
                <div className='form-group'>
                    <input
                        type="user"
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                    /> 
                </div>
                <div className='form-group'>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <div className="button-group">
                        <Button
                        text="Send"
                        onClick={handleRegister}
                        />
                        <Link to="/login">
                            <Button
                                text="Login"
                            />
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
