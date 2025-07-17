import { useState } from "react";

export default function DebugAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const testData = [
    {
      title: "Test Category 1",
      organizations: [
        { name: "Test Org 1", description: "Test description 1" },
        { name: "Test Org 2", description: "Test description 2" }
      ]
    },
    {
      title: "Test Category 2", 
      organizations: [
        { name: "Test Org 3", description: "Test description 3" }
      ]
    }
  ];

  const toggleIndex = (index: number) => {
    console.log("Toggle clicked:", index, "Current open:", openIndex);
    setOpenIndex(openIndex === index ? null : index);
  };

  console.log("DebugAccordion render - openIndex:", openIndex);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Debug Accordion</h2>
      
      {testData.map((cat, index) => {
        const isOpen = openIndex === index;
        console.log(`Category ${index} (${cat.title}):`, { isOpen, openIndex });
        
        return (
          <div key={index} className="border-2 border-red-500 rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between px-6 py-4 bg-blue-600 text-white font-bold text-lg hover:bg-blue-700"
            >
              <span>{cat.title}</span>
              <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                {cat.organizations.length} orgs | {isOpen ? "OPEN" : "CLOSED"}
              </span>
            </button>

            {isOpen && (
              <div className="bg-yellow-50 p-6 border-t-2 border-green-500">
                <div className="space-y-4">
                  {cat.organizations.map((org, idx) => (
                    <div key={idx} className="border border-gray-300 p-4 rounded bg-white">
                      <h3 className="text-lg font-semibold text-gray-900">{org.name}</h3>
                      <p className="text-gray-700">{org.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}