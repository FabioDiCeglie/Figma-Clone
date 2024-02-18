import LiveCursor from "@/components/cursor/LiveCursor";
import {useOther} from "@/liveblocks.config";

const Live = () => {
    const others = useOther()
    return (
        <div>
            <LiveCursor others={others}/>
        </div>
    )
}

export default Live;