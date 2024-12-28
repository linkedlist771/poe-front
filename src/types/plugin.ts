export interface Plugin {
    id: number;
    name: string;
    description: string;
    icon: string;
}

export interface PluginPanelProps {
    plugins: string[];
} 