"use client";

import React from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

type MenuItem = { id: string; label: string; href: string };

type Props = {
  currentUser: User | null;
  profileMenuItems: MenuItem[];
  handleSignOut: () => void;
};

export default function AccountDetails({ currentUser, profileMenuItems, handleSignOut }: Props) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#b36619]/10 flex items-center justify-center text-[#b36619] font-semibold">
          {(currentUser?.email || "").charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-xs text-[#211911]/60">Signed in as</p>
          <p className="font-medium text-[#211911] truncate max-w-[200px]">{currentUser?.email}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-3 border-t border-[#211911]/6 pt-4">
        {profileMenuItems.map((item) => (
          <Link key={item.id} href={item.href} className="text-[#211911] hover:text-[#b36619] font-medium">
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6">
        <button onClick={handleSignOut} className="w-full px-4 py-3 bg-[#e6e6e6] text-[#211911] font-semibold rounded-md hover:bg-[#dcdcdc] transition-colors">Sign Out</button>
      </div>
    </div>
  );
}
