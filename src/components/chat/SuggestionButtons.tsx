import React from 'react';

interface Suggestion {
  label: string;
  value: string;
}

interface SuggestionButtonsProps {
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: string) => void;
}

export const SuggestionButtons: React.FC<SuggestionButtonsProps> = ({
  suggestions,
  onSuggestionClick,
}) => {
  if (!suggestions.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion.value)}
          className="px-4 py-2 text-sm text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors whitespace-normal text-left"
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  );
};
