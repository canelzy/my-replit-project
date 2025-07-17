import SimpleOrgAccordion from "./components/SimpleOrgAccordion";
import orgData from "./orgData.json";

function OrgAccordionExample() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Canada Access Hub
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
          Toronto Non-Profit Organizations Directory
        </p>
        <SimpleOrgAccordion categories={orgData} />
      </div>
    </main>
  );
}

export default OrgAccordionExample;