import React from "react";

function ChapterContent({ chapterOutline, chapterData }) {

  if (!chapterOutline || !chapterData) {
    return (
      <div className="p-10 text-gray-400">
        Select a chapter to start learning 📚
      </div>
    );
  }

  const content =
    typeof chapterData.content === "string"
      ? JSON.parse(chapterData.content)
      : chapterData.content;

  return (
    <div className="p-10 space-y-8">

      {/* Chapter title & description */}
      <h2 className="text-3xl font-bold">
        {chapterOutline.name}
      </h2>

      <p className="text-gray-500">
        {chapterOutline.briefDescription}
      </p>

      {/* YouTube */}
      {chapterData.videoId && (
        <iframe
          className="w-full rounded-lg"
          height="420"
          src={`https://www.youtube.com/embed/${chapterData.videoId}`}
          allowFullScreen
        />
      )}

      {/* Explanation */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Detailed Explanation</h3>
        <p>{content.detailedExplanation}</p>
      </section>

      {/* Concepts */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Key Concepts</h3>
        <ul className="list-disc pl-6">
          {content.keyConcepts.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Step By Step</h3>
        <ol className="list-decimal pl-6">
          {content.stepByStepBreakdown.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {/* Code */}
      {content.codeExample && (
        <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
          {content.codeExample}
        </pre>
      )}

      {/* Code Explanation */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Code Explanation</h3>
        <p>{content.codeExplanation}</p>
      </section>

      {/* Use Cases */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Real World Use Cases</h3>
        <ul className="list-disc pl-6">
          {content.realWorldUseCases.map((use, i) => (
            <li key={i}>{use}</li>
          ))}
        </ul>
      </section>

      {/* Summary */}
      <section className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Quick Summary</h3>
        <p className="font-medium text-indigo-600">
          {content.quickSummary}
        </p>
      </section>

    </div>
  );
}

export default ChapterContent;
