import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/pegasustour-travel-platform-logo.png"
        alt="Pegasustour travel platform"
        width={1330}
        height={1183}
        className="h-12 w-40 rounded-sm bg-black object-cover object-center md:h-14 md:w-48"
        priority
      />
    </Link>
  );
}
