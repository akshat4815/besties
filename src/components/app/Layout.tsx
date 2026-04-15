import { Link, Outlet, useLocation } from "react-router-dom"
import Avatar from "../shared/Avatar"
import Card from "../shared/Card"
import { useState } from "react"
import Button from "../shared/Button"
import Dashboard from "./Dashboard"

const Layout = () => {
    const [leftAsideSize, setLeftAsideSize] = useState(350)
    const rightAsideSize = 450
    const collapseSize = 140
    const {pathname} = useLocation()

    const menus = [
        {
            icon: "ri-home-9-line",
            href: "/app/dashboard",
            label: "dashboard"
        },
        {
            icon: "ri-chat-smile-3-line",
            href: "/app/my-posts",
            label: "my posts"
        },
        {
            icon: "ri-group-line",
            href: "/app/friends",
            label: "friends"
        }
    ]

    const getPathname = (path: string)=>{
        const firstPath = path.split("/").pop()
        const finalPath = firstPath?.split("-").join(" ")
        return finalPath
    }

    return (
        <div className="min-h-screen">
            <aside 
                className="bg-white fixed top-0 left-0 h-full p-8 overflow-auto" 
                style={{
                    width: leftAsideSize,
                    transition: '0.2s'
                }}>
                <div className="space-y-8 h-full rounded-2xl p-8 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900">
                        {
                            leftAsideSize === collapseSize ?
                            <i className="ri-user-fill text-xl text-white animate__animated animate__fadeIn"></i>
                            :
                            <div className="animate__animated animate__fadeIn">
                                <Avatar 
                                    title="Akshat Chaturvedi"
                                    subtitle="Fullstack"
                                    image="/images/avt.avif"
                                    titleColor="white"
                                    subtitleColor="#ddd"
                                />
                            </div>
                        }
                        <div>
                            
                            {
                                menus.map((item, index)=>(
                                    <Link key={index} to={item.href} className="flex items-center gap-4 text-gray-300 py-3 hover:text-white">
                                        <i className={`${item.icon} text-xl`} title={item.label}></i>
                                        <label className={`capitalize ${leftAsideSize === collapseSize ? 'hidden' : ''}`}>{item.label}</label>
                                    </Link>
                                ))
                            }

                            <button className="flex items-center gap-2 text-gray-300 py-3 hover:text-white" title="Logout">
                                <i className="ri-logout-circle-r-line text-xl"></i>
                                <label className={leftAsideSize === collapseSize ? 'hidden' : ''}>Logout</label>
                            </button>

                        </div>
                </div>
            </aside>
            
            <section 
                className="py-8 px-1" 
                style={{
                    width: `calc(100% - ${leftAsideSize+rightAsideSize}px)`,
                    marginLeft: leftAsideSize,
                    transition: '0.2s'
                }}
            >
                <Card 
                    title={
                        <div className="flex gap-4 items-center">
                            <button className="bg-gray-100 w-10 h-10 rounded-full hover:bg-slate-200" onClick={()=>setLeftAsideSize(leftAsideSize === 350 ? collapseSize : 350)}>
                                <i className="ri-arrow-left-line"></i>
                            </button>
                            <h1>{getPathname(pathname)}</h1>
                        </div>
                    } 
                    divider
                >
                    {
                        pathname === "/app" ?
                        <Dashboard />
                        :
                        <Outlet />
                    }
                </Card>
            </section>

            <aside 
                className="bg-white fixed top-0 right-0 h-full p-8 overflow-auto space-y-8" 
                style={{
                    width: rightAsideSize,
                    transition: '0.2s'
                }}>
                <div className="h-[250px] overflow-auto">
                    <Card title="Suggested" divider>
                        <div className="space-y-8">
                            {
                                Array(20).fill(0).map((item, index)=>(
                                    <div key={index} className="flex gap-4">
                                        <img src="/images/avt.avif" alt="avf" className="w-16 h-16 rounded object-cover" />
                                        <div>
                                            <h1 className="text-black font-medium">Ravi Kumar</h1>
                                            <button className="font-medium bg-green-400 text-white rounded px-2 py-1 text-xs hover:bg-green-500 mt-1">
                                                <i className="ri-user-add-line mr-1"></i>
                                                Add Friend
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Card>
                </div>
                <Card title="Friends" divider>
                <div className="space-y-5">
                    {
                        Array(20).fill(0).map((item, index)=>(
                            <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between">
                                <Avatar 
                                    size="md"
                                    image="/images/avt.avif"
                                    title="Akshat Chaturvedi"
                                    subtitle={
                                        <small className={`${index % 2 === 0 ? 'text-zinc-400' : 'text-green-400'} font-medium`}>
                                            {index % 2 === 0 ? "Offline" : "Online"}
                                        </small>
                                    }
                                />
                                <div className="space-x-3">
                                    <Link to="/app/chat">
                                        <button className="hover:text-blue-600 text-blue-500" title="Chat">
                                            <i className="ri-chat-ai-line"></i>
                                        </button>
                                    </Link>
                                    
                                    <Link to="/app/audio-chat">
                                        <button className="hover:text-green-500 text-green-400" title="Call">
                                            <i className="ri-phone-line"></i>
                                        </button>
                                    </Link>

                                    <Link to="/app/video-chat">
                                        <button className="hover:text-amber-600 text-amber-500" title="Video call">
                                            <i className="ri-video-on-ai-line"></i>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
                </Card>
            </aside>

        </div>
    )
}

export default Layout