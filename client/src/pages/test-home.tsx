import { useState } from "react";

export default function TestHome() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Canada Access Hub - Test Page
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Application Status: Working ✓
          </h2>
          <p className="text-gray-600 mb-4">
            This is a simplified test page to verify the React application is loading properly.
          </p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Click me: {count}
            </button>
            
            <div className="text-sm text-gray-500">
              Server: Express + Vite Development Server
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Next Steps:
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li>• React application is loading successfully</li>
            <li>• State management is working (counter above)</li>
            <li>• Tailwind CSS is applied correctly</li>
            <li>• Ready to restore full functionality</li>
          </ul>
        </div>
      </div>
    </div>
  );
}