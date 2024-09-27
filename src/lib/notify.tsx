import { toast } from 'sonner';

const NOTIFY = {
    info: (msg: string) => toast.info(msg),
    warn: (msg: string) => toast.warning(msg),
    error: (msg: string) => {
        return toast.error(msg);
    },
};

export default NOTIFY;
