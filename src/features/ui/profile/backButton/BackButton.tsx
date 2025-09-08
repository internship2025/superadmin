import Image from "next/image";
import Link from "next/link";
import s from './BackButton.module.css'

export const BackButton = () => {
  return (
      <Link className={s.wrapper} href="/users-list">
        <Image
          src="/icons/arrow-back.svg"
          alt="arrow back"
          width={16}
          height={14}
        />
        <span className={s.text}>Back to Users List</span>
      </Link>
  );
};
