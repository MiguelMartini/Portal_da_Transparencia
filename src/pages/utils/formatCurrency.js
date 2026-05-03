//formata valores monetarios 
export const formatCurrency = (value) => {
  if (value == null) return "";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};