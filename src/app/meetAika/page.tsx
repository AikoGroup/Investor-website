import ChatInterface from '@/components/chat/ChatInterface';
import { requireSession } from '@/lib/session';

export default async function ChatPage() {
  // This will automatically redirect to login if not authenticated
  await requireSession();
  
  return <ChatInterface />;
}
