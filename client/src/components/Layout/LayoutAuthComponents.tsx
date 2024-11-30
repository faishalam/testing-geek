import Image from "next/image";

export default function LayoutAuthComponents({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="max-w-full w-full bg-white flex min-h-screen">
        <section className="max-w-full w-full flex flex-col justify-center items-center">
          <Image
            src={"/assets/logoGreen.png"}
            alt="logo"
            className="w-full max-w-xs object-cover"
            width={400}
            height={400}
          />
          {children}
        </section>

        <section className="hidden md:block md:relative md:max-w-full md:w-full ">
          <Image
            src="/assets/kpp-home-banner.png"
            alt="image"
            width={1000}
            height={1000}
            className="w-full max-w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </section>
      </div>
    </>
  );
}
