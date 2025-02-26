'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "./components/ui"
import { Button } from "./components/buttons"

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [currentView, setCurrentView] = useState('news')
  const [title, setTitle] = useState('Noticias y Eventos')

  const rotateScreen = async () => {
    try {
      // Request full-screen mode on button press (required for orientation lock on mobile)
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      // Lock orientation to landscape
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock("landscape");
      }
    } catch (error) {
      console.error("Error attempting to lock orientation:", error);
    }
  };

  useEffect(() => {
    const enableFullScreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.error("Error enabling fullscreen mode:", error);
      }
    };
    enableFullScreen();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (currentView === 'news') {
      setTitle('Noticias y Eventos')
    }
    if (currentView === 'notifications') {
      setTitle('Notificaciones')
    }
    if (currentView === 'card') {
      setTitle('Carné Virtual')  
    }
  }, [currentView])

  const handleMenuClick = () => {
    setShowMenu(!showMenu)
  }

  const handleMenuItemClick = (view) => {
    if(view === 'card') rotateScreen()
      
    setCurrentView(view)
    setShowMenu(false)
  }

  const renderView = () => {
    switch (currentView) {
      case 'news':
        return <NewsView />
      case 'card':
        return <CardView />
      default:
        return <NewsView />
    }
  }

  return (
    <div className="min-h-screen w-full bg-blue-900 flex flex-col p-0 m-0">
      {showSplash ? (
        <div className="p-0 m-0 h-full w-full">
          <div className="h-full w-full">
            <img
              src="img/splash.jpg"
              alt="Splash Screen Logo"
              width={200}
              height={200}
              className="w-full h-screen p-0 m-0"
            />
          </div>
        </div>
      ) : (
        <>
          <header className="bg-blue-800 text-center text-white p-4">
            <h1 className="text-2xl font-bold">{title}</h1>
          </header>

          <main className="bg-[#1e1e1e] flex-grow overflow-y-auto">
            {renderView()}
          </main>

          <div className="fixed bottom-4 left-2 z-10">
            <Button
              variant=""
              size="icon"
              className="rounded-full border-none w-16 h-16 text-white p-2 bg-[#1b1b1b]"
              onClick={handleMenuClick}
            >
              <img className='w-full' src="img/menu.png" alt="" />
            </Button>
          </div>

          {showMenu && (
            <div className="fixed h-36 w-36 left-0 bottom-0 space-y-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full text-white absolute top-0 left-5 p-2 bg-[#1b1b1b]"
                onClick={() => handleMenuItemClick('news')}
              >
                <img className='w-full' src="img/icon1.png" alt="" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full text-white absolute top-2 left-16 p-2 bg-[#1b1b1b]"
                onClick={() => handleMenuItemClick('notifications')}
              >
                <img className='w-full' src="img/icon2.png" alt="" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full text-white absolute top-10 left-24 p-2 bg-[#1b1b1b]"
                onClick={() => handleMenuItemClick('card')}
              >
                <img className='w-full' src="img/icon3.png" alt="" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full text-white absolute bottom-[7px] right-[0px] p-2 bg-[#1b1b1b]"
                onClick={() => handleMenuItemClick('card')}
              >
                <img className='w-full' src="img/icon4.png" alt="" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function NewsView() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="bg-yellow-800 text-white text-center p-2">
            <h2 className="font-bold">Noticias</h2>
          </div>
          <div className="space-y-2 bg-[#1e1e1e]">
            <div>
              <h3 className="bg-[#282626] py-2 px-1 font-medium text-[#75726f] text-sm">Música, arte y reflexión sobre la biodiversidad</h3>
              <img
                src="img/image1.png"
                alt="COP16 en la Javeriana"
                width={400}
                height={200}
                className="w-full h-auto"
              />
              <p className="text-sm bg-[#282626] text-[#75726f]">Edición: Oct 16, 2024</p>
            </div>
            <div>
              <h3 className="bg-[#282626] py-2 px-1 font-medium text-[#75726f] text-sm">La Javeriana gestiona el 100% de los residuos generados en el campus</h3>
              <img
                src="img/image2.png"
                alt="Gestión de residuos"
                width={400}
                height={200}
                className="w-full h-auto"
              />
              <p className="text-sm bg-[#282626] text-[#75726f]">Edición: Oct 22, 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CardView() {
  const [dateTime, setDateTime] = useState("");
  const [hour, setHour] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      })}`;
      const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
      setDateTime(`${formattedDate}`);
      setHour(`${formattedTime}`);
    };

    // Initial call to set date and time
    updateDateTime();
    
    // Update every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto relative">
        <CardContent className="p-0">
          <img src="img/carne.png" alt="" />
          <img className='absolute w-1/5 h-[50%] bottom-[23%] right-[10%]' src="img/foto.png" alt="" />
          <div className="absolute top-[12%] right-[15%] animate-colorAndMove text-[#b09428] text-center font-bold leading-3"><small>{dateTime} <br /> {hour}</small></div>
        </CardContent>
      </Card>
    </div>
  )
}