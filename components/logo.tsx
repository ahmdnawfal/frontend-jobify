import LogoImage from '@/assets/images/logo.svg';
import Image from 'next/image';

export default function Logo() {
  return (
    <div>
      <Image src={LogoImage} alt='logo' width={100} height={100} />
    </div>
  );
}
