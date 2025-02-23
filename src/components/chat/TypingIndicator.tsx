export const TypingIndicator = () => {
  return (
    <div className="flex items-start mb-4">
      <div className="bg-blue-100/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-900/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-blue-900/40 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 bg-blue-900/40 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
};
