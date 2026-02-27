export const GenerateChapterContent_AI = async (chapterPrompt) => {
  const res = await fetch("/api/generate-chapter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: chapterPrompt }),
    
  });

  return res.json();
  
};
