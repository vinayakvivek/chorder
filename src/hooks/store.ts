import React from "react";
import { serviceStore } from '../stores/service';

const storesContext = React.createContext({
  serviceStore,
});

export const useStores = () => React.useContext(storesContext);
