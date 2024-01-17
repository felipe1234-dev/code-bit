import React, { createContext, useContext, useState } from "react";

interface TabsValue {
    tab: number;
    minTab: number;
    maxTab: number;
    goToTab: (tab: number) => void;
    goToNextTab: () => void;
    goToPreviousTab: () => void;
}

const TabsContext = createContext<TabsValue | undefined>(undefined);

function TabsProvider(props: { children: React.ReactNode }) {
    const [tab, setTab] = useState(0);
    const minTab = 0;
    const maxTab = 2;

    const goToTab = (tab: number) => {
        if (tab < minTab) tab = minTab;
        if (tab > maxTab) tab = maxTab;
        setTab(tab);
    };

    const goToNextTab = () => {
        setTab((prev) => Math.min(prev + 1, maxTab));
    };

    const goToPreviousTab = () => {
        setTab((prev) => Math.max(prev - 1, minTab));
    };

    return (
        <TabsContext.Provider
            value={{
                tab,
                minTab,
                maxTab,
                goToTab,
                goToNextTab,
                goToPreviousTab,
            }}
        >
            {props.children}
        </TabsContext.Provider>
    );
}

function useTabs() {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error("useTabs must be used within a TabsProvider");
    }

    return context;
}

export { TabsContext, TabsProvider, useTabs };
export type { TabsValue };
