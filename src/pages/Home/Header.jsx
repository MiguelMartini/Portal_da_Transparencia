import React from "react";
import logo from "../../assets/lages_horizontal_marca2015_PNG.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-[#EEF1EC] text-[#3F3F3F]">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-start flex-col gap-6">
            <Link to="/">
                <img src={logo} alt="Logo" className="h-18 w-auto" />
            </Link>
          <span className="font-bold text-xl text-[#3F3F3F] ml-2">
            Portal da Transparência do Transporte
          </span>
        </div>

        <nav>
          <ul className="flex gap-6 font-medium">
            <Link to="/grafo">
              <li className="cursor-pointer text-lg hover:text-gray-500">
                Simulação
              </li>
            </Link>
            <Link to="/">
              <li className="cursor-pointer text-lg hover:text-gray-500">
                Sobre
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
