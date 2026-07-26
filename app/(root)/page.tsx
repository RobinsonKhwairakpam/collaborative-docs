import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import Header from '@/components/Header'
import Notifications from '@/components/Notifications';
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Home = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0 z-50">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn 
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li key={id} className="document-list-item">
                <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4 group">
                  <div className="hidden rounded-lg bg-pink-50 border border-pink-100 p-2.5 sm:block shadow-sm group-hover:bg-pink-100 transition-colors">
                    <Image 
                      src="/assets/icons/doc.svg"
                      alt="file"
                      width={36}
                      height={36}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg font-semibold text-slate-800 group-hover:text-pink-600 transition-colors">{metadata.title}</p>
                    <p className="text-sm font-normal text-slate-500">Created about {dateConverter(createdAt)}</p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ): (
        <div className="document-list-empty">
          <div className="p-4 rounded-full bg-pink-50 border border-pink-100 shadow-sm">
            <Image 
              src="/assets/icons/doc.svg"
              alt="Document"
              width={48}
              height={48}
              className="mx-auto"
            />
          </div>

          <p className="text-slate-600 font-medium text-center">No documents found. Start creating your first project!</p>

          <AddDocumentBtn 
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  )
}

export default Home