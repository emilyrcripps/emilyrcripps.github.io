import React, { useState } from 'react'
import logo from './logo-small.png'
import * as styles from './header.module.scss'
import styled from 'styled-components'
import { Link } from 'gatsby'

const MenuIcon = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 200;

  position: absolute;
  top: 30px;
  right: 50px;

  div {
    width: 1.5rem;
    height: 0.22rem;
    background-color: #FFF;
    border-radius: 5px;
    transform-origin: 1px;

    :first-child {
      transition: transform 300ms;
      transform: ${({nav}) => nav ? "rotate(45deg)" : "rotate(0deg)"}
    }

    :nth-child(2) {
      transition: opacity 300ms;
      opacity: ${({nav}) => nav ? "0" : "1"}
    }

    :nth-child(3) {
      transition: transform 300ms;
      transform: ${({nav}) => nav ? "rotate(-45deg)" : "rotate(0deg)"}
    }
  }
`

const MenuLinks = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  background: #5fc0c5;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  transition: transform 300ms;
  transform: ${({nav}) => nav ? "translateX(0)" : "translateX(100%)"};

  @media screen and (max-width: 575px) {
    width: 100vw;
  }
  @media screen and (min-width: 576px) {
    width: 390px;
  }

  ul {
    list-style-type:none;
  }

  li {
    margin-top: 1rem;
  }

  a {
    text-decoration: none;
    color: #000;
    font-size: 1.5rem;
    transition: color 300ms;

    :hover {
      color: #FFF;
    }
  }
`

const LogoImg = styled.img`
  width: 354px;
  height: 354px;
  margin-left:auto;
  margin-right:auto;
  transition: opacity 700ms;
  opacity: ${({isLogoAnimated}) => isLogoAnimated ? "1" : "0"}
`

const LogoCopy = styled.span`
    @media (max-width: 575px) {
      position: relative;
      top:-12%;
    }

    @media (min-width: 576px) {
      position: absolute;
      bottom: 80px;
      right: -145px;
    }

  transition: opacity 700ms;
  opacity: ${({isLogoCopyAnimated}) => isLogoCopyAnimated ? "1" : "0"}
`

const Header = () => {

  const [nav, showNav] = useState(false);

  const [isLogoAnimated, animateLogo] = useState(sessionStorage.getItem( 'isLogoAnimated' ) || false);

  if (!isLogoAnimated || isLogoAnimated === false) {
    setTimeout(function() {
      animateLogo(true);
      sessionStorage.setItem('isLogoAnimated', true );
    }, 600)
  }

  const [isLogoCopyAnimated, animateLogoCopy] = useState(sessionStorage.getItem( 'isLogoCopyAnimated' ) || false);

  if (!isLogoCopyAnimated || isLogoCopyAnimated === false) {
    setTimeout(function() {
      animateLogoCopy(true);
      sessionStorage.setItem('isLogoCopyAnimated', true );
    }, 1000)
  }

  return (
    <div className={styles.erdHeader}>
      <div className="container">
        <div className={styles.erdLogoWrapper}>
          <div className={styles.erdLogoContainer}>
              <Link to="/">
                <LogoImg isLogoAnimated={isLogoAnimated}
                    alt="Emily-Rose Design"
                    src={logo}
                />
              </Link>
              <LogoCopy isLogoCopyAnimated={isLogoCopyAnimated}>Graphic Design and Illustration</LogoCopy>
          </div>

        </div>
        <MenuIcon nav={nav} onClick={() => showNav(!nav)}>
            <div />
            <div />
            <div />
          </MenuIcon>
        <MenuLinks nav={nav}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </MenuLinks>
      </div>
    </div>
  )
}

export default Header