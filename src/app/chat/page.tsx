import Chat from '@/components/Chat'
import Footer from '@/components/Footer'
import { FloatingNav } from '@/components/ui/FLoatingNavBar'
import React from 'react'

const ChatPage = () => {
  return (
    <><div className='relative bg-black-100 flex items-center flex-col overflow-hidden mx-auto sm:px-10'>
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
      <Chat />

    </div><Footer /></>
  )
}

export default ChatPage