import React from 'react'
import AlunosCard from './AlunosCard'
import avatar from '../../../assets/avatar-15.png'

function MainContent() {
  return (
    <div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <p className='text-2xl text-gray-700 font-bold'>Simulação</p>
             <div className='border-t border-gray-200 mt-8 pt-8 text-center px-4'></div>
            <p className='text-2xl text-gray-700 font-bold'>Sobre</p>
             <div className='border-t border-gray-200 mt-8 pt-8 text-center px-4'></div>
            <p className='text-2xl text-gray-700 font-bold'>Alunos</p>
            <p className='text-xl text-gray-600 font-normal'>responsáveis por realizar o projeto Portal da Transparência do Transporte</p>
            <div className='flex flex-col items-center gap-6 lg:flex-row'>
              <AlunosCard name={"Fabricio"} picture={avatar}/>
              <AlunosCard name={"Miguel"} picture={avatar}/>
              <AlunosCard name={"Vinicius"} picture={avatar}/>
              <AlunosCard name={"Vitor"} picture={avatar}/>
              <AlunosCard name={"Ygor"} picture={avatar}/>
            </div>
        </div>
    </div>
  )
}

export default MainContent