import styles from './Avatar.module.css';

const IMAGE_SIZE = 48;

type Props = {
  src: string;
  name: string;
};

const Avatar = ({ src, name }: Props) => {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <img
        src={src}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        className={styles.avatar_picture}
      />
    </div>
  );
};

export default Avatar;
