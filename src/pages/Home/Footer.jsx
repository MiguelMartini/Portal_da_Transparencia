
function Footer() {
  return (
    <footer className="bg-gray-600 text-white py-10">
      <div className="max-w-4xl mx-auto text-center space-y-4">

        <div>
          <p className="font-semibold text-lg">Câmpus Lages</p>
          <p className="font-semibold">
            Instituto Federal de Educação, Ciência e Tecnologia de Santa Catarina - IFSC
          </p>
        </div>

        <div className="text-sm space-y-1">
          <p>Rua Heitor Villa Lobos, 222, bairro São Francisco</p>
          <p>CEP: 88506-400 - Lages - SC</p>
          <p>Fone: (49) 3221-4200</p>
        </div>

        <div className="text-xs pt-4">
          <p>
            Copyright © 2022 Instituto Federal de Santa Catarina IFSC
          </p>
          <p>Todos os Direitos Reservados.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;