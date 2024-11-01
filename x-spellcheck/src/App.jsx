import React, { useState } from "react";

const correctionDictionary = {
  teh: "the",
  wrok: "work",
  fot: "for",
  exampl: "example",
};

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [suggestedCorrection, setSuggestedCorrection] = useState("");

  const handleTextChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    const words = input.split(" ");
    const correctedWords = words.map((word) => {
      const correction = correctionDictionary[word.toLowerCase()];
      return correction || word;
    });

    const firstCorrection = correctedWords.find(
      (word, index) => word !== words[index]
    );
    setSuggestedCorrection(firstCorrection || "");
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Spell Check and Auto-Correction</h1>
      <textarea
        value={userInput}
        onChange={handleTextChange}
        placeholder="Enter text..."
        rows={5}
        className="p-3 border border-gray-300 rounded-lg w-full max-w-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {suggestedCorrection && (
        <p className="text-lg text-gray-700">
          Did you mean: <span className="font-semibold text-blue-600">{suggestedCorrection}</span>?
        </p>
      )}
    </div>
  );
};

export default App;
