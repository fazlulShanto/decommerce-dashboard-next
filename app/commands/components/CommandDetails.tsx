import React from 'react';
import { Command } from '../types';

interface CommandDetailsProps {
  command: Command;
  renderPermissions: (permissions: string[]) => React.ReactNode;
}

export const CommandDetails = ({ command, renderPermissions }: CommandDetailsProps) => {
  return (
    <div className="pt-2 pb-4 px-2">
      <div className="bg-zinc-950/50 rounded-lg p-4 border border-gray-600 shadow-sm">
        {/* Description Section */}
        <div className="mb-5">
          <p className="text-base leading-relaxed">{command.description}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Permissions Section */}
            <div className="rounded-md p-3 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Required Permissions
              </h4>
              <div className="flex flex-wrap">
                {renderPermissions(command.permissions)}
              </div>
            </div>
            
            {/* Example Section */}
            <div className="bg-white dark:bg-slate-950 rounded-md p-3 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Example Usage
              </h4>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-md p-2 font-mono text-sm">
                {command.example}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            {/* Response Section - Only shown if it exists */}
            {command.response && (
              <div className="bg-white dark:bg-slate-950 rounded-md p-3 border border-slate-100 dark:border-slate-800 shadow-sm">
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Response
                </h4>
                <p className="text-sm bg-slate-100 dark:bg-slate-900 p-2 rounded-md">{command.response}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Details Section - Full Width */}
        {command.details && (
          <div className="mt-4 bg-white dark:bg-slate-950 rounded-md p-3 border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="text-sm font-semibold mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Details
            </h4>
            <div 
              className="text-sm bg-slate-100 dark:bg-slate-900 p-3 rounded-md prose prose-sm max-w-none dark:prose-invert" 
              dangerouslySetInnerHTML={{ __html: command.details }}
            />
          </div>
        )}
      </div>
    </div>
  );
}; 