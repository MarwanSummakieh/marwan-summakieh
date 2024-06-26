import Footer from '@/components/Footer'
import ProjectsGrid from '@/components/ProjectsGrid'
import { FloatingNav } from '@/components/ui/FLoatingNavBar'
import React from 'react'

const page = () => {
  return (
    <><div className='relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10'>
      <FloatingNav navItems={[
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Chat",
          link: "/chat",
        },
        {
          name: "Projects",
          link: "/projects",
        },
      ]} />
      <ProjectsGrid />

    </div><Footer /></>
  )
}

export default page