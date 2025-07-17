import DebugAccordion from "./components/DebugAccordion";
import SimpleOrgAccordion from "./components/SimpleOrgAccordion";
import orgData from "./orgData.json";

function OrgAccordionExample() {
  // Debug: Log the data structure
  console.log("OrgData loaded:", orgData);
  console.log("OrgData length:", orgData.length);
  console.log("First category:", orgData[0]);
  
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Canada Access Hub
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
          Toronto Non-Profit Organizations Directory
        </p>
        
        <div className="mb-8">
          <DebugAccordion />
        </div>
        
        <div className="border-t-4 border-purple-500 pt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Original Data ({orgData.length} categories):</h2>
          <SimpleOrgAccordion categories={orgData} />
        </div>
      </div>
    </main>
  );
}

export default OrgAccordionExample;