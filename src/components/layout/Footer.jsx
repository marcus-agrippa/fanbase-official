import React from 'react'
import { SiBuymeacoffee } from 'react-icons/si'

const Footer = () => {
  const footerYear = new Date().getFullYear()

  return (
    <footer className='footer p-10 bg-gray-700 text-primary-content footer-center'>
      <div>
        <p>Copyright &copy; {footerYear} All rights reserved</p>
       <a href="https://www.buymeacoffee.com/clubfanbase"><SiBuymeacoffee className='inline pr-2 text-5xl'/> Buy Me A Coffee</a> 
      </div>
    </footer>
  )
}

export default Footer