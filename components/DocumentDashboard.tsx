'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddDocumentBtn from './AddDocumentBtn';
import { DeleteModal } from './DeleteModal';
import { dateConverter } from '@/lib/utils';

interface DocumentDashboardProps {
  roomDocuments: any[];
  userId: string;
  email: string;
  userName: string;
}

export default function DocumentDashboard({ roomDocuments, userId, email, userName }: DocumentDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDocs = roomDocuments.filter((doc) =>
    doc.metadata?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* ================= HERO BANNER ================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 p-6 sm:p-8 text-white shadow-xl shadow-pink-500/10">
        <div className="absolute -right-10 -bottom-10 size-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Real-time Collaboration Ready
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-pink-100 text-sm max-w-lg">
              You have <span className="font-bold text-white">{roomDocuments.length}</span> {roomDocuments.length === 1 ? 'document' : 'documents'} in your workspace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <AddDocumentBtn userId={userId} email={email} />
          </div>
        </div>
      </div>

      {/* ================= DOCUMENT HUB HEADER & CONTROLS ================= */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Your Documents</h2>
            <p className="text-xs text-slate-500">Search and manage your collaborative documents</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-pink-200 bg-white pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl border border-pink-200 bg-white p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                title="Grid View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-pink-100 text-pink-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                title="List View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ================= DOCUMENT LIST / GRID ================= */}
        {filteredDocs.length > 0 ? (
          viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDocs.map(({ id, metadata, createdAt }: any) => (
                <div
                  key={id}
                  className="group relative rounded-xl border border-pink-100 bg-white shadow-md hover:shadow-lg hover:border-pink-300 transition-all flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Gradient Ribbon */}
                  <div className="h-2 bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500" />

                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-pink-50 border border-pink-100 text-pink-600 group-hover:scale-105 transition-transform shadow-sm">
                        <Image
                          src="/assets/icons/doc.svg"
                          alt="file"
                          width={24}
                          height={24}
                        />
                      </div>
                      <DeleteModal roomId={id} />
                    </div>

                    <Link href={`/documents/${id}`} className="block space-y-1">
                      <h3 className="line-clamp-1 text-base font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
                        {metadata.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Created about {dateConverter(createdAt)}
                      </p>
                    </Link>
                  </div>

                  {/* Card Footer */}
                  <div className="border-t border-pink-50 bg-slate-50/50 px-5 py-3 flex items-center justify-between text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1 font-medium text-pink-600">
                      <span className="size-1.5 rounded-full bg-pink-500" />
                      Document
                    </span>
                    <Link href={`/documents/${id}`} className="font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1">
                      Open
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="space-y-3">
              {filteredDocs.map(({ id, metadata, createdAt }: any) => (
                <div
                  key={id}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-pink-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-pink-200 transition-all"
                >
                  <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-pink-50 border border-pink-100 text-pink-600 shadow-sm">
                      <Image
                        src="/assets/icons/doc.svg"
                        alt="file"
                        width={22}
                        height={22}
                      />
                    </div>
                    <div>
                      <h3 className="line-clamp-1 text-base font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
                        {metadata.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Created about {dateConverter(createdAt)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/documents/${id}`}
                      className="rounded-lg bg-pink-50 border border-pink-200 px-3.5 py-1.5 text-xs font-semibold text-pink-600 hover:bg-pink-100 transition-colors"
                    >
                      Open
                    </Link>
                    <DeleteModal roomId={id} />
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* EMPTY STATE */
          <div className="rounded-2xl border border-pink-100 bg-white p-12 text-center shadow-md space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-pink-50 border border-pink-100 text-pink-500 shadow-sm">
              <Image
                src="/assets/icons/doc.svg"
                alt="Document"
                width={36}
                height={36}
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">No documents found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                {searchQuery ? `No documents match "${searchQuery}". Try a different term.` : 'You have no documents yet. Create your first document to get started!'}
              </p>
            </div>
            <div className="pt-2 flex justify-center">
              <AddDocumentBtn userId={userId} email={email} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
