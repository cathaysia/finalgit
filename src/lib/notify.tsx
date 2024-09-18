import { toast } from "sonner";
import { MdError, MdWarning } from "react-icons/md";
import { DEFAULT_STYLE } from "./style";

enum NotifyLevel {
    Info = 0,
    Warning = 1,
    Error = 2,
}

function to_string(level: NotifyLevel, msg: string) {
    if (level === NotifyLevel.Info) {
        return (
            <div className="text-green-50">
                <MdError className="text-blue-500 pr-2 w-8 h-8" />
                <span className={DEFAULT_STYLE}>{msg}</span>
            </div>
        );
    }
    if (level === NotifyLevel.Warning) {
        return (
            <div>
                <MdWarning className="text-yellow-500 pr-2 w-8 h-8" />
                <span className={DEFAULT_STYLE}>{msg}</span>
            </div>
        );
    }
    if (level === NotifyLevel.Error) {
        return (
            <div>
                <MdError className="text-red-500 pr-2 w-8 h-8" />
                <span className={DEFAULT_STYLE}>{msg}</span>
            </div>
        );
    }

    return <div />;
}

function notify(level: NotifyLevel, msg: string) {
    toast(to_string(level, msg));
}

const NOTIFY = {
    info: (msg: string) => notify(NotifyLevel.Info, msg),
    warn: (msg: string) => notify(NotifyLevel.Warning, msg),
    error: (msg: string) => notify(NotifyLevel.Error, msg),
};

export default NOTIFY;
