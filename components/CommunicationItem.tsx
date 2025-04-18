import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CommunicationItemProps {
  sender: string
  time: string
  message: string
  avatar: string
  unread?: boolean
}

const CommunicationItem = ({
  sender,
  time,
  message,
  avatar,
  unread = false,
}: CommunicationItemProps) => {
  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-slate-800/50 rounded-lg transition-colors">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} alt={sender} />
        <AvatarFallback>{sender.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-200">{sender}</div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1">{message}</div>
      </div>
      {unread && (
        <div className="h-2 w-2 rounded-full bg-blue-500 mt-1" />
      )}
    </div>
  )
}

export default CommunicationItem 