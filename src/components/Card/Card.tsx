import Image from "next/image";
import Button from "../Button";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";

interface CardProps {
  description: string;
  price: number;
  srcImg: string;
  title: string;
  url: string;
}

export default function Card({
  description,
  price,
  srcImg,
  title,
  url,
}: CardProps) {
  return (
    <div className="flex flex-col   w-[298.8px] md:w-[332px] lg:w-[360px] h-[431.1px] md:h-[479px] lg:h-[519px] shadow-2xl">
      <span className="w-full  h-[286.65px]  md:h-[318.28px] lg:h-[346px] bg-[#EFF2F9] ">
        <Image
          alt={title}
          className="object-cover w-full h-full "
          height={346}
          quality={10}
          src={srcImg}
          width={360}
        />
        <span className="flex flex-col space-y-1  w-full h-[144.45px] md:h-[160.72px]  lg:h-[173px] py-[13.21px] px-[19.81px] md:py-[14.67px] md:px-[22.01px] lg:py-4 lg:px-6">
          <span className="flex items-center justify-between w-full ">
            <h1 className=" w-[202.58px] md:w-[224.64px] lg:w-[243px]  font-bold text-[19.81px] md:text-[22.01px]  lg:text-2xl truncate">
              {title}
            </h1>
            <h2 className="font-semibold text-[#8F909A] text-[14.56px] md:text-[16.51px]  lg:text-[18px] w-[50px] md:w-[56px] lg:w-[61px]  truncate">
              ${price.toLocaleString("ve")}
            </h2>
          </span>
          <p className="text-[#8F909A] w-full h-[52px] text-[13.21px] md:text-[14.67px] lg:text-[16px] truncate">
            {description}
          </p>

          <Link href={url} className="md:hidden self-start" target="_blank">
            <Button
              size="small"
              variant="text"
              rightIcon={<IoArrowForward size={14} />}
              text="Ver completo"
              removePadding
            />
          </Link>
          <Link
            href={url}
            className="hidden md:inline lg:hidden self-start"
            target="_blank"
          >
            <Button
              size="medium"
              variant="text"
              rightIcon={<IoArrowForward size={14} />}
              text="Ver completo"
              removePadding
            />
          </Link>
          <Link
            href={url}
            className="hidden lg:inline self-start"
            target="_blank"
          >
            <Button
              size="large"
              variant="text"
              rightIcon={<IoArrowForward size={14} />}
              text="Ver completo"
              removePadding
            />
          </Link>
        </span>
      </span>
    </div>
  );
}
