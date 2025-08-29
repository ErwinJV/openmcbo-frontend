// Variable para almacenar el estado previo del padding-right del body
let originalBodyPadding = "";
let originalBodyOverflow = "";

// Función para activar/desactivar el scroll
export const toggleScroll = (enableScroll: boolean): void => {
  if (enableScroll) {
    // Reactivar el scroll: restaurar estilos originales
    document.body.style.overflow = originalBodyOverflow;
    document.body.style.paddingRight = originalBodyPadding;
    console.log({ enableScroll });
  } else {
    // Desactivar el scroll: guardar estilo actual y ocultar scroll
    originalBodyOverflow = document.body.style.overflow;
    originalBodyPadding = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
};
