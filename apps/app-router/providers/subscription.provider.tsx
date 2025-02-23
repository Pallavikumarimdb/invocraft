import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the context type
interface SubscriptionContextType {
  subscriptions: any;
  setSubscription: (data: any) => void;
  clearSubscription: () => void;
  isChangingPlans: boolean;
}

// Create the context
const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Create the provider component
export const SubscriptionProvider: React.FC<{ children: ReactNode, subscriptions: any }> = ({ children, subscriptions: subscriptionsProp }) => {
  const [subscriptions, setSubscriptionState] = useState<any | null>(null);

  const setSubscription = (data: any) => {
    setSubscriptionState(data);
  };

  const clearSubscription = () => {
    setSubscriptionState(null);
  };

  useEffect(() => {
    setSubscription(subscriptionsProp)
  }, [subscriptionsProp]);

  const isChangingPlans = subscriptions?.length > 0;

  return (
    <SubscriptionContext.Provider value={{ subscriptions, setSubscription, clearSubscription, isChangingPlans }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Custom hook for consuming the context
export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
