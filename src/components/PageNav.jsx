// import React from 'react'

import { NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "./Logo"


const PageNav = () => {
  return (
    <nav className= {styles.nav}>

        <Logo/>
        <ul>
            {/* <li>
                <NavLink to= '/'>Home</NavLink>
            </li> */}
            <li>
                <NavLink to= '/pricing'>Product</NavLink>
            </li>
            <li>
                <NavLink to= '/product'>Pricing</NavLink>
            </li>
            <li>
                <NavLink to= '/login' className={styles.ctaLink}>Login</NavLink>
            </li>
        </ul>

    </nav>
  )
}

export default PageNav