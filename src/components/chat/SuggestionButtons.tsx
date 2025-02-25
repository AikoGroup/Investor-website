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
    <div className="flex flex-col items-end gap-2 mt-2 mb-2 w-full">
      {suggestions.slice(0, 3).map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion.value)}
          className="
            px-3 py-1.5 md:px-4 md:py-2
            text-xs md:text-sm
            text-white
            bg-white/20 hover:bg-white/30
            backdrop-blur-sm
            transition-colors
            text-left break-words
            rounded-full
            max-w-[250px] md:max-w-[300px]
            shadow-sm
          "
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  );
};
