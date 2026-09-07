import Image from "next/image";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io5";

interface ProviderInfoProps {
  tenantName: string | null;
  tenantLogo?: string | null;
  productName: string;
  tenantWebsite?: string | null;
}

export default function ProviderInfo({
  tenantName,
  tenantLogo,
  productName,
  tenantWebsite,
}: ProviderInfoProps) {
  const hasTenant = !!tenantName;

  const whatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en el producto "${productName}"${hasTenant ? ` de ${tenantName}` : ""}. ¿Podrían darme más información?`
  );

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-sm uppercase tracking-wide text-[#8F909A] mb-4">
        Vendedor
      </h3>

      {hasTenant ? (
        <>
          <div className="flex items-center gap-4 mb-6">
            {tenantLogo ? (
              <Image
                src={tenantLogo}
                alt={tenantName}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-[60px] h-[60px] rounded-full bg-[#D9A300] flex items-center justify-center text-white text-2xl font-bold">
                {tenantName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h4 className="font-semibold text-[#0D263B] text-lg">{tenantName}</h4>
              <span className="text-[#D9A300] text-sm font-medium flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-[#D9A300] rounded-full"></span>
                Tienda Verificada
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#1ebe57] transition-colors"
            >
              <IoLogoWhatsapp size={20} />
              Contactar por WhatsApp
            </a>

            {tenantWebsite && (
              <Link
                href={tenantWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white border-2 border-[#003593] text-[#003593] py-3 rounded-lg font-semibold text-center hover:bg-[#003593] hover:text-white transition-colors"
              >
                Visitar tienda
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-4">
          <p className="text-[#8F909A] mb-4">
            Información del vendedor no disponible en este momento.
          </p>
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#1ebe57] transition-colors"
          >
            <IoLogoWhatsapp size={20} />
            Contactar por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
