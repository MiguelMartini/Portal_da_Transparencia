import React from 'react'
import logo from '../../../public/logoIfscLages/lages_horizontal_marca2015_PNG.png'

function Header() {
  return (
    <header className="bg-[#EEF1EC] text-[#3F3F3F]">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

            {/* Logo */}
            <div className="flex items-start flex-col gap-6">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="h-18 w-auto"
                />
                <span className="font-bold text-xl text-[#3F3F3F]">Portal da Transparência do Transporte</span>
            </div>

            {/* Menu */}
            <nav>
                <ul className="flex gap-6 font-medium">
                    <li className="cursor-pointer text-lg text-[#3F3F3F] hover:text-gray-500">Simulação</li>
                    <li className="cursor-pointer text-lg text-[#3F3F3F] hover:text-gray-500">Sobre</li>
                    <li className="cursor-pointer text-lg text-[#3F3F3F] hover:text-gray-500">Alunos</li>
                </ul>
            </nav>

        </div>
    </header>
  )
}

export default Header