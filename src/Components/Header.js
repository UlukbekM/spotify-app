import React, { useState, useEffect } from "react";
import { CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE, SCOPE } from "./Home";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

export var searchItem = ""

export const Header = () => {
    const [token, setToken] = useState("")
    const [search, setSearch] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        let time = window.localStorage.getItem("time")
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
            const d = new Date();
            let unixTime = d.getTime();
            window.localStorage.setItem("time",unixTime)
            // console.log(hash)
        }
        setToken(token)

        if(time) {
            if(Date.now() >= (parseInt(time)+3600000)) {
                window.localStorage.removeItem("time")
                logout()
            }
        }

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
        window.location = "/";
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
        // console.log(e.target.value)
    }

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!window.location.href.includes("search")) {
            searchItem = search
            navigate('/search');
        }
    }
    

    return(<>
    <header>
        <Box sx={{ flexGrow: 1,
        backgroundColor: '#191414',
        padding: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Link to="/">
                        <div className="tab noselect">Spotify App</div>
                    </Link>
                </Grid>

                {!token ? <>
                <Grid item xs={10}>
                <div></div>
                </Grid>
                <Grid item xs={1}>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
                    <div className="tab noselect">
                        Login
                    </div>
                </a>
                </Grid>
                </>: 
                <>

                {window.location.href.includes("search") ?
                    <Grid item xs={7}>
                        <div/>
                    </Grid>
                :                     
                <Grid item xs={6}>
                    <div/>
                </Grid>}


                {!window.location.href.includes("search") ?
                <Grid item xs={1}>
                    <form className="searchBarForm" onSubmit={handleSubmit}>
                        <input className="searchBar" type="text" placeholder="Search.." onChange={handleChange}/>
                    </form>
                    {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small"/> */}
                </Grid>
                : <></>}

                <Grid item xs={1}>
                    <Link to="/item1">
                        <div className="tab noselect">Item 1</div>
                    </Link>
                </Grid>

                <Grid item xs={1}>
                    <Link to="/item2">
                        <div className="tab noselect">Item 2</div>
                    </Link>
                </Grid>

                <Grid item xs={1}>
                    <Link to="/testing">
                        <div className="tab noselect">Testing</div>
                    </Link>
                </Grid>

                <Grid item xs={1}>
                {!token ?
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                    <div className="tab noselect">
                        Login
                    </div>
                </a>: 
                    <div className="tab noselect" onClick={logout}>Logout</div>}
                </Grid></>}
            </Grid>
        </Box>


    {/* <div className="header">
        <div className="headerItem noselect">
            Spotify App
        </div>
        <div className="headerComponents">
            <div className="headerItem noselect">
                Item 1
            </div>
            <div className="headerItem noselect">
                Item 2
            </div>
            <div className="headerItem noselect">
                Login/Logout
            </div>
        </div>
    </div> */}
    </header>
    </>)
}