import Image from 'next/image';
import styles from './Avatar.module.css';

const IMAGE_SIZE = 48;

type Props = {
  name: string;
  otherStyles: string;
};

const Avatar = ({ name, otherStyles }: Props) => {
  return (
    <div
      className={`${styles.avatar} ${otherStyles} h-9 w-9`}
      data-tooltip={name}
    >
      <Image
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(
          Math.random() * 30
        )}.png`}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        className={styles.avatar_picture}
        alt={name}
      />
    </div>
  );
};

export default Avatar;
