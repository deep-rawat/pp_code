import React from 'react'
import { AdminHeader } from './AdminHeader';
import { Footer } from './Footer';
export const About = () => {
  return (
    <>
    <AdminHeader active="about"/>
    <div className="loading d-none">Loading&#8230;</div>
    <Footer/>
    </>
  )
}
