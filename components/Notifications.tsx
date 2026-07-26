'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui"
import { useInboxNotifications, useUnreadInboxNotificationsCount } from "@liveblocks/react/suspense"
import Image from "next/image"
import { ReactNode } from "react"

const Notifications = () => {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();

  const unreadNotifications = inboxNotifications.filter((notification) => !notification.readAt);

  return (
    <Popover>
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg bg-pink-50 border border-pink-100 hover:bg-pink-100 transition-colors shadow-sm">
        <Image 
          src="/assets/icons/bell.svg"
          alt="inbox"
          width={20}
          height={20}
        />
        {count > 0 && (
          <div className="absolute right-2 top-2 z-20 size-2.5 rounded-full bg-pink-500 ring-2 ring-white" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="shad-popover border border-pink-100 bg-white shadow-md rounded-lg p-2">
        <LiveblocksUIConfig 
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <>{user} mentioned you.</>
            )
          }}
        >
          <InboxNotificationList>
            {unreadNotifications.length <= 0 && (
              <p className="py-4 text-center text-slate-500 text-sm font-medium">No new notifications</p>
            )}

            {unreadNotifications.length > 0 && unreadNotifications.map((notification) => (
              <InboxNotification 
                key={notification.id}
                inboxNotification={notification}
                className="bg-white text-slate-800 hover:bg-pink-50 transition-colors border-b border-pink-50 last:border-b-0 rounded-md p-2"
                href={`/documents/${notification.roomId}`}
                showActions={false}
                kinds={{
                  thread: (props) => (
                    <InboxNotification.Thread {...props} 
                      showActions={false}
                      showRoomName={false}
                    />
                  ),
                  textMention: (props) => (
                    <InboxNotification.TextMention {...props} 
                      showRoomName={false}
                    />
                  ),
                  $documentAccess: (props) => (
                    <InboxNotification.Custom {...props} title={props.inboxNotification.activities[0].data.title} aside={<InboxNotification.Icon className="bg-transparent">
                      <Image 
                        src={props.inboxNotification.activities[0].data.avatar as string || ''}
                        width={36}
                        height={36}
                        alt="avatar"
                        className="rounded-full"
                      />
                    </InboxNotification.Icon>}>
                      {props.children}
                    </InboxNotification.Custom>
                  )
                }}
              />
            ))}
          </InboxNotificationList>
        </LiveblocksUIConfig>
      </PopoverContent>
    </Popover>
  )
}

export default Notifications