import DocumentDashboard from '@/components/DocumentDashboard';
import Header from '@/components/Header'
import Notifications from '@/components/Notifications';
import { getDocuments } from '@/lib/actions/room.actions';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Home = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);
  const userName = clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() : clerkUser.emailAddresses[0].emailAddress.split('@')[0];

  return (
    <main className="home-container bg-slate-50 min-h-screen">
      <Header className="sticky left-0 top-0 z-50">
        <div className="flex items-center gap-3">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      <DocumentDashboard 
        roomDocuments={roomDocuments.data || []}
        userId={clerkUser.id}
        email={clerkUser.emailAddresses[0].emailAddress}
        userName={userName}
      />
    </main>
  )
}

export default Home