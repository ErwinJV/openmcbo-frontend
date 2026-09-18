// components/ProductShowcase.tsx
import ProductGallery from "../ProductGallery";
import ProductDetails from "../ProductDetails";
import { MdStraighten } from "react-icons/md";

const galleryImages = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoUZ2qQHdA7FBJ0_J81R2AixGxCTVG3wuW_sSE56tCsXUw_U9m7Bm8i7fGuGSTAoLD5TGucxDs0MnXr3av2wphrYBeaTEz4fTkto-IlPepxNvsikQ0fDPiif6JBd1HYmKqQEN_9UHO_q1wSz-VbkbincZdLSQpl4DoLmgEnmOlTiKC46bSVvNEcbVG3nZ6oMDptMYDNKew_VJOugmcl7AuYcZHL-p_ucY3lBMFs9Tp8Yg5mWlV_7AlyQ",
    alt: "Porcelanato Statuario Aspair - Vista de superficie",
    label: "Superficie",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZMqzKoDO1reLlb_A-7mPNJJr2YvkB_nKoZhJMZ7Xpu9s2RF1tPD8lc90Ek_gGQP0JKmoa8XsmmmXawTY_ObZUIRSqc5jZOfZxJ9HZJy20rwRvwhjYEROdIGUBVff0Eh2vSb40dQKs7CyrqoFCV_yk15V6sX41H1bkqO1qUBQBwl5QC8TLeikrioTTet1rpwGFRGZaduktKmTnK3ALen4mZsgJJ3H0hIC3iO2j3fGU-D2g0RLqjkdsrw",
    alt: "Ambiente Sala",
    label: "Sala",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKvLWM2pSylusKvIxtprGSEETOCySqiXCZelCAEvEovZzjqqvcIdpRBwZ8jgtQpB61Sue3x5SFAV6J7YUcCSNoT5uQdKZExavYGsPklYOJvEn976KgvD7YthX_2vYol1nWIWOhaU3lHv3V-1NrmccOP9xAx285jJaHyWpFxOrCuJEycuLlnRKX6xkO964HPyEG_pfWWw82sX2xmtEqyqOA7nAYE9z5jS-liP63y_TejBIHCqZ0kEE45Q",
    alt: "Ambiente Baño",
    label: "Baño",
  },
];

const specs = [
  { icon: <MdStraighten />, label: "Formato / Size", value: "600 x 1200 mm" },
];

export default function ProductShowcase() {
  return (
    <main className="flex-grow flex flex-col justify-center py-8 lg:py-12">
      <div className="max-w-[1320px] w-full mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <ProductGallery images={galleryImages} />
          <ProductDetails
            brand="TUBRICA"
            category="Porcelanato Esmaltado"
            title="Statuario Aspair"
            specs={specs}
            storeUrl="https://tubrica.com"
          />
        </div>
      </div>
    </main>
  );
}
