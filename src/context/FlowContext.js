import React, { createContext, useState } from "react";

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [isFlowStarted, setIsFlowStarted] = useState(false);

  const startFlow = () => setIsFlowStarted(true);
  const resetFlow = () => setIsFlowStarted(false);

  return (
    <FlowContext.Provider value={{ isFlowStarted, startFlow, resetFlow }}>
      {children}
    </FlowContext.Provider>
  );
};
