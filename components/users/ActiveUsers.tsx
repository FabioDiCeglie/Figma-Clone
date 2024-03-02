import { useOthers, useSelf } from '@/liveblocks.config';
import Avatar from './Avatar';

import styles from './index.module.css'

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <main className='flex h-screen w-full select-none place-content-center place-items-center'>
      <div className='flex pl-3'>
        {/* All users */}
        {users.slice(0, 3).map(({ connectionId, info }) => {
          return (
            <Avatar key={connectionId} src={info.avatar} name={info.name} />
          );
        })}

        {/* More users */}
        {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}

        {/* Me */}
        {currentUser && (
          <div className='relative ml-8 first:ml-0'>
            <Avatar src={currentUser.info.avatar} name='You' />
          </div>
        )}
      </div>
    </main>
  );
};

export default ActiveUsers;
