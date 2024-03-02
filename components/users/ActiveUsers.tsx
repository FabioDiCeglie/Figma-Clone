import { useOthers, useSelf } from '@/liveblocks.config';
import Avatar from './Avatar';

import styles from './index.module.css';
import { generateRandomName } from '@/lib/utils';

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <main className='flex h-screen w-full select-none place-content-center place-items-center'>
      <div className='flex pl-3'>
        {/* Me */}
        {currentUser && (
          <Avatar name='You' otherStyles='border-[3px] border-prmary-green' />
        )}

        {/* All users */}
        {users.slice(0, 3).map(({ connectionId, info }) => {
          return (
            <Avatar key={connectionId} name={generateRandomName()} otherStyles='ml-3' />
          );
        })}

        {/* More users */}
        {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}
      </div>
    </main>
  );
};

export default ActiveUsers;
