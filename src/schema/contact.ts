const PHONE_NUMBER = "584246386030";

const DEFAULT_MESSAGE_BUY = `Hola, estoy interesado en comprar una propiedad. ¿Podrían brindarme más información?`;

export const WHATSAPP_URL_BUY = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
  DEFAULT_MESSAGE_BUY,
)}`;

const DEFAULT_MESSAGE_RENT = `Hola, estoy interesado en alquilar una propiedad. ¿Podrían brindarme más información?`;

export const WHATSAPP_URL_RENT = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
  DEFAULT_MESSAGE_RENT,
)}`;

const DEFAULT_MESSAGE_SELL = `Hola, estoy interesado en vender una propiedad. ¿Podrían brindarme más información?`;

export const WHATSAPP_URL_SELL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
  DEFAULT_MESSAGE_SELL,
)}`;

export const customMessagesByProperty = (title: string) => {
  const message = `Hola, estoy interesado en la propiedad "${title}". ¿Podrían brindarme más información?`;

  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
};
