interface NavigationProps {
    activeTab: "processing" | "history" | "settings";
    onTabChange: (tab: "processing" | "history" | "settings") => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
    return (
        <nav className="mb-6">
            <ul className="flex gap-4 border-b">
                <li
                    className={`py-2 px-4 ${
                        activeTab === "processing"
                            ? "border-b-2 border-primary"
                            : ""
                    }`}
                >
                    <button
                        onClick={() => onTabChange("processing")}
                        className={`font-medium ${
                            activeTab === "processing"
                                ? ""
                                : "text-muted-foreground"
                        }`}
                    >
                        Image Processing
                    </button>
                </li>
                <li
                    className={`py-2 px-4 ${
                        activeTab === "history"
                            ? "border-b-2 border-primary"
                            : ""
                    }`}
                >
                    <button
                        onClick={() => onTabChange("history")}
                        className={`font-medium ${
                            activeTab === "history"
                                ? ""
                                : "text-muted-foreground"
                        }`}
                    >
                        History
                    </button>
                </li>
                <li
                    className={`py-2 px-4 ${
                        activeTab === "settings"
                            ? "border-b-2 border-primary"
                            : ""
                    }`}
                >
                    <button
                        onClick={() => onTabChange("settings")}
                        className={`font-medium ${
                            activeTab === "settings"
                                ? ""
                                : "text-muted-foreground"
                        }`}
                    >
                        Settings
                    </button>
                </li>
            </ul>
        </nav>
    );
}
