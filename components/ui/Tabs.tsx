'use client';

import { ReactNode, useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export default function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="w-full">
      <div className="mb-7 border-b border-[#EADFD2]">
        <div className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-12 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-extrabold transition-colors ${
                activeTab === tab.id
                  ? 'border-[#C62828] text-[#C62828]'
                  : 'border-transparent text-[#765F5F] hover:border-[#D2BFAE] hover:text-[#2B1717]'
              }`}
              style={activeTab === tab.id ? { borderColor: '#C62828', color: '#C62828' } : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

