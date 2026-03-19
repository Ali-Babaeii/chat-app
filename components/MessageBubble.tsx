import { Message } from "@/types";
import { formatDate } from "@/lib/format";
import { CURRENT_USER } from "@/hooks/useChat";

export default function MessageBubble({ msg }: { msg: Message }) {
    const isOwn = msg.author === CURRENT_USER;

    return (
        <div className={`flex mb-3 ${isOwn ? "justify-end" : "justify-start"}`}>
            <div
                className={`mx-[30px] my-[20px] px-[15px] rounded-[10]
          ${isOwn
                        ? "bg-[#d3fdd4]  max-w-[60%]"
                        : "bg-red-500 border max-w-[45%] min-w-[180px] bg-[#fff]"
                    }
        `}
            >
                {!isOwn && (
                    <p className="text-[12px] text-[#abaebc]">
                        {msg.author}
                    </p>
                )}
                <p className={`text-[16px] font-bold leading-snug  ${isOwn ? "text-[#2d3142]" : "text-white"}`}>
                    {msg.message}
                </p>
                <p className={`text-[11px] text-[#abaebc] mt-1.5 m-0 ${isOwn ? " text-right" : "text-left"}`}>
                    {formatDate(msg.createdAt)}
                </p>
            </div>
        </div>
    );
}